<template>
  <div class="container">
    <ai_nav/>
    <section class="section hero" v-if="showtask == false">
      <h2 class="subtitle">
      Run AIMark for Web to test several key AI tasks on your PC or smartphone browsers and check its performance!
      </h2>
      <div class='ic mb mt'>
          <button class="button is-primary wd" @click="run">Run Benchmark</button>
      </div>
    </section>
    <section class="section" v-if="showtask">
      <h2 class="has-text-primary is-size-5-desktop is-size-7-mobile is-size-5-tablet">
        Task {{ running.id }}: {{ running.name }} <span v-if="running.model_version">{{ running.model_version }}</span>
      </h2>
      <div class='mb'>{{ running.description }}</div>
      <div class="mt ic" v-if="running.backend">
        <div class="columns mt">
          <div class="column is-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd ic">
            <div class="">Loading task {{ running.id }} model file: {{ progress_loading_text }} </div>
            <progress class="progress is-info mt" :value="progress_loading.value" :max="progress_loading.max">{{ progress_loading_text }}</progress>
          </div>
          <div class="column is-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd ic">
            <div class="">Task {{ running.id }}: {{ progress_text }} </div>
            <progress class="progress is-info mt" :value="progress.value" :max="progress.max">{{ progress_text }}</progress>
          </div>
          <div class="column is-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd ic">
            <div class="">Total: {{ progress_total_text }} </div>
            <progress class="progress is-info mt" :value="progress_total.value" :max="progress_total.max">{{ progress_total_text }}</progress>
          </div>
        </div>
      </div>
  
      <div class="columns mt">
        <div class="column is-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd ic">
          <div class="card is ic">
            <canvas id="poseCanvas" width="513" height="513"></canvas>
            <canvas id="poseCanvasPredict" width="513" height="513"></canvas>
            <canvas class="testimage"></canvas>
            <!-- <div v-for="u in task.test_images.image" :key="u.id"> -->
            <!-- <img id='image' v-if="u" :src="u" alt="Test Image"> -->
            <img id='testimage' :src="running.test_image" alt="Test Image" v-bind:class="{ pnshow: pn_show }">
            <!-- </div> -->
          </div>
          <div class='inference_label has-text-primary is-size-6-desktop is-size-6-mobile is-size-6-tablet'>{{ currentinference }}</div>
        </div>
      </div> 
        <div v-if='showresult'>
        <h2 class="is-size-5-desktop is-size-6-mobile is-size-5-tablet ic mt mb">Benchmark Result</h2>
        Test Environment: <ai_environment />
        <div class='columns mb'>
        <div class="column is-mobile is-12 ic">
          <div class="mb mt">
            <b-table :data="test_result" :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
              <template slot-scope="props">
                <b-table-column field="id" label="Task">
                    {{ props.row.id }}
                </b-table-column>
                <b-table-column field="name" label="Name">
                    {{ props.row.name }}
                </b-table-column>
                <!-- <b-table-column field="model" label="Model">
                    {{ props.row.model }}
                </b-table-column>
                -->
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
      </div>
    </section>
    <ai_footer/>
  </div>
</template>

