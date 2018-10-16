<template>
  <div class="container">
    <ai_nav/>
    <ai_mac_switcher/>
    <div class="section">
      <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet">
        {{ task.name }}
      </h2>
      <div class='mb'>{{ task.description }}</div>
  
      <div class="mt ic" v-if="showlog">
        <div v-if="task.model_version">Model Version: {{ task.model_version }}</div>
        <div class="columns mt">
          <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd ic">
            <div class="">Loading Model File: {{ progress_loading_text }} </div>
            <progress class="progress is-info mt" :value="progress_loading.value" :max="progress_loading.max">{{ progress_loading_text }}</progress>
          </div>
          <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd ic">
            <div class="">Run Model with Tests: {{ progress_text }} </div>
            <progress class="progress is-info mt" :value="progress.value" :max="progress.max">{{ progress_text }}</progress>
          </div>
        </div>
      </div>
  
      <div class="columns mt">
        <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd ic">
          <div class="card is ic">
            <canvas class="testimage"></canvas>
            <!-- <div v-for="u in task.test_images.image" :key="u.id"> -->
            <!-- <img id='image' v-if="u" :src="u" alt="Test Image"> -->
            <img id='testimage' v-show='getTestImage' :src="getTestImage" alt="Test Image">
            <!-- </div> -->
          </div>
          <div class='inference_label has-text-primary is-size-6-desktop is-size-6-mobile is-size-6-tablet'>{{ currentinference }}</div>
        </div>
        <div v-show="showlog" class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
          <div v-html='log' class="card" id='log'>
          </div>
          <div class='ir'>
            <button class="btn button ir is-small" @click="copylog" data-clipboard-target="#log">Copy Log</button>
          </div>
        </div>
      </div>
  
      <h2 v-if='showBar' class="is-size-5-desktop is-size-6-mobile is-size-5-tablet ic mt">{{ task.name }} Benchmark</h2>
      <div class='columns' v-if='showBar'>
        <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd ic">
          <div class="mt">
            <b-table :data="test_result" :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
              <template slot-scope="props">
                    <b-table-column field="backend" label="Backend">
                        {{ props.row.backend }}
                    </b-table-column>
    
                    <b-table-column field="test_image" label="Test Image">
                        {{ props.row.test_case }}
                    </b-table-column>
    
                    <b-table-column field="best_probability" label="Best Probability">
                        {{ props.row.probability }}
                    </b-table-column>
    
                    <b-table-column field="test_result" label="Inference Time">
                        {{ props.row.test_result }} ms
                    </b-table-column>
    
                    <!-- <b-table-column field="date" label="Date" centered>
                        <span class="tag is-success">
                            xxx
                        </span>
                    </b-table-column> -->
</template>

<template slot="empty">
  <section class="section">
    <div class="content has-text-grey has-text-centered">
      <p>
        <b-icon icon="emoticon-sad" size="is-large">
        </b-icon>
      </p>
      <p>Nothing here.</p>
    </div>
  </section>
</template>
            </b-table>
            <div class='mt has-text-primary is-size-7-desktop is-size-7-mobile is-size-7-tablet'>{{ nalabel }}</div> 
 
          </div>
        </div>
        <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd ic">
          <div class="bar-chart mt">
            <ve-histogram v-if='showBar' :data="barData" :settings="chartSettings" class='cmh'></ve-histogram>
          </div>
        </div>
  
      </div>

      <div class='ic mb'>
        <button class="button is-primary wd" @click="run">Run {{ task.name }}</button>
      </div>
    </div>
    <ai_footer/>
  </div>
</template>

