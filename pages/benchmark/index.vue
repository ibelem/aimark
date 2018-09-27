<template>
  <div class="container">
    <ai_nav/>
    <div class='ic mb mt'>
        <button class="button is-primary wd" @click="run">Run Benchmark</button>
    </div>
    <section class="section" v-if="showtask">
      <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet">
        {{ running.name }} <span v-if="running.model_version">{{ running.model_version }}</span>
      </h2>
 
      <div class="mt ic" v-if="running.backend">
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
            <img id='testimage' v-show='running.test_image' :src="running.test_image" alt="Test Image">
            <!-- </div> -->
          </div>
          <div>{{ current_inference }}</div>
        </div>
      </div> 
        <div class='columns mb' v-if='showresult'>
        <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd ic">
          <div class="mb mt">
            <b-table :data="test_result" :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
              <template slot-scope="props">
                <b-table-column field="model" label="Model">
                    {{ props.row.model }}
                </b-table-column>
                <b-table-column field="model_version" label="Version">
                    {{ props.row.model_version }}
                </b-table-column>
                <b-table-column field="backend" label="Backend">
                    {{ props.row.backend }}
                </b-table-column>

                <!-- <b-table-column field="test_image" label="Test Image">
                    {{ props.row.test_case }}
                </b-table-column>

                <b-table-column field="best_probability" label="Best Probability">
                    {{ props.row.probability }}
                </b-table-column>
                -->

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
      </div>
    </section>
    <ai_footer/>
  </div>
</template>

