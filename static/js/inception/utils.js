
const MODEL_FILE = './model/inception_v3.tflite';
const LABELS_FILE = './model/labels.txt';

class Utils {
  constructor() {
    this.tfModel;
    this.labels;
    this.model;
    this.inputTensor;
    this.outputTensor;

    this.inputTensor = new Float32Array(INPUT_TENSOR_SIZE);
    this.outputTensor = new Float32Array(OUTPUT_TENSOR_SIZE);
    this.container = document.getElementById('container');
    this.progressBar = document.getElementById('progressBar');
    this.progressContainer = document.getElementById('progressContainer');
    this.canvasElement = document.getElementById('canvas');
    this.canvasContext = this.canvasElement.getContext('2d');

    this.initialized = false;
  }

  async init(backend) {
    this.initialized = false;
    let result;
    if (!this.tfModel) {
      result = await this.loadModelAndLabels(MODEL_FILE, LABELS_FILE);
      this.container.removeChild(progressContainer);
      this.labels = result.text.split('\n');
      console.log(`labels: ${this.labels}`);
      let flatBuffer = new flatbuffers.ByteBuffer(result.bytes);
      this.tfModel = tflite.Model.getRootAsModel(flatBuffer);
      printTfLiteModel(this.tfModel);
    }
    this.model = new Inception_V3(this.tfModel, backend);
    result = await this.model.createCompiledModel();
    console.log(`compilation result: ${result}`);
    let start = performance.now();
    result = await this.model.compute(this.inputTensor, this.outputTensor);
    let elapsed = performance.now() - start;
    console.log(`warmup time: ${elapsed.toFixed(2)} ms`);
    this.initialized = true;
  }

  async predict(imageSource) {
    if (!this.initialized) return;
    this.canvasContext.drawImage(imageSource, 0, 0,
                                 this.canvasElement.width,
                                 this.canvasElement.height);
    this.prepareInputTensor(this.inputTensor, this.canvasElement);
    let start = performance.now();
    let result = await this.model.compute(this.inputTensor, this.outputTensor);
    let elapsed = performance.now() - start;
    let classes = this.getTopClasses(this.outputTensor, this.labels, 3);
    console.log(`Inference time: ${elapsed.toFixed(2)} ms`);
    let inferenceTimeElement = document.getElementById('inferenceTime');
    inferenceTimeElement.innerHTML = `inference time: <em style="color:green;font-weight:bloder;">${elapsed.toFixed(2)} </em>ms`;
    console.log(`Classes: `);
    classes.forEach((c, i) => {
      console.log(`\tlabel: ${c.label}, probability: ${c.prob}%`);
      let labelElement = document.getElementById(`label${i}`);
      let probElement = document.getElementById(`prob${i}`);
      labelElement.innerHTML = `${c.label}`;
      probElement.innerHTML = `${c.prob}%`;
    });
  }


  prepareInputTensor(tensor, canvas) {
    const width = 299;
    const height = 299;
    const channels = 3;
    const imageChannels = 4; // RGBA
    const mean = 127.5;
    const std = 127.5;
    if (canvas.width !== width || canvas.height !== height) {
      throw new Error(`canvas.width(${canvas.width}) or canvas.height(${canvas.height}) is not 299`);
    }
    let context = canvas.getContext('2d');
    let pixels = context.getImageData(0, 0, width, height).data;
    // NHWC layout
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        for (let c = 0; c < channels; ++c) {
          let value = pixels[y*width*imageChannels + x*imageChannels + c];
          tensor[y*width*channels + x*channels + c] = (value - mean)/std;
        }
      }
    }
  }
 