<script>
  import ai_nav from "~/components/ai_nav.vue";
  import ai_footer from "~/components/ai_footer.vue";
  import ClipboardJS from 'clipboard';
  import axios from 'axios-https-proxy-fix';
  import ai_mac_switcher from "~/components/ai_mac_switcher.vue";
  
  import {
    MobileNetTF,
    modelprogress
  } from '~/static/js/tf/mobilenet.js';
  import {
    finallog,
    currentinference,
    testresult,
    tf_init_run,
    nalabel
  } from '~/static/js/main.js';
  
  
  export default {
    components: {
      ai_nav,
      ai_footer,
      ClipboardJS,
      ai_mac_switcher
    },
    name: "mobilenet",
    head: {
      script: [{
        src: '../js/webml/webml-polyfill.js',
        defer: true
      }],
      link: [{
        rel: 'stylesheet',
        href: ''
      }]
    },
    mounted() {
      setInterval(this.getLog, 100);
      setInterval(this.getModelProgress, 100);
      this.scrollToBottom();
      this.progress.max = this.task.backend.length * this.task.test.image.length;
      this.progress_loading.max = 1;
      this.getTestImage = this.task.test.image[0];
    },
    updated: function() {
      this.scrollToBottom();
    },
    destoryed() {
      clearInterval(this.getModelProgress);
      clearInterval(this.getLog);
    },
    methods: {
      timeout: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      scrollToBottom: function() {
        this.$nextTick(() => {
          var container = this.$el.querySelector("#log");
          container.scrollTop = container.scrollHeight;
        })
      },
      copylog: function() {
        const btnCopy = new ClipboardJS('.btn');
        this.$toast.open({
          duration: 3000,
          message: `Log has been copied to clipboard`,
          position: 'is-bottom'
        });
      },
      run: async function() {
        let i = 0;
        this.showlog = true;
        for (let item of this.task.backend) {
          for (let image of this.task.test.image) {
            this.currentinference = '';
            this.nalabel = '';
            let configuration = {
              framework: this.task.framework,
              modelName: this.task.model_name,
              modelVersion: this.task.model_version,
              backend: item,
              iteration: this.task.iteration,
              model: this.task.model,
              label: this.task.label,
              image: image,
            }
            this.getTestImage = configuration.image;
            await tf_init_run(configuration);
            this.currentinference = currentinference;
            this.nalabel = nalabel;
            await this.timeout(500);
            this.progress.value = ++i;
          }
        }
  
  
        this.test_result = testresult;
        this.showBar = true;
  
        this.barData.rows = [];
        let t = {};
        t['Test Image'] = 0;
        t['WebGL'] = 0;
        t['CPU'] = 0;
  
        let _this = this;
        this.task.test.image.map((image) => {
          for (let item of testresult) {
            if (item.test_case == image.split('/').pop()) {
              t['Test Image'] = item.test_case;
              if (item.backend.toLowerCase() == 'webgl') {
                t['WebGL'] = item.test_result;
              } else if (item.backend.toLowerCase() == 'cpu') {
                t['CPU'] = item.test_result;
              }
            }
          }
          this.barData.rows.push(t);
          t = {};
        })
      },
      getLog: function() {
        this.log = finallog;
      },
      getModelProgress: function() {
        this.progress_loading.value = modelprogress;
      }
    },
    computed: {
      progress_text: function() {
        return ((this.progress.value / this.progress.max) * 100).toFixed(2) + '%';
      },
      progress_loading_text: function() {
        return ((this.progress_loading.value / this.progress_loading.max) * 100).toFixed(2) + '%';
      }
    },
    data() {
      return {
        nalabel: '',
        showlog: false,
        showBar: false,
        currentinference: '',
        chartSettings: {
          yAxisType: ['KMB', 'percent'],
          yAxisName: ['ms', ''],
          showLine: ['Probability']
        },
        barData: {
          columns: ['Test Image', 'WebGL', 'CPU'],
          rows: [{
            'Test Image': 'cat.jpg',
            'WebGL': 0,
            'CPU': 0
          }]
        },
        progress: {
          value: 0,
          max: 1,
        },
        progress_loading: {
          value: 0,
          max: 1,
        },
        test_result: [],
        log: null,
        getTestImage: '',
        task: {
          "id": 1,
          "model_name": 'MobileNet+TF',
          "backend": ['WebGL', 'CPU'],
          "iteration": 4,
          "framework": "webml-polyfill.js",
          "model": '../model/tf/google/optimized_model.pb',
          "label": '../model/tf/google/weights_manifest.json',
          // "model": 'https://aimark.nos-eastchina1.126.net/model/tf/google/optimized_model.pb',
          // "label": 'https://aimark.nos-eastchina1.126.net/model/tf/google/weights_manifest.json',
          "name": 'Image Classification (MobileNet + TensorFlow.js)',
          "description": 'This demo imports the MobileNet v1.0 model for inference in the browser. The model was pre-converted to TensorFlow.js format.',
          "model_version": 'v1.0',
          "accuracy": '70.9%',
          "model_size": '17.1Mb',
          "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
          'test': {
            'resolution': '224 x 224 px',
            'image': ['../img/tensorflow/cat.jpg', '../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg']
          }
        }
      }
    }
  };
</script>

<style scoped>
  .wd {
    font-size: 0.8rem;
  }
</style>
