<template>
  <div>
    <div v-if="$route.params.id <= tasks.length">
      <div v-for="task in tasks" v-if="$route.params.id  == task.id" :key="task.id">
        <h2 class="subtitle">
          {{ task.name }}
        </h2>
        <div>{{ task.description }}</div>
      </div>
    </div>
    <div v-else>
      Oops, you boldly go where no man has gone before. <nuxt-link to='../'>Back Home</nuxt-link>
    </div>
  </div>
</template>


<script>
  export default {
    name: "task",
    data() {
      return {
        tasks: [{
            "id": 1,
            "name": 'Image Classification (MobileNet)',
            "description": 'An efficient Convolutional Neural Networks for Mobile Vision Applications. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
            "nn": 'MobileNet',
            "nn_version": 'v1.0_224',
            "accuracy": '70.9%',
            "backend": 'WASM, WebGL2, WebML',
            "model_size": '16.9Mb',
            "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
            "model_url": 'http://download.tensorflow.org/models/mobilenet_v1_2018_02_22/mobilenet_v1_1.0_224.tgz',
            "webml_url": 'https://github.com/intel/webml-polyfill',
            "platform": [
              'android',
              'windows',
              'linux'
            ],
            "browser": [
              'chrome',
              'firefox'
            ]
          },
          {
            "id": 2,
            "name": 'Image Classification (SqueezeNet)',
            "description": 'A light-weight CNN providing Alexnet level accuracy with 50X fewer parameters. Loading SqueezeNet model trained by ImageNet in ONNX format, constructs and inferences it by WebML API.',
            "nn": 'SqueezeNet',
            "nn_version": 'v1.1',
            "accuracy": '56.34%',
            "backend": 'WASM, WebGL2, WebML',
            "model_size": '5.0Mb',
            "paper_url": 'https://arxiv.org/abs/1602.07360',
            "model_url": 'https://s3.amazonaws.com/download.onnx/models/squeezenet.tar.gz',
            "webml_url": 'https://github.com/intel/webml-polyfill',
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
          }
        ]
      }
    }
  };
</script>

<style scoped>
  
</style>