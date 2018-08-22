<template>
  <div class="container">
    <ai_nav/>
    <div class="section">
      <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet">
        {{ task.name }}
      </h2>
      <div class='mb'>{{ task.description }}</div>
  
      <div class="mt ic" v-if="getBackend">
        <div class=""><span v-if="task.model_version">Model Version: {{ task.model_version }} / </span>Backend: {{ getBackend }} / Test Image: {{ getTestImage.split('/').pop() }}</div>
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
            <canvas class="image"></canvas>
            <!-- <div v-for="u in task.test_images.url" :key="u.id"> -->
            <!-- <img id='image' v-if="u" :src="u" alt="Test Image"> -->
            <img id='image' :src="task.test.url[0]" alt="Test Image">
            <!-- </div> -->
          </div>
        </div>
        <div v-show="getBackend" class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
          <div v-html='log' class="card" id='log'>
          </div>
          <div class='ir'>
            <button class="btn button ir is-small" @click="copylog" data-clipboard-target="#log">
                                      Copy Log
                                    </button>showBar
          </div>
        </div>
      </div>
      <div class='ic mb is-small' v-if='test_result'>{{ test_result }}<br>Will send the data to web server via HTTP.</div>
      <div class='ic mb mt'>
        <div class="bar-chart mb mt">
          <h2 v-if='showBar' class="is-size-5-desktop is-size-6-mobile is-size-5-tablet">{{ task.name }} Benchmark</h2>
          <bar-chart v-if="showBar" :data="barData" :options="options"></bar-chart>
        </div>
      </div>
      <div class='ic mb mt'>
        <button class="button is-primary" @click="run">
                                      Run Testing
                                    </button>
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
  } from '~/static/js/mobilenet/1.js'
  
  
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
      this.progress.max = this.task.backend.length * this.task.test.url.length;
      this.progress_loading.max = 1;
    },
    updated: function() {
      this.scrollToBottom();
    },
    destoryed() {
      clearInterval(this.getModelProgress);
      clearInterval(this.getLog);
    },
    methods: {
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
          for (let test of this.task.test.url) {
            let configuration = {
              framework: this.task.framework,
              modelName: this.task.model_name,
              modelVersion: this.task.model_version,
              backend: item,
              iteration: this.task.iteration,
              model: this.task.model,
              label: this.task.label,
              test: test,
            };
            this.getBackend = configuration.backend;
            this.getTestImage = configuration.test;
            await runMobilenet(configuration);
            this.progress.value = ++i;
          }
        }
  
        this.test_result = testresult;
        this.showBar = true;

        this.barData.datasets[0].data = bardata[0]
        this.barData.datasets[1].data = bardata[1]
        this.barData.datasets[2].data = bardata[2]
  
        // await Promise.all(
        //   this.task.backend.map(async (item) => {
        //     await Promise.all(
        //     this.task.test.url.map(async (test) => {
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
        barData: {
          labels: ['bee_eater.jpg', 'pineapple.jpg', 'pinwheel.jpg'],
          datasets: [{
            label: 'WASM',
            backgroundColor: '#7bd9a5',
            data: [0, 0, 0]
          },
          {
            label: 'WebGL2',
            backgroundColor: '#22c3aa',
            data: [0, 0, 0]
          },
          {
            label: 'WebML',
            backgroundColor: '#4ea397',
            data: [0, 0, 0]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        progress: {
          value: 0,
          max: 9,
        },
        progress_loading: {
          value: 0,
          max: 1,
        },
        test_result: '',
        log: null,
        getBackend: '',
        getTestImage: '',
        task: {
          "id": 1,
          "model_name": 'MobileNet',
          "backend": ['WASM', 'WebGL2', 'WebML'],
          "iteration": 3,
          "framework": "webml-polyfill.js",
          "model": 'https://belem.oss-cn-shanghai.aliyuncs.com/ai/model/mobilenet/zip/mobilenet_v1_1.0_224.tflite',
          "label": 'https://belem.oss-cn-shanghai.aliyuncs.com/ai/model/mobilenet/zip/labels.txt',
          "name": 'Image Classification (MobileNet)',
          "description": 'An efficient Convolutional Neural Networks for Mobile Vision Applications. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
          "model_version": 'v1.0_224',
          "accuracy": '70.9%',
          "model_size": '16.9Mb',
          "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
          "model_new_url": 'http://download.tensorflow.org/models/mobilenet_v1_2018_02_22/mobilenet_v1_1.0_224.tgz',
          'test': {
            'resolution': '336 x 336 px',
            'url': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/pineapple.jpg', '../img/mobilenet/pinwheel.jpg']
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
  .mt {
    margin-top: 1rem;
  }
  
  .mb {
    margin-bottom: 1rem;
  }
  
  .ic {
    text-align: center;
    margin: 0 auto;
  }
  
  .ir {
    text-align: right;
  }
  
  .progress {
    height: 2px;
    background-color: red;
  }
  
  img,
  .is {
    width: 336px;
    height: 336px;
  }
  
  .image {
    width: 336px;
    height: 336px;
    display: none;
  }
  
  #log {
    height: 336px;
    max-height: 336px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 1rem;
  }
  
   ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  
   ::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 6px;
  }
  
   ::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
  }
  
   ::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
  }
  
  @media (max-width: 768px) {
    img,
    .is {
      width: 224px;
      height: 224px;
    }
    .image {
      width: 224px;
      height: 224px;
      display: none;
    }
    #log {
      height: 112px;
      max-height: 112px;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 1rem;
    }
  }
</style>