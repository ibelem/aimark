<template>
  <div class="container">
    <ai_nav/>
  
    <h2 class="subtitle has-text-primary">
      {{ task.name }}
    </h2>
    <div>{{ task.description }}</div>
  
    <div class="columns section">
      <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
        <div class="card is448">
          <canvas class="image"></canvas>
          <!-- <div v-for="u in task.test_images.url" :key="u.id"> -->
          <!-- <img id='image' v-if="u" :src="u" alt="Test Image"> -->
          <img id='image' :src="task.test.url[0]" alt="Test Image">
          <!-- </div> -->
        </div>
      </div>
      <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
        <div class="card-content">
          <div class="media-content">
            <p class="subtitle">Image Resolution: {{ task.test.resolution }}</p>
          </div>
        </div>
        <div v-html='log' class="card" id='log'>
        </div>
      </div>
    </div>
  
    <progress class="progress is-info" :value="progress.value" :max="progress.max">{{ progress_text }}</progress>
    <button class="button is-primary" @click="run">
                  Run Testing
                </button>
  
    <ai_footer/>
  </div>
</template>

<script>
  import ai_nav from "~/components/ai_nav.vue";
  import ai_footer from "~/components/ai_footer.vue";
  import axios from 'axios-https-proxy-fix'; 
  import { finallog, run_mobilenet } from '~/static/js/mobilenet/1.js'

  
  export default {
    components: {
      ai_nav,
      ai_footer
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
    mounted () {
      setInterval(this.getLogNow, 100);
      this.scrollToBottom();
    },
    updated:function(){
      this.scrollToBottom();
    },
    destoryed () {
      clearInterval(this.getLogNow)
    },
    methods: {
      scrollToBottom: function () {
        this.$nextTick(() => {
	        var container = this.$el.querySelector("#log");
            container.scrollTop = container.scrollHeight;
        })
      },
      run: async function() {
        // for (let i of this.task.backend) {
        //   let configuration = {
        //     framework: "webml-polyfill.js",
        //     backend: i,
        //     modelName: "mobilenet",
        //     iteration: 3
        //   };
        //   console.log(i)
        //   run_mobilenet(configuration);


        for(let item of this.task.backend) {
          for(let test of this.task.test.url) {
            let configuration = {
              framework: this.task.framework,
              modelName: this.task.modelname.toLowerCase(),
              backend: item,
              iteration: this.task.iteration,
              model: this.task.model,
              label: this.task.label,
              test: test
            };
            await run_mobilenet(configuration);
          }
        }

        
      },
      getLogNow: function() {
        this.log = finallog;
      } 
    },
    computed: {
      progress_text: function() {
        return this.progress.value + '%';
      }
    },
    data() {
      return {
        progress: {
          value: '90',
          max: '100',
        },
        log: null,
        task: {
          "id": 1,
          "modelname": 'MobileNet',
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
            'resolution': '448 x 448 px',
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
  img,
  .is448 {
    width: 448px;
    height: 448px;
  }
  
  .image {
    width: 448px;
    height: 448px;
    display: none;
  }
  #log {
    max-height: 360px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 1rem;
  }
  .sp {
    height: 0px;
  }

  hr {
    border-top: 1px dashed #8c8b8b !important;
    height: 2px !important;
    margin: 0px !important;
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
</style>