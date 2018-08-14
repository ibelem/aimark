<template>
  <section>
    <div class="columns">
      <div v-for="task in tasks" :key="task.id" class="column is-mobile is-half-tablet is-half-desktop is-one-fourth-widescreen is-one-third-fullhd">
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              Task {{ task.id }}: {{ task.name }}
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
                <li>Neural Network: {{ task.nn }} {{ task.nn_version }}</li>
                <li>Model Size: {{ task.model_size }}</li>
                <li>Image Resolution: 480 x 480</li>
                <li>Accuracy: {{ task.accuracy }}</li>
                <li>Backend: {{ task.backend }}</li>
              </ul>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" :href="task.paper_url">Paper</a>
            <a class="card-footer-item" :href="task.model_url">Model</a>
          </footer>
          <footer class="card-footer">
            <a href="#" ref='btn' class="card-footer-item is-primary-gradient button" @click="run(task)">
              Run Test
            </a>
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
            "name": 'Image Classification (MobileNet)',
            "description": 'An efficient Convolutional Neural Networks for Mobile Vision Applications. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
            "nn": 'MobileNet',
            "nn_version": 'v1.0_224',
            "accuracy": '70.9%',
            "backend": 'WASM, WebGL2, WebML',
            "model_size": '16.9Mb',
            "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
            "model_url": 'http://download.tensorflow.org/models/mobilenet_v1_2018_02_22/mobilenet_v1_1.0_224.tgz',
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
          }
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
  .lh {
    max-height: 20rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .is-primary-gradient {
    color: rgba(255, 255, 255, 1.0);
    background: linear-gradient(30deg, rgba(165, 112, 63, 0.9), rgba(98, 58, 25, 0.9)); 
  }

  .is-primary-gradient:hover {
    background: linear-gradient(30deg, rgba(165, 112, 63, 1.0), rgba(98, 58, 25, 1.0)); 
  }
</style>