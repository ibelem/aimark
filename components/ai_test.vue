<template>
  <section>
  
    <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet mb">Tasks: Object Recognition / Classification</h2>
    <div class="columns">
      <div v-for="task in tasks" v-if="task.category=='Object Recognition / Classification' && task.id < 5" :key="task.id" class="column is-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
             {{ task.name }}
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
              </b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content lh">
              {{ task.description }}
              <ul>
                <li>Neural Network: {{ task.model_name }} {{ task.model_version }}</li>
                <li>Model Size: {{ task.model_size }}</li>
                <li>Image Resolution: {{ task.test.resolution }}</li>
                <li>Accuracy: {{ task.accuracy }}</li>
                <li>Backend: <span v-for="(b, index) in task.backend" :key="index">{{ b }} </span> </li>
              </ul>
              <!--
              <div class='rl'>
                <div class='il' v-for="p in task.platform" :key="p.id">
                <i v-if="p  == 'android'" class="mdi mdi-android-head mdi-24px"></i> <i v-if="p  == 'ios'" class="mdi mdi-apple-ios mdi-24px"></i> <i v-if="p  == 'mac'" class="mdi mdi-apple mdi-24px"></i> <i v-if="p  == 'windows'" class="mdi mdi-windows mdi-24px"></i> <i v-if="p  == 'linux'" class="mdi mdi-linux mdi-24px"></i>
                </div>
                <div class='il' v-for="b in task.browser" :key="b.id">
                <i v-if="b  == 'edge'" class="mdi mdi-edge mdi-24px"></i> <i v-if="b  == 'chrome'" class="mdi mdi-google-chrome mdi-24px"></i> <i v-if="b  == 'firefox'" class="mdi mdi-firefox mdi-24px"></i> <i v-if="b  == 'safari'" class="mdi mdi-apple-safari mdi-24px"></i>
                </div>
              </div>
              -->
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" :href="task.paper_url">Paper</a>
            <a class="card-footer-item" :href="task.model">Model</a>
          </footer>
          <footer class="card-footer">
            <!-- <nuxt-link class='card-footer-item button is-primary-gradient' :to="{ name: 'test-id', params: { id: task.id } }">Run Test</nuxt-link> -->
            <!-- <nuxt-link class='card-footer-item button is-primary-gradient' :to="'../test/'+ task.page">Run Test</nuxt-link>-->
            <a class='card-footer-item button is-primary-gradient' :href="'../test/'+ task.url">Run Test</a>
          </footer>
        </b-collapse>
      </div>
    </div>
        <div class="columns">
      <div v-for="task in tasks" v-if="task.category=='Object Recognition / Classification' && task.id >= 5 && task.id < 9" :key="task.id" class="column is-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
             {{ task.name }}
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
              </b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content lh">
              {{ task.description }}
              <ul>
                <li>Neural Network: {{ task.model_name }} {{ task.model_version }}</li>
                <li>Model Size: {{ task.model_size }}</li>
                <li>Image Resolution: {{ task.test.resolution }}</li>
                <li>Accuracy: {{ task.accuracy }}</li>
                <li>Backend: <span v-for="(b, index) in task.backend" :key="index">{{ b }} </span> </li>
              </ul>
              <!--
              <div class='rl'>
                <div class='il' v-for="p in task.platform" :key="p.id">
                <i v-if="p  == 'android'" class="mdi mdi-android-head mdi-24px"></i> <i v-if="p  == 'ios'" class="mdi mdi-apple-ios mdi-24px"></i> <i v-if="p  == 'mac'" class="mdi mdi-apple mdi-24px"></i> <i v-if="p  == 'windows'" class="mdi mdi-windows mdi-24px"></i> <i v-if="p  == 'linux'" class="mdi mdi-linux mdi-24px"></i>
                </div>
                <div class='il' v-for="b in task.browser" :key="b.id">
                <i v-if="b  == 'edge'" class="mdi mdi-edge mdi-24px"></i> <i v-if="b  == 'chrome'" class="mdi mdi-google-chrome mdi-24px"></i> <i v-if="b  == 'firefox'" class="mdi mdi-firefox mdi-24px"></i> <i v-if="b  == 'safari'" class="mdi mdi-apple-safari mdi-24px"></i>
                </div>
              </div>
              -->
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" :href="task.paper_url">Paper</a>
            <a class="card-footer-item" :href="task.model">Model</a>
          </footer>
          <footer class="card-footer">
            <!-- <nuxt-link class='card-footer-item button is-primary-gradient' :to="{ name: 'test-id', params: { id: task.id } }">Run Test</nuxt-link> -->
            <!-- <nuxt-link class='card-footer-item button is-primary-gradient' :to="'../test/'+ task.page">Run Test</nuxt-link>-->
            <a class='card-footer-item button is-primary-gradient' :href="'../test/'+ task.url">Run Test</a>
          </footer>
        </b-collapse>
      </div>
    </div>
    <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet mb">Tasks: Visual Localisation</h2>
    <div class="columns">
      <div v-for="task in tasks" v-if="task.category=='Visual Localisation'" :key="task.id" class="column is-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
             {{ task.name }}
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
              </b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content lh">
              {{ task.description }}
              <ul>
                <li>Neural Network: {{ task.model_name }} {{ task.model_version }}</li>
                <li>Model Size: {{ task.model_size }}</li>
                <li>Image Resolution: {{ task.test.resolution }}</li>
                <li>Accuracy: {{ task.accuracy }}</li>
                <li>Backend: <span v-for="(b, index) in task.backend" :key="index">{{ b }} </span> </li>
              </ul>
              <!--
              <div class='rl'>
                <div class='il' v-for="p in task.platform" :key="p.id">
                <i v-if="p  == 'android'" class="mdi mdi-android-head mdi-24px"></i> <i v-if="p  == 'ios'" class="mdi mdi-apple-ios mdi-24px"></i> <i v-if="p  == 'mac'" class="mdi mdi-apple mdi-24px"></i> <i v-if="p  == 'windows'" class="mdi mdi-windows mdi-24px"></i> <i v-if="p  == 'linux'" class="mdi mdi-linux mdi-24px"></i>
                </div>
                <div class='il' v-for="b in task.browser" :key="b.id">
                <i v-if="b  == 'edge'" class="mdi mdi-edge mdi-24px"></i> <i v-if="b  == 'chrome'" class="mdi mdi-google-chrome mdi-24px"></i> <i v-if="b  == 'firefox'" class="mdi mdi-firefox mdi-24px"></i> <i v-if="b  == 'safari'" class="mdi mdi-apple-safari mdi-24px"></i>
                </div>
              </div>
              -->
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" :href="task.paper_url">Paper</a>
            <a class="card-footer-item" :href="task.model">Model</a>
          </footer>
          <footer class="card-footer">
            <!-- <nuxt-link class='card-footer-item button is-primary-gradient' :to="{ name: 'test-id', params: { id: task.id } }">Run Test</nuxt-link> -->
            <!-- <nuxt-link class='card-footer-item button is-primary-gradient' :to="'../test/'+ task.page">Run Test</nuxt-link>-->
            <a class='card-footer-item button is-primary-gradient' :href="'../test/'+ task.url">Run Test</a>
          </footer>
        </b-collapse>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    methods: {
      run: function(task) {
        console.log(task.id);
      }
    },
    data() {
      return {
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
            "accuracy": '89.9%',
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
            "id": 2,
            "category": 'Object Recognition / Classification',
            "name": 'Image (MobileNet V2)',
            "model_name": 'MobileNet',
            "url": 'MobileNet2',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/mobilenet_v2_1.0_224.tflite',
            "label": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/labels.txt',
            "description": 'MobileNetV2 improves the state of the art performance of mobile models. Loading MobileNet model v2.0 trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API. ',
            "model_version": 'v2.0',
            "accuracy": '91.0%',
            "model_size": '14.0Mb',
            "paper_url": 'https://arxiv.org/abs/1801.04381',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg', '../img/mobilenet/pinwheel.jpg']
            }},
            {
              "id": 3,
              "category": 'Object Recognition / Classification',
              "name": 'Image (SSD MobileNet)',
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
                'image': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg', '../img/mobilenet/pinwheel.jpg']
              }
            },
            {
            "id": 4,
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
            "accuracy": '79.12%',
            "model_size": '5.0Mb',
            "paper_url": 'https://arxiv.org/abs/1602.07360',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/squeezenet/jeep.jpg', '../img/squeezenet/wallaby.jpg', '../img/squeezenet/panda.jpg']
            }
          },
          {
            "id": 5,
            "category": 'Object Recognition / Classification',
            "name": 'Image (TensorFlow.js)',
            "model_name": 'MobileNet',
            "url": 'TensorFlow',
            "backend": ['WebGL', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": 'https://aimark.nos-eastchina1.126.net/model/tf/google/optimized_model.pb',
            "label": 'https://aimark.nos-eastchina1.126.net/model/tf/google/weights_manifest.json',
            "description": 'TensorFlow.js is a JavaScript library for training and deploying ML models in the browser. Loading a pretrained TensorFlow SavedModel into the browser and run inference through TensorFlow.js.',
            "model_version": 'v1.0',
            "accuracy": '89.9%',
            "model_size": '16.9Mb',
            "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg', '../img/mobilenet/pinwheel.jpg']
            }
            },
            {
            "id": 6,
            "category": 'Visual Localisation',
            "name": 'Pose Detection (PoseNet)',
            "model_name": 'PoseNet',
            "url": 'PoseNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "model": 'http://aimark.nos-eastchina1.126.net/model/posenet/',
            "label": 'http://aimark.nos-eastchina1.126.net/model/posenet/',
            "name": 'Pose Detection (PoseNet)',
            "description": 'PoseNet is able to estimate your location and orientation from a single colour image. This task loads a pretrained PoseNet model, constructs and infers it by WebML API.',
            "model_version": 'v1.101',
            "accuracy": '%',
            "model_size": '13.3Mb',
            "paper_url": 'https://arxiv.org/abs/1505.07427',
            'test': {
              'resolution': '513 x 513 px',
              'image': ['../img/posenet/tennis_in_crowd.jpg']
            }
            },
        ]
      }
    }
  };
</script>


<style scoped>
  .card {
    font-size: 0.95rem;
    margin-bottom: 1.0rem;
  }

  .card-header-title {
    height: 3rem;
  }
  
  .lh {
    max-height: 20rem;
    height: 18rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .rl {
    display: flex;
    flex-direction: row;
    flex-flow: row-reverse;
  }
  
  .rl i {
    margin: 0 0 0 0.5rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .rl i:hover {
    color: rgba(0, 0, 0, 1.0);
  }

  .il {
    display: inline-block;
  }
  
  .is-primary-gradient {
    color: rgba(255, 255, 255, 1.0);
    background: linear-gradient(30deg, rgba(222, 12, 101, 0.7), rgba(222, 12, 101, 0.9));
    padding: 1.5rem 0 1.5rem 0;
  }
  
  .is-primary-gradient:hover {
    background: linear-gradient(30deg, rgba(222, 12, 101, 0.8), rgba(222, 12, 101, 1.0));
  }
</style>