<script>
  import ai_nav from "~/components/ai_nav.vue";
  import ai_footer from "~/components/ai_footer.vue";
  import ai_test from "~/components/ai_test.vue";
  import {
    finallog,
    modelprogress,
    current_inference,
    testresult,
    bardata,
    runTest
  } from '~/static/js/testms.js'

  export default {
    components: {
      ai_nav, ai_footer, ai_test
    },
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
          src: '../js/third_party/protobuf.min.js',
          defer: true
        },
        {
          src: '../js/squeezenet/onnx.js',
          defer: true
        },
        {
          src: '../js/squeezenet/OnnxModelUtils.js',
          defer: true
        },
        {
          src: '../js/squeezenet/SqueezeNet.js',
          defer: true
        }
      ],
      link: [{
        rel: 'stylesheet',
        href: ''
      }]
    },
    mounted() {
      setInterval(this.getModelProgress, 100);
      this.progress_loading.max = 1;
    },
    destoryed() {
      clearInterval(this.getModelProgress);
    },
    methods: {
      getModelProgress: function() {
        this.progress_loading.value = modelprogress;
      },
      orc: async function(k) {
        this.showtask = false;
        let task = this.tasks[k];
        let _this = this;
        
        this.showtask = true;
        let i = 0;
        for (let item of task.backend) {
          for (let image of task.test.image) {
            _this.current_inference = '';
            let framework = task.framework;
            if(item == 'WebML') {
              framework = 'Web ML API';
            }
            let configuration = {
              framework: framework,
              modelName: task.model_name,
              modelVersion: task.model_version,
              backend: item,
              iteration: task.iteration,
              model: task.model,
              label: task.label,
              image: image,
            };
            _this.running.name = task.name;
            _this.running.model = task.model_name;
            _this.running.model_version =task.model_version;
            _this.running.backend = task.backend;
            _this.running.test_image = image;
            _this.current_inference = current_inference;
            await runTest(configuration);
            this.progress.value = ++i;
          }
        }
  
        this.test_result = testresult;
        this.showresult = true;
      },
      run: async function() {
        await this.orc(0)
        await this.orc(1)
        await this.orc(2)
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
        progress: {
          value: 0,
          max: 3,
        },
        progress_loading: {
          value: 0,
          max: 1,
        },
        test_result: [],
        showtask: false,
        showresult: false,
        current_inference: '',
        running: { 
          'name': '',
          'model': '',
          'model_version': '',
          'backend': '',
          'test_image': ''
        },
        tasks: [{
            "id": 1,
            "category": 'Object Recognition / Classification',
            "name": 'Image (MobileNet)',
            "model_name": 'MobileNet',
            "url": 'MobileNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/zip/mobilenet_v1_1.0_224.tflite',
            "label": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/labels.txt',
            "description": 'An efficient Convolutional Neural Networks for Mobile Vision Applications. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
            "model_version": 'v1.0',
            "accuracy": '70.9%',
            "model_size": '16.9Mb',
            "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/mobilenet/bee_eater.jpg']
            },
            "platform": [
              'android',
              'windows',
              'linux'
            ],
            "browser": [
              'chrome',
              'firefox'
            ]},
            {
            "id": 2,
            "category": 'Object Recognition / Classification',
            "name": 'Image (MobileNetV2)',
            "model_name": 'MobileNet',
            "url": 'MobileNet2',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/mobilenet_v2_1.0_224.tflite',
            "label": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/labels.txt',
            "description": 'MobileNetV2 improves the state of the art performance of mobile models. Loading MobileNet model v2.0 trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API. ',
            "model_version": 'v2.0',
            "accuracy": '71.8%',
            "model_size": '14.0Mb',
            "paper_url": 'https://arxiv.org/abs/1801.04381',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/mobilenet/traffic_light.jpg']
            },
            "platform": [
              'android',
              'windows',
              'linux'
            ],
            "browser": [
              'chrome',
              'firefox'
            ]},
            {
            "id": 3,
            "category": 'Object Recognition / Classification',
            "name": 'Image (SqueezeNet)',
            "model_name": 'SqueezeNet',
            "url": 'SqueezeNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": 'https://aimark.nos-eastchina1.126.net/model/squeezenet/model.onnx',
            "label": 'https://aimark.nos-eastchina1.126.net/model/squeezenet/labels.json',
            "description": 'A light-weight CNN providing Alexnet level accuracy with 50X fewer parameters. Loading SqueezeNet model trained by ImageNet in ONNX format, constructs and inferences it by WebML API.',
            "model_version": 'v1.1',
            "accuracy": '56.34%',
            "model_size": '5.0Mb',
            "paper_url": 'https://arxiv.org/abs/1602.07360',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/squeezenet/panda.jpg']
            },
            "platform": [
              'android',
              'windows',
              'mac',
              'ios',
              'linux'
            ],
            "browser": [
              'edge',
              'chrome',
              'firefox',
              'safari'
            ]
          },
          {
            "id": 4,
            "category": 'Object Recognition / Classification',
            "name": 'Image（TensorFlow.js)',
            "model_name": 'MobileNet',
            "url": 'TensorFlow',
            "backend": ['WebGL', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": 'https://aimark.nos-eastchina1.126.net/model/tf/google/optimized_model.pb',
            "label": 'https://aimark.nos-eastchina1.126.net/model/tf/google/weights_manifest.json',
            "description": 'TensorFlow.js is a JavaScript library for training and deploying ML models in the browser. Loading a pretrained TensorFlow SavedModel into the browser and run inference through TensorFlow.js.',
            "model_version": 'v1.0',
            "accuracy": '70.9%',
            "model_size": '16.9Mb',
            "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
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
            ]},
                      {
            "id": 4,
            "category": 'Visual Localisation',
            "name": 'Pose Detection (PoseNet)',
            "model_name": 'PoseNet',
            "url": 'TensorFlow',
            "backend": ['WebGL', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": 'https://aimark.nos-eastchina1.126.net/model/tf/google/optimized_model.pb',
            "label": 'https://aimark.nos-eastchina1.126.net/model/tf/google/weights_manifest.json',
            "description": 'PoseNet is able to estimate your location and orientation from a single colour image. This task loads a pretrained PoseNet model, constructs and infers it by WebML API.',
            "model_version": 'v1.0',
            "accuracy": '70.9%',
            "model_size": '16.9Mb',
            "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
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
            ]},
        ]
      }
    }
  };
</script>

<style scoped>
  .title {
    font-weight: 200;
  }
  
  .subtitle {
    font-weight: ２00;
    font-size: 1rem;
  }
  
</style>