<script>
  import ai_nav from "~/components/ai_nav.vue";
  import ai_footer from "~/components/ai_footer.vue";
  import ai_test from "~/components/ai_test.vue";
  import ai_environment from "~/components/ai_environment_line.vue";
  import {
    finallog,
    modelprogress,
    currentinference,
    testresult,
    bardata,
    posenetbase64,
    runTest,
    tf_init_run
  } from '~/static/js/main.js'

  export default {
    components: {
      ai_nav, ai_footer, ai_environment
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
          src: '../js/ssd_mobilenet/SsdMobileNet.js',
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
      setInterval(this.getModelProgress, 100);
      this.progress_loading.max = 1;
    },
    destoryed() {
      clearInterval(this.getModelProgress);
    },
    methods: {
      timeout: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      getModelProgress: function() {
        this.progress_loading.value = modelprogress;
      },
      orc: async function(k) {
        let task = this.tasks[k];
        this.showtask = true;
        let i = 0;
        this.progress.value = 0;
        for (let item of task.backend) {
          for (let image of task.test.image) {
            this.currentinference = '';
            let framework = task.framework;
            if(item == 'WebML') {
              framework = 'Web ML API';
            }
            let configuration = {
              id: task.id,
              name: task.name,
              framework: framework,
              modelName: task.model_name,
              modelVersion: task.model_version,
              backend: item,
              iteration: task.iteration,
              model: task.model,
              label: task.label,
              image: image,
            };
            this.running.id = task.id;
            this.running.name = task.name;
            this.running.description = task.description;
            this.running.model = task.model_name;
            this.running.model_version =task.model_version;
            this.running.backend = task.backend;
            this.running.test_image = image;
            await runTest(configuration);
            if(this.running.model != 'SSDMobileNet') {
              this.currentinference = currentinference;
            } else {
              this.currentinference = '';
            }
            await this.timeout(300);
            this.progress.value = ++i;
          }
        }
  
        this.test_result = testresult;
        this.showresult = true;
      },
      pn: async function(k) {
        let task = this.tasks[k];
        this.showtask = true;
        let i = 0;
        this.progress.value = 0;

        for (let item of task.backend) {
          for (let image of task.test.image) {
            this.pn_show = true;
            this.currentinference = '';
            let framework = task.framework;
            if(item == 'WebML') {
              framework = 'Web ML API';
            }
            let configuration = {
              id: task.id,
              name: task.name,
              framework: framework,
              modelName: task.model_name,
              modelVersion: task.model_version,
              backend: item,
              iteration: task.iteration,
              model: task.model,
              label: task.label,
              image: image,
            };
            this.running.id = task.id;
            this.running.name = task.name;
            this.running.description = task.description;
            this.running.model = task.model_name;
            this.running.model_version =task.model_version;
            this.running.backend = task.backend;
            this.running.test_image = image;
            await runTest(configuration);
            this.currentinference = '';
            this.running.test_image = posenetbase64;
            this.progress.value = ++i;
            await this.timeout(500);
          }
        }
  
        this.test_result = testresult;
        this.showresult = true;
      },
      tf: async function(k) {
        this.showtask = true;
        let task = this.tasks[k];
        let i = 0;
        this.progress.value = 0;
        for (let item of task.backend) {
          for (let image of task.test.image) {
            this.currentinference = '';
            let framework = task.framework;
            if(item == 'WebML') {
              framework = 'Web ML API';
            }
            let configuration = {
              framework: framework,
              id: task.id,
              name: task.name,
              modelName: task.model_name,
              modelVersion: task.model_version,
              backend: item,
              iteration: task.iteration,
              model: task.model,
              label: task.label,
              image: image,
            };
            this.running.id = task.id;
            this.running.name = task.name;
            this.running.description = task.description;
            this.running.model = task.model_name;
            this.running.model_version =task.model_version;
            this.running.backend = task.backend;
            this.running.test_image = image;
            await tf_init_run(configuration);
            this.currentinference = currentinference;
            await this.timeout(500);
            this.progress.value = ++i;
          }
        }
        this.test_result = testresult;
        this.showresult = true;
      },
      run: async function() {
        await this.orc(0)
        this.progress_total.value = 1;
        await this.orc(1)
        this.progress_total.value = 2;
        await this.orc(2)
        this.progress_total.value = 3;
        await this.orc(3)
        this.progress_total.value = 4;
        // await this.tf(4)
        // this.progress_total.value = 5;
        await this.pn(4)
        this.progress_total.value = 5;

      }
    },
    computed: {
      progress_text: function() {
        return ((this.progress.value / this.progress.max) * 100).toFixed(2) + '%';
      },
      progress_loading_text: function() {
        return ((this.progress_loading.value / this.progress_loading.max) * 100).toFixed(2) + '%';
      },
      progress_total_text: function() {
        return this.progress_total.value + ' of ' + this.progress_total.max + ', ' + ((this.progress_total.value / this.progress_total.max) * 100).toFixed(2) + '%';
      },
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
        progress_total: {
          value: 0,
          max: 5,
        },
        test_result: [],
        showtask: false,
        showresult: false,
        pn_show: false,
        currentinference: '',
        running: { 
          'id': '',
          'name': '',
          'description': '',
          'model': '',
          'model_version': '',
          'backend': '',
          'test_image': '../img/posenet/ski.jpg'
        },
        tasks: [{
            "id": 1,
            "category": 'Object Recognition / Classification',
            "name": 'Image Classification (MobileNet)',
            "model_name": 'MobileNet',
            "url": 'MobileNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": '../model/mobilenet/zip/mobilenet_v1_1.0_224.tflite',
            "label": '../model/mobilenet/labels.txt',
            // "model": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/mobilenet_v1_1.0_224.tflite',
            // "label": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/labels.txt',
            "description": 'An efficient Convolutional Neural Networks for Mobile Vision Applications. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
            "model_version": 'v1.0',
            "accuracy": '89.9%',
            "model_size": '16.9Mb',
            "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/mobilenet/bee_eater.jpg']
            }},
            {
            "id": 2,
            "category": 'Object Recognition / Classification',
            "name": 'Image Classification (MobileNet V2)',
            "model_name": 'MobileNet',
            "url": 'MobileNet2',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": '../model/mobilenet/mobilenet_v2_1.0_224.tflite',
            "label": '../model/mobilenet/labels.txt',
            // "model": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/mobilenet_v2_1.0_224.tflite',
            // "label": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/labels.txt',
            "description": 'MobileNetV2 improves the state of the art performance of mobile models. Loading MobileNet model v2.0 trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API. ',
            "model_version": 'v2.0',
            "accuracy": '91.0%',
            "model_size": '14.0Mb',
            "paper_url": 'https://arxiv.org/abs/1801.04381',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/mobilenet/pinwheel.jpg']
            }},
            {
              "id": 3,
              "category": 'Object Recognition / Classification',
              "name": 'Image Classification (SSD MobileNet)',
              "model_name": 'SSDMobileNet',
              "url": 'SSDMobileNet',
              "backend": ['WASM', 'WebGL2', 'WebML'],
              "iteration": 4,
              "framework": "webml-polyfill.js",
              "model": '../model/ssd_mobilenet/ssd_mobilenet.tflite',
              "label": '../model/ssd_mobilenet/coco_labels_list.txt',
              // "model": 'https://aimark.nos-eastchina1.126.net/model/ssd_mobilenet/ssd_mobilenet.tflite',
              // "label": 'https://aimark.nos-eastchina1.126.net/model/ssd_mobilenet/coco_labels_list.txt',
              "description": 'SSD (Single Shot MultiBox Detector) is an unified framework for object detection with a single network. Loading SSD MobileNet model (converted from Tensorflow SSD MobileNet model) trained by COCO in TensorFlow Lite format, constructs and inferences it by WebML API.',
              "model_version": 'v1',
              "accuracy": '70.9%',
              "model_size": '27.3Mb',
              "paper_url": 'https://arxiv.org/abs/1801.04381',
              'test': {
                'resolution': '300 x 300 px',
                'image': ['../img/mobilenet/traffic_light.jpg']
              }
            },
            {
            "id": 4,
            "category": 'Object Recognition / Classification',
            "name": 'Image Classification (SqueezeNet)',
            "model_name": 'SqueezeNet',
            "url": 'SqueezeNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": '../model/squeezenet/model.onnx',
            "label": '../model/squeezenet/labels.json',
            // "model": 'https://aimark.nos-eastchina1.126.net/model/squeezenet/model.onnx',
            // "label": 'https://aimark.nos-eastchina1.126.net/model/squeezenet/labels.json',
            "description": 'A light-weight CNN providing Alexnet level accuracy with 50X fewer parameters. Loading SqueezeNet model trained by ImageNet in ONNX format, constructs and inferences it by WebML API.',
            "model_version": 'v1.1',
            "accuracy": '79.12%',
            "model_size": '5.0Mb',
            "paper_url": 'https://arxiv.org/abs/1602.07360',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/squeezenet/panda.jpg']
            }
          },
          // {
          //   "id": 5,
          //   "category": 'Object Recognition / Classification',
          //   "name": 'Image Classification (TensorFlow.js)',
          //   "model_name": 'MobileNet',
          //   "url": 'TensorFlow',
          //   "backend": ['WebGL', 'CPU', 'WebML'],
          //   "iteration": 4,
          //   "framework": "webml-polyfill.js",
          //   "model": '../model/tf/google/optimized_model.pb',
          //   "label": '../model/tf/google/weights_manifest.json',
          //   "model": 'https://aimark.nos-eastchina1.126.net/model/tf/google/optimized_model.pb',
          //   "label": 'https://aimark.nos-eastchina1.126.net/model/google/weights_manifest.json',
          //   "description": 'TensorFlow.js is a JavaScript library for training and deploying ML models in the browser. Loading a pretrained TensorFlow SavedModel into the browser and run inference through TensorFlow.js.',
          //   "model_version": 'v1.0',
          //   "accuracy": '89.9%',
          //   "model_size": '16.9Mb',
          //   "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
          //   'test': {
          //     'resolution': '224 x 224 px',
          //     'image': ['../img/tensorflow/cat.jpg']
          //   }},
                      {
            "id": 5,
            "category": 'Visual Localisation',
            "name": 'Pose Detection (PoseNet)',
            "model_name": 'PoseNet',
            "url": 'PoseNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": '../model/posenet/',
            "label": '../model/posenet/',
            // "model": 'http://aimark.nos-eastchina1.126.net/model/posenet/',
            // "label": 'http://aimark.nos-eastchina1.126.net/model/posenet/',
            "description": 'PoseNet is able to estimate your location and orientation from a single colour image. This task loads a pretrained PoseNet model, constructs and infers it by WebML API.',
            "model_version": 'v1.101',
            "accuracy": '%',
            "model_size": '13.3Mb',
            "paper_url": 'https://arxiv.org/abs/1505.07427',
            'test': {
              'resolution': '513 x 513 px',
              'image': ['../img/posenet/ski.jpg']
            }},
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

  .hero {
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .mb { margin-bottom: 1rem; }
  .mt { margin-top: 1rem; }

  #poseCanvasPredict, #poseCanvas, .testimage {
    display: none; 
  }

  .pnshow {
    display: block !important;
  }

</style>