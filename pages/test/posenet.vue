<template>
  <div class="container">
    <ai_nav/>
    <ai_mac_switcher/>
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
        <div class="column ic">
          <div class="card is ic noborder">
              <canvas id="poseCanvas" width="513" height="513"></canvas>
              <canvas id="poseCanvasPredict" width="513" height="513"></canvas>
              <canvas class="testimage"></canvas>
              <img id='testimage' v-show='getTestImage' :src="getTestImage" alt="Test Image"> 
          </div>
        </div>
        <div v-show="getBackend" class="column">
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

                <b-table-column field="decode_result" label="Decode Time">
                    {{ props.row.decode_result }} ms
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
      <div class='ic mb '>
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
    finallog,
    modelprogress,
    testresult,
    posenetbase64,
    bardata,
    runTest,
    nalabel
  } from '~/static/js/main.js'
  
  
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
        },
        {
          src: '../js/posenet/decodePose.js',
          defer: true
        },
                {
          src: '../js/posenet/helperFunc.js',
          defer: true
        },
                {
          src: '../js/posenet/utils.js',
          defer: true
        },
                {
          src: '../js/posenet/PoseNet.js',
          defer: true
        },
                {
          src: '../js/posenet/DrawOutputs.js',
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
      timeout: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
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
        for (let image of this.task.test.image) {
          for (let item of this.task.backend) {
            this.nalabel = '';
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
            await runTest(configuration);
            this.progress.value = ++i;
            this.getTestImage = posenetbase64;
            this.nalabel = nalabel;
            await this.timeout(2000);
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
        nalabel: '',
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
          max: 4,
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
          "model_name": 'PoseNet',
          "backend": ['WASM', 'WebGL2', 'WebML'],
          "iteration": 4,
          "framework": "webml-polyfill.js",
          "model": '../model/posenet/',
          "label": '../model/posenet/',
          // "model": 'https://aimark.nos-eastchina1.126.net/model/posenet/',
          // "label": 'https://aimark.nos-eastchina1.126.net/model/posenet/',
          "name": 'Human Pose Estimation (PoseNet)',
          "description": 'PoseNet is a machine learning model that allows for Real-time Human Pose Estimation which can be used to estimate either a single pose or multiple poses. This task loads a pretrained PoseNet model, constructs and infers it by WebML API.',
          "model_version": 'v1.101',
          "accuracy": '66.5%',
          "model_size": '13.3Mb',
          "paper_url": 'https://arxiv.org/abs/1505.07427',
          'test': {
            'resolution': '513 x 513 px',
            // 'image': ['../img/posenet/tennis_in_crowd.jpg', '../img/posenet/ski.jpg']
            'image': ['../img/posenet/ski.jpg']
          }
        }
      }
    }
  };
</script>

<style scoped>
img,
.is {
  width: 513px !important;
  height: 513px !important;
}

.image {
  width: 513px !important;
  height: 513px !important;
  /* display: none !important; */
}

.testimage {
  width: 513px !important;
  height: 513px !important;
}

#poseCanvasPredict, #poseCanvas, .testimage {
 display: none; 
}

#log {
  height: 513px;
  max-height: 513px;
}

.cmh,
.cmh canvas {
  max-height: 380px !important;
}

@media (max-width: 768px) {
  img,
  .is {
    width: auto !important;
    height: auto !important;
  }
  .image {
    width: auto !important;
    height: auto !important;
    /* display: none !important; */
  }

  .noborder {
    box-shadow: 0 0px 0px rgba(10, 10, 10, 0.1), 0 0px 0px rgba(10, 10, 10, 0.1) !important;
  }

  #log {
    height: 112px;
    max-height: 112px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 1rem;
  }

  .cmh,
  .cmh canvas {
    max-height: 320px !important;
  }
}
</style>