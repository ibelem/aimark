<template>
  <div class="container">
    <ai_nav/>
    <div class="section">
      <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet">
        {{ task.name }}
      </h2>
      <div class='mb'>{{ task.description }}</div>
  
      <div class="mt ic" v-if="getBackend">
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
        </div>
        <div v-show="getBackend" class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
          <div v-html='log' class="card" id='log'>
          </div>
          <div class='ir'>
            <button class="btn button ir is-small" @click="copylog" data-clipboard-target="#log">Copy Log</button>
          </div>
        </div>
      </div>
 
      <h2 v-if='showBar' class="is-size-5-desktop is-size-6-mobile is-size-5-tablet ic mt">{{ task.name }} Benchmark</h2>
      <div class='columns mb' v-if='showBar'>
        <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd ic">
          <div class="mb mt">
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
 
 
          </div>
        </div>
        <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd ic">
          <div class="bar-chart mb mt">
            <ve-histogram v-if='showBar' :data="barData" :settings="chartSettings" class='cmh'></ve-histogram>
          </div>
        </div>
  
      </div>
      <div class='ic mb mt'>
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
  import {
    finallog,
    modelprogress,
    testresult,
    bardata,
    runMobilenet
  } from '~/static/js/testms.js'
  
  
  export default {
    components: {
      ai_nav,
      ai_footer,
      ClipboardJS
    },
    name: "mobilenet",
    head: {
      script: [{
          src: '../js/webml/dist/webml-polyfill.js',
          defer: true
        },
        {
          src: '../js/util/base.js',
          defer: true
        },
        {
          src: '../js/mobilenet/flatbuffers/js/flatbuffers.js',
          defer: true
        },
        {
          src: '../js/mobilenet/schema/schema_generated.js',
          defer: true
        },
        {
          src: '../js/mobilenet/TfLiteModelUtils.js',
          defer: true
        },
        {
          src: '../js/mobilenet/MobileNet.js',
          defer: true
        }
      ],
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
      uniqueList: function(array) {
        var r = [];
        for (var i = 0, l = array.length; i < l; i++) {
          for (var j = i + 1; j < l; j++)
            if (JSON.stringify(array[i]) == JSON.stringify(array[j])) j = ++i;
          r.push(array[i]);
        }
        return r;
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
        for (let item of this.task.backend) {
          for (let image of this.task.test.image) {
            let framework = this.task.framework;
            if(item == 'WebML') {
              framework = 'Web ML API'
            }
            let configuration = {
              framework: framework,
              modelName: this.task.model_name,
              modelVersion: this.task.model_version,
              backend: item,
              iteration: this.task.iteration,
              model: this.task.model,
              label: this.task.label,
              image: image,
            };
            this.getBackend = configuration.backend;
            this.getTestImage = configuration.image;
            await runMobilenet(configuration);
            
            this.progress.value = ++i;
          }
        }
  
        this.test_result = testresult;
        this.showBar = true;

        this.barData.rows = [];
        let t = {};
        t['Test Image'] = 0;
        t['WASM Polyfill'] = 0;
        t['WebGL2 Polyfill'] = 0;
        t['WebML'] = 0;
        
        let _this = this;
        this.task.test.image.map((image) => {
          for (let item of testresult) {
            if (item.test_case == image.split('/').pop()) {
              t['Test Image'] = item.test_case;
              if (item.backend.toLowerCase() == 'wasm') {
                t['WASM Polyfill'] = item.test_result;
              } else if (item.backend.toLowerCase() == 'webgl2') {
                t['WebGL2 Polyfill'] = item.test_result;
              } else if (item.backend.toLowerCase() == 'webml') {
                t['WebML'] = item.test_result;
              }  
            }
          }
          this.barData.rows.push(t);
          t = {};
        })
  
        // await Promise.all(
        //   this.task.backend.map(async (item) => {
        //     await Promise.all(
        //     this.task.test.image.map(async (test) => {
        //       let configuration = {
        //         framework: this.task.framework,
        //         modelName: this.task.modelname.toLowerCase(),
        //         backend: item,
        //         iteration: this.task.iteration,
        //         model: this.task.model,
        //         label: this.task.label,
        //         test: test
        //       };
        //       await run_mobilenet(configuration);
        //     }));
        // }));
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
        showBar: false,
        chartSettings: {
          yAxisType: ['KMB', 'percent'],
          yAxisName: ['ms', ''],
          showLine: ['Probability']
        },
        barData: {
          columns: ['Test Image', 'WASM Polyfill', 'WebGL2 Polyfill', 'WebML'],
          rows: [{
              'Test Image': 'bee_eater.jpg',
              'WASM Polyfill': 0,
              'WebGL2 Polyfill': 0,
              'WebML': 0
            }
          ]
        },
        progress: {
          value: 0,
          max: 9,
        },
        progress_loading: {
          value: 0,
          max: 1,
        },
        test_result: [],
        log: null,
        getBackend: '',
        getTestImage: '',
        task: {
          "id": 1,
          "model_name": 'MobileNet',
          "backend": ['WASM', 'WebGL2', 'WebML'],
          "iteration": 4,
          "framework": "webml-polyfill.js",
          "model": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/mobilenet_v2_1.0_224.tflite',
          "label": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/labels.txt',
          "name": 'Image Classification (MobileNetV2)',
          "description": 'MobileNetV2 improves the state of the art performance of mobile models. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
          "model_version": 'v2.0_224',
          "accuracy": '71.8%',
          "model_size": '14.0Mb',
          "paper_url": 'https://arxiv.org/abs/1801.04381',
          'test': {
            'resolution': '224 x 224 px',
            'image': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg', '../img/mobilenet/pinwheel.jpg']
          },
          "platform": [
            'android',
            'windows',
            'linux'
          ],
          "browser": [
            'chrome',
            'firefox'
          ]
        }
      }
    }
  };
</script>

<style scoped>
</style>