<template>
  <div class="container">
    <ai_nav/>
  
    <h2 class="subtitle has-text-primary">
      {{ task.name }}
    </h2>
    <div>{{ task.description }}</div>
  
    <div class="columns section">
      <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
        <div class="card">
          <div class="card-image">
            <canvas></canvas>
            <!-- <div v-for="u in task.test_images.url" :key="u.id"> -->
            <!-- <img id='image' v-if="u" :src="u" alt="Test Image"> -->
              <figure class="image">
                <img id='image' :src="task.test_images.url[0]" alt="Test Image">
              </figure>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
        <div class="card-content">
          <div class="media-content">
            <p class="subtitle">Image Resolution: {{ task.test_images.resolution }}</p>
          </div>
        </div>
        <div class="card">
          Logo Info
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
        },
        {
          src: '../js/mobilenet/1.js',
          defer: true
        }
      ],
      link: [{
        rel: 'stylesheet',
        href: ''
      }]
    },
    methods: {
      run: function(){
        run_mobilenet();
      }
    },
    computed: {
      progress_text: function() {
        return this.progress.value + '%'
      }
    },
    data() {
      return {
        progress: {
          value: '90',
          max: '100',
        },
        task: {
          "id": 1,
          "page": 'mobilenet',
          "name": 'Image Classification (MobileNet)',
          "description": 'An efficient Convolutional Neural Networks for Mobile Vision Applications. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
          "nn": 'MobileNet',
          "nn_version": 'v1.0_224',
          "accuracy": '70.9%',
          "backend": 'WASM, WebGL2, WebML',
          "model_size": '16.9Mb',
          "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
          "model_new_url": 'http://download.tensorflow.org/models/mobilenet_v1_2018_02_22/mobilenet_v1_1.0_224.tgz',
          'model_url': 'https://belem.oss-cn-shanghai.aliyuncs.com/ai/model/mobilenet/zip/mobilenet_v1_1.0_224.tflite',
          'model_labelurl': 'https://belem.oss-cn-shanghai.aliyuncs.com/ai/model/mobilenet/zip/labels.txt',
          'test_images': {
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
  img {
    width: 448px;
    height: 448px;
  }
</style>