'use strict';
const MODEL_DIC = {
  mobilenet: {
    width: 224,
    height: 224,
    inputTensorSize: 224 * 224 * 3,
    outputTensorSize: 1001
  },
  squeezenet: {
    width: 224,
    height: 224,
    inputTensorSize: 224 * 224 * 3,
    outputTensorSize: 1000
  },
  posenet: {
    width: 513,
    height: 513
  },
  ssdmobilenet: {
    width: 300,
    height: 300,
    inputTensorSize: 300 * 300 * 3,
    outputBoxTensorSize: (1083 + 600 + 150 + 54 + 24 + 6) * 4,
    outputClassScoresTensorSize: (1083 + 600 + 150 + 54 + 24 + 6) * 91
  },
}

let imageElement = null;
// let inputElement = null;
// let pickBtnEelement = null;
let canvasElement = null;
let poseCanvas = null;
// let bkPoseImageSrc = null;
let pnConfigDic = null;
// const util = new Utils();

class Logger {
  constructor() {
    this.indent = 0;
  }
  time(message) {
    console.time(message);
  }
  timeEnd(message) {
    console.timeEnd(message);
  }
  log(message) {
    console.log(message);
  }
  error(err) {
    console.error(err);
  }
  group(name) {
    console.group(name);
    this.log('');
    this.indent++;
  }
  groupEnd() {
    console.groupEnd();
    this.indent--;
  }
}


let finallog = '';
let modelprogress = 0;
let probability = null;
let currentinference;
let posenetbase64;
let nalabel;

/**
* Draw img and box
* orginal code from '../js/util/base.js'
*
* @param {object} imageSource - Input image element
*/
function visualize(canvasShowElement, totalDetections, imageSource, boxesList, scoresList, classesList, labels) {
  let ctx = canvasShowElement.getContext('2d');
  if (imageSource.width) {
    canvasShowElement.width = imageSource.width / imageSource.height * canvasShowElement.height;
  } else {
    canvasShowElement.width = imageSource.videoWidth / imageSource.videoHeight * canvasShowElement.height;
  }

  let colors = ['red', 'blue', 'green', 'yellowgreen', 'purple', 'orange'];
  ctx.drawImage(imageSource, 0, 0,
                canvasShowElement.width,
                canvasShowElement.height);
  for (let i = 0; i < totalDetections; ++i) {
    // Skip background and blank
    let label = labels[classesList[i]];
    if (label !== '???') {
      let [ymin, xmin, ymax, xmax] = boxesList[i];
      ymin = Math.max(0, ymin);
      xmin = Math.max(0, xmin);
      ymax = Math.min(1, ymax);
      xmax = Math.min(1, xmax);
      ymin *= canvasShowElement.height;
      xmin *= canvasShowElement.width;
      ymax *= canvasShowElement.height;
      xmax *= canvasShowElement.width;
      let prob = 1 / (1 + Math.exp(-scoresList[i]));

      ctx.strokeStyle = '#de0c65';
      ctx.fillStyle = '#de0c65';
      ctx.lineWidth = 1;
      ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
      ctx.font = "16px arial";
      let text = `${label}: ${prob.toFixed(2)}`;
      probability = `${label}: ${prob.toFixed(2)}`;
      currentinference = text;
      lh.add(`&nbsp;&nbsp; <i class="mdi mdi-source-commit-local mdi-6px"></i> Label: ${label}, probability: ${prob.toFixed(2)}`);
      let width = ctx.measureText(text).width;
      ctx.fillRect(xmin - 2, ymin - parseInt(ctx.font, 10), width + 4, parseInt(ctx.font, 10));
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = 'start';
      ctx.fillText(text, xmin, ymin - 3);
    }
  }
}

class LoggerHTML {
  constructor() {
  }
  add(message) {
    finallog = finallog + message + '<br>';
  }
  fill() {
    // let ele = document.querySelector('#log');
    // ele.innerHTML = finallog;
    // ele.scrollTop =ele.scrollHeight; 
  }
}

let lh = new LoggerHTML();
class Benchmark {
  constructor() {
    this.summary = null;
  }
  async runAsync(configuration) {
    this.configuration = configuration;
    await this.setupAsync();
    let results = await this.executeAsync();
    await this.finalizeAsync();
    return {"computeResults": this.summarize(results.computeResults),
    "decodeResults": this.summarize(results.decodeResults)};
  }
  /**
   * Setup model
   * @returns {Promise<void>}
   */
  async setupAsync() {
    throw Error("Not Implemented");
  }

  async loadImage(canvas, width, height) {
    let ctx = canvas.getContext('2d');
    let image = new Image();
    let promise = new Promise((resolve, reject) => {
      image.crossOrigin = '';
      image.onload = () => {
        canvas.width = width;
        canvas.height = height;
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        ctx.drawImage(image, 0, 0, width, height);
        resolve(image);
      };
    });
    image.src = imageElement.src;
    return promise;
  }

  async executeAsync() {
    let computeResults = [];
    let decodeResults = [];
    let configModelName = this.configuration.modelName.toLowerCase();
    if (configModelName === 'mobilenet' || configModelName === 'squeezenet') {
    for (let i = 0; i < this.configuration.iteration; i++) {
      this.onExecuteSingle(i);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await this.setInputOutput();
      let tStart = performance.now();
      await this.executeSingleAsync();
      let elapsedTime = performance.now() - tStart;
      computeResults.push(elapsedTime);
      }
    } else if (configModelName === 'ssdmobilenet') {
      for (let i = 0; i < this.configuration.iteration; i++) {
        this.onExecuteSingle(i);
        await new Promise(resolve => requestAnimationFrame(resolve));
        await this.setInputOutput();
        let tStart = performance.now();
        await this.executeSingleAsyncSSDMN();
        let elapsedTime = performance.now() - tStart;
        computeResults.push(elapsedTime);
        let dstart = performance.now();
        decodeOutputBoxTensor(this.outputBoxTensor, this.anchors);
        let decodeTime = performance.now() - dstart;
        console.log("Decode time:" + decodeTime);
        decodeResults.push(decodeTime);
      }
      let [totalDetections, boxesList, scoresList, classesList] = NMS({}, this.outputBoxTensor, this.outputClassScoresTensor);
 
      canvasElement.setAttribute("width", imageElement.width);
      canvasElement.setAttribute("height", imageElement.height);
      visualize(canvasElement, totalDetections, imageElement, boxesList, scoresList, classesList, this.labels);
      imageElement.src = canvasElement.toDataURL();
    } else if (configModelName === 'posenet') {
      let singlePose = null;
      for (let i = 0; i < this.configuration.iteration; i++) {
        this.onExecuteSingle(i);
        await new Promise(resolve => requestAnimationFrame(resolve));
        let tStart = performance.now();
        await this.executeSingleAsyncPN();
        let elapsedTime = performance.now() - tStart;
        computeResults.push(elapsedTime);
        let dstart = performance.now();
        singlePose = decodeSinglepose(sigmoid(this.heatmapTensor), this.offsetTensor,
                                      toHeatmapsize(this.scaleInputSize, this.outputStride),
                                      this.outputStride);
        let decodeTime = performance.now() - dstart;
        console.log("Decode time:" + decodeTime);
        lh.add(`&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-check mdi-6px"></i> Decode time: ${ decodeTime.toFixed(2) } ms`)
        decodeResults.push(decodeTime);
      }
      // draw canvas by last result
      await this.loadImage(poseCanvas, imageElement.width, imageElement.height);
      let ctx = poseCanvas.getContext('2d');
      if (!singlePose) return;
      let scaleX = poseCanvas.width / this.scaleWidth;
      let scaleY = poseCanvas.height / this.scaleHeight;

      lh.add(`<div></div>`);
      lh.add(`<i class="mdi mdi-coffee-outline mdi-12px"></i> Draw`);
      console.log("Drawing key points and skeletons");
      lh.add(`&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-check mdi-6px"></i> Drawing key points and skeletons`)  
      
      singlePose.forEach((pose) => {
        if (pose.score >= this.minScore) {
          drawKeypoints(pose.keypoints, this.minScore, ctx, scaleX, scaleY);
          drawSkeleton(pose.keypoints, this.minScore, ctx, scaleX, scaleY);
        }
      });
      // bkPoseImageSrc = imageElement.src;
      // imageElement.src = poseCanvas.toDataURL();
      posenetbase64 = poseCanvas.toDataURL();
    } 
    return {"computeResults": computeResults, "decodeResults": decodeResults};
  }
  /**
   * Execute model
   * @returns {Promise<void>}
   */
  async executeSingleAsync() {
    throw Error('Not Implemented');
  }
  /**
   * Execute PoseNet model
   * @returns {Promise<void>}
   */
  async executeSingleAsyncPN() {
    throw Error('Not Implemented');
  }
  /**
   * Execute SSD MobileNet model
   * @returns {Promise<void>}
   */
  async executeSingleAsyncSSDMN() {
    throw Error('Not Implemented');
  }
  /**
   * Finalize
   * @returns {Promise<void>}
   */

  async finalizeAsync() {}
  summarize(results) {
    if (results.length !== 0) {
      results.shift(); // remove first run, which is regarded as "warming up" execution
      let d = results.reduce((d, v) => {
        d.sum += v;
        d.sum2 += v * v;
        return d;
      }, {
        sum: 0,
        sum2: 0
      });
      let mean = d.sum / results.length;
      let std = Math.sqrt((d.sum2 - results.length * mean * mean) / (results.length - 1));
      return {
        configuration: this.configuration,
        mean: mean,
        std: std,
        results: results
      };
    } else {
      return null;
    }
  }
  onExecuteSingle(iteration) {}
}
class WebMLJSBenchmark extends Benchmark {
  constructor() {
    super(...arguments);
    this.inputTensor = null;
    // outputTensor only for mobilenet and squeezenet
    this.outputTensor = null;

    // only for posenet
    this.modelVersion = null;
    this.outputStride = null;
    this.scaleFactor = null;
    this.minScore = null;
    this.scaleWidth = null;
    this.scaleHeight = null;
    this.scaleInputSize = null;
    this.heatmapTensor = null;
    this.offsetTensor  = null;

    //only for ssd mobilenet
    this.outputBoxTensor = null;
    this.outputClassScoresTensor = null;
    this.anchors = null;

    this.model = null;
    this.labels = null;
  }
  async loadModelAndLabels() {
    let arrayBuffer = await this.loadUrl(this.configuration.model, true);
    let bytes = new Uint8Array(arrayBuffer);
    let text = await this.loadUrl(this.configuration.label);
    return {
      bytes: bytes,
      text: text
    };
  }
  async loadUrl(url, binary) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      if (binary) {
        request.responseType = 'arraybuffer';
      }
      request.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            modelprogress = percentComplete;
        }
      }, false);
      request.onload = function (ev) {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve(request.response);
          } else {
            reject(new Error('Failed to load ' + url + ' status: ' + request.status));
          }
        }
      };
      request.send();
    });
  }
  async setInputOutput() {
    imageElement = document.querySelector('#testimage');
    canvasElement = document.querySelector('canvas.testimage');
    poseCanvas = document.querySelector('#poseCanvas');

    let canvasContext;

    const channels = 3;
    const imageChannels = 4; // RGBA
    let configModelName = this.configuration.modelName.toLowerCase();

    let width = MODEL_DIC[configModelName].width;;
    let height = MODEL_DIC[configModelName].height;

    let drawContent;

    if (configModelName === 'mobilenet' || configModelName === 'squeezenet') {
      this.inputTensor = new Float32Array(MODEL_DIC[configModelName].inputTensorSize);
      this.outputTensor = new Float32Array(MODEL_DIC[configModelName].outputTensorSize);
      drawContent = imageElement;
    } else if (configModelName === 'ssdmobilenet') {
      // if (bkPoseImageSrc !== null) {
      //   // reset for rerun with same image
      //   imageElement.src = bkPoseImageSrc;
      // }
      this.inputTensor = new Float32Array(MODEL_DIC[configModelName].inputTensorSize);
      this.outputBoxTensor = new Float32Array(MODEL_DIC[configModelName].outputBoxTensorSize);
      this.outputClassScoresTensor = new Float32Array(MODEL_DIC[configModelName].outputClassScoresTensorSize);
      this.anchors = generateAnchors({});
      drawContent = imageElement;
    } else if (configModelName === 'posenet') {
      // if (bkPoseImageSrc !== null) {
      //   // reset for rerun with same image
      //   imageElement.src = bkPoseImageSrc;
      // }
      if (pnConfigDic === null) {
        // Read modelVersion outputStride scaleFactor minScore from json file
        let posenetConfigURL = '../js/posenet/posenetConfig.json';
        let pnConfigText = await this.loadUrl(posenetConfigURL);
        pnConfigDic = JSON.parse(pnConfigText);
      }
      this.modelVersion = Number(pnConfigDic.modelVersion);
      this.outputStride = Number(pnConfigDic.outputStride);
      this.scaleFactor = Number(pnConfigDic.scaleFactor);
      this.minScore = Number(pnConfigDic.minScore);
      this.scaleWidth = getValidResolution(this.scaleFactor, width, this.outputStride);
      this.scaleHeight = getValidResolution(this.scaleFactor, height, this.outputStride);
      this.inputTensor = new Float32Array(this.scaleWidth * this.scaleHeight * 3);
      this.scaleInputSize = [1, this.scaleWidth, this.scaleHeight, 3];

      let HEATMAP_TENSOR_SIZE;
      if ((this.modelVersion == 0.75 || this.modelVersion == 0.5) && this.outputStride == 32) {
        HEATMAP_TENSOR_SIZE = product(toHeatmapsize(this.scaleInputSize, 16));
      } else {
        HEATMAP_TENSOR_SIZE = product(toHeatmapsize(this.scaleInputSize, this.outputStride));
      }
      let OFFSET_TENSOR_SIZE = HEATMAP_TENSOR_SIZE * 2;
      this.heatmapTensor = new Float32Array(HEATMAP_TENSOR_SIZE);
      this.offsetTensor = new Float32Array(OFFSET_TENSOR_SIZE);

      // prepare canvas for predict
      // let poseCanvasPredict = document.querySelector('#poseCanvasPredict');
      // drawContent = await this.loadImage(poseCanvasPredict, width, height);
      
      width = this.scaleWidth;
      height = this.scaleHeight;

      canvasElement.setAttribute("width", width);
      canvasElement.setAttribute("height", height);

    }
    
    canvasContext = canvasElement.getContext('2d');
    canvasContext.drawImage(imageElement, 0, 0, width, height);
    // console.log(canvasContext.getImageData(0, 0, width, height))
    let pixels = canvasContext.getImageData(0, 0, width, height).data;

    if (configModelName === 'mobilenet' || configModelName === 'ssdmobilenet' || configModelName === 'posenet') {
      const meanMN = 127.5;
      const stdMN = 127.5;
      for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
          for (let c = 0; c < channels; ++c) {
            let value = pixels[y * width * imageChannels + x * imageChannels + c];
            this.inputTensor[y * width * channels + x * channels + c] = (value - meanMN) / stdMN;
          }
        }
      } 
    } else if (configModelName === 'squeezenet') {
      // The RGB mean values are from
      // https://github.com/caffe2/AICamera/blob/master/app/src/main/cpp/native-lib.cpp#L108
      const meanSN = [122.67891434, 116.66876762, 104.00698793];
      // NHWC layout
      for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
          for (let c = 0; c < channels; ++c) {
            let value = pixels[y * width * imageChannels + x * imageChannels + c];
            this.inputTensor[y * width * channels + x * channels + c] = value - meanSN[c];
          }
        }
      }
    }
  }
  async setupAsync() {
    let targetModel;
    let configModelName = this.configuration.modelName.toLowerCase();
    if (configModelName === 'mobilenet') {
      let resultMN = await this.loadModelAndLabels();
      this.labels = resultMN.text.split('\n');
      let flatBuffer = new flatbuffers.ByteBuffer(resultMN.bytes);
      targetModel = tflite.Model.getRootAsModel(flatBuffer);
      if (this.configuration.backend !== 'native') {
        this.model = new MobileNet(targetModel, this.configuration.backend);
      } else {
        this.model = new MobileNet(targetModel);
      }
    } else if (configModelName === 'ssdmobilenet') {
      let resultSSDMN = await this.loadModelAndLabels();
      this.labels = resultSSDMN.text.split('\n');
      let flatBuffer = new flatbuffers.ByteBuffer(resultSSDMN.bytes);
      targetModel = tflite.Model.getRootAsModel(flatBuffer);
      if (this.configuration.backend !== 'native') {
        this.model = new SsdMobileNet(targetModel, this.configuration.backend);
      } else {
        this.model = new SsdMobileNet(targetModel);
      }
    } else if (configModelName === 'squeezenet') {
      let resultSN = await this.loadModelAndLabels();
      this.labels = JSON.parse(resultSN.text);
      let err = onnx.ModelProto.verify(resultSN.bytes);
      if (err) {
        throw new Error(`Invalid model ${err}`);
      }
      targetModel = onnx.ModelProto.decode(resultSN.bytes);
      if (this.configuration.backend !== 'native') {
        this.model = new SqueezeNet(targetModel, this.configuration.backend);
      } else {
        this.model = new SqueezeNet(targetModel);
      }
    } else if (configModelName === 'posenet') {
      await this.setInputOutput();
      let modelArch = ModelArch.get(this.modelVersion);
      let smType = 'Singleperson';
      let cacheMap = new Map();
      if (this.configuration.backend !== 'native') {
        this.model = new PoseNet(modelArch, this.modelVersion, this.outputStride,
                                 this.scaleInputSize, smType, cacheMap, this.configuration.backend);
      } else {
        this.model = new PoseNet(modelArch, this.modelVersion, this.outputStride,
                                 this.scaleInputSize, smType, cacheMap);                                              
      }
      
    }
    await this.model.createCompiledModel();
  }
  async printPredictResult() {
    probability = null;
    let probs = Array.from(this.outputTensor);
    let indexes = probs.map((prob, index) => [prob, index]);
    let sorted = indexes.sort((a, b) => {
      if (a[0] === b[0]) {
        return 0;
      }
      return a[0] < b[0] ? -1 : 1;
    });
    sorted.reverse();
    let classes = [];
    for (let i = 0; i < 3; ++i) {
      let prob = sorted[i][0];
      let index = sorted[i][1];
      lh.add(`&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-source-commit-local mdi-6px"></i> Label: ${this.labels[index]}, probability: ${(prob * 100).toFixed(2)}%`);
      if(i == 0) {
        probability = `${this.labels[index]}, ${(prob * 100).toFixed(2)}%`;
        currentinference = probability;
      }
    }
  }
  async executeSingleAsync() {
    let result = await this.model.compute(this.inputTensor, this.outputTensor);
    lh.add(`&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-check mdi-6px"></i> Compute result: ${result}`)
    await this.printPredictResult();
  }

  async executeSingleAsyncPN() {
    let result = await this.model.computeSinglePose(this.inputTensor, this.heatmapTensor, this.offsetTensor);
    lh.add(`&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-check mdi-6px"></i> Compute result: ${result}`)
  }

  async executeSingleAsyncSSDMN() {
    let result = await this.model.compute(this.inputTensor, this.outputBoxTensor, this.outputClassScoresTensor);
    lh.add(`&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-check mdi-6px"></i> Compute result: ${result}`)
  }


  async finalizeAsync() {
    this.model = null;
    this.labels = null;
    this.inputTensor = null;
    this.outputTensor = null;
    this.modelVersion = null;
    this.outputStride = null;
    this.scaleFactor = null;
    this.minScore = null;
    this.scaleWidth = null;
    this.scaleHeight = null;
    this.scaleInputSize = null;
    this.heatmapTensor = null;
    this.offsetTensor  = null;
    //only for ssd mobilenet
    this.outputBoxTensor = null;
    this.outputClassScoresTensor = null;
    this.anchors = null;
  }
}

const BenchmarkClass = {
  'webml-polyfill.js': WebMLJSBenchmark,
  'Web ML API': WebMLJSBenchmark
};

let testresult = [];
let bardata = [];

let bar1 = [];
let bar2 = [];
let bar3 = [];

async function runTest(configuration) {

  let logger = new Logger();
  logger.group('Benchmark');

  try {
    // let configuration = {framework: "webml-polyfill.js", backend: "WASM", modelName: "mobilenet", iteration: 4};

    logger.group('Environment Information');
    logger.log(`${'UserAgent'.padStart(12)}: ${(navigator.userAgent) || '(N/A)'}`);
    logger.log(`${'Platform'.padStart(12)}: ${(navigator.platform || '(N/A)')}`);
    logger.groupEnd();

    logger.group('Configuration');
    lh.add('<i class="mdi mdi-coffee-outline mdi-12px"></i> Configuration');
    Object.keys(configuration).forEach(key => {
      if (key === 'backend' && configuration[key] === 'native') {
        logger.log(`${key.padStart(12)}: ${getNativeAPI()}`);
        lh.add(`${key.padStart(12)}: ${getNativeAPI()}`);
      } else {
        logger.log(`${key.padStart(12)}: ${configuration[key]}`);
        lh.add(`&nbsp;&nbsp; <i class="mdi mdi-bookmark-plus-outline mdi-12px"></i> ${key.padStart(12)}: ${configuration[key]}`);
      }
    });
    logger.groupEnd();
    lh.add(`<div></div>`);
    logger.group('Run');
    lh.add(`<i class="mdi mdi-coffee-outline mdi-12px"></i> Run`);

    let benchmark = new BenchmarkClass[configuration.framework]();
    benchmark.onExecuteSingle = (i => { 
      logger.log(`Iteration: ${i + 1} / ${configuration.iteration}`);
      lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-blank-circle-outline mdi-12px"></i> Iteration: ${i + 1} / ${configuration.iteration}`)
    });
    let summary = await benchmark.runAsync(configuration);
    logger.groupEnd();
    lh.add(`<div></div>`);
    logger.group('Result');
    lh.add(`<i class="mdi mdi-coffee-outline mdi-12px"></i> Result`);

    logger.log(`[${configuration.modelName} + ${configuration.backend}] Elapsed time: ${summary.computeResults.mean.toFixed(2)}+-${summary.computeResults.std.toFixed(2)} [ms]`);
    lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-marked-circle-outline mdi-12px"></i> [${configuration.modelName} + ${configuration.backend}] Elapsed time: ${summary.computeResults.mean.toFixed(2)}+-${summary.computeResults.std.toFixed(2)} [ms]`);

    if (summary.decodeResults !== null) {
      logger.log(`[${configuration.modelName} + ${configuration.backend}] Decode time: ${summary.decodeResults.mean.toFixed(2)}+-${summary.decodeResults.std.toFixed(2)} [ms]`);
      lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-marked-circle-outline mdi-12px"></i> [${configuration.modelName} + ${configuration.backend}] Decode time: ${summary.decodeResults.mean.toFixed(2)}+-${summary.decodeResults.std.toFixed(2)} [ms]`);
    }
    
    let d = {};
    d['id'] = configuration.id;
    d['name'] = configuration.name;
    d['model'] = configuration.modelName;
    d['model_version'] = configuration.modelVersion;
    d['backend'] = configuration.backend;
    d['test_case'] = configuration.image.split('/').pop();
    d['test_result'] = summary.computeResults.mean.toFixed(2);
    if (summary.decodeResults !== null) {
      d['decode_result'] = summary.decodeResults.mean.toFixed(2);
    } else {
      d['decode_result'] = 'N/A';
    }
    d['probability'] = probability;
    d['test_unit'] = 'ms';
    testresult.push(d);

    logger.groupEnd();
    lh.add(`<div></div>`);

    switch(d['backend'].toLowerCase()){
      case 'wasm':
        bar1.push(d['test_result']);
        break;
      case 'webgl2':
        bar2.push(d['test_result']);
        break;
      case 'webml':
        bar3.push(d['test_result']);
        break;
    }

  } catch (err) {
    logger.error(err);
    lh.add(`&nbsp;&nbsp; <i class="mdi mdi-close-circle-outline mdi-12px"></i> [${configuration.modelName} + ${configuration.backend}] ` + err);
    
    let d = {};
    d['id'] = configuration.id;
    d['name'] = configuration.name;
    d['model'] = configuration.modelName;
    d['model_version'] = configuration.modelVersion;
    d['backend'] = configuration.backend;
    d['test_case'] = configuration.image.split('/').pop();
    d['test_result'] = 'N/A (*)';
    d['decode_result'] = 'N/A';
    d['probability'] = 'N/A';
    d['test_unit'] = 'ms';
    testresult.push(d);

    currentinference = 'N/A';
    nalabel = 'N/A (*): Your browser doesn\'t support native WebML API'

    lh.add(`<div></div>`);

    switch(d['backend'].toLowerCase()){
      case 'wasm':
        bar1.push(0);
        break;
      case 'webgl2':
        bar2.push(0);
        break;
      case 'webml':
        bar3.push(0);
        break;
    }

  }
  logger.groupEnd();
  lh.fill();

  if(location.pathname.indexOf("benchmark") < 0 && testresult.length > 9) {
    testresult = testresult.slice(9);
  }

}

bardata.push(bar1)
bardata.push(bar2)
bardata.push(bar3)


/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tfc from '@tensorflow/tfjs-core';
import {MobileNetTF} from '~/static/js/tf/mobilenet';
// import imageURL from '~/static/img/mobilenet/traffic_light.jpg';
// const resultElement = document.getElementById('result');

async function tf_start_run(configuration) {
  imageElement = document.querySelector('#testimage');
  let logger = new Logger();
  logger.log('Loading MobileNet...');

  const mobileNet = new MobileNetTF();
  logger.time('Loading of model');
  await mobileNet.load(configuration.model, configuration.label);
  logger.timeEnd('Loading of model');
  const pixels = tfc.fromPixels(imageElement);
 
  logger.time('First prediction');
  let result = await mobileNet.predict(pixels);
  const topK = mobileNet.getTopKClasses(result, 5);
  logger.timeEnd('First prediction');

  lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-blank-circle-outline mdi-12px"></i> Probability:`)
  let probability = ''
  let i = 0;
  topK.forEach(x => {
    logger.log(`${x.label}, ${x.value.toFixed(3)}\n`);
    if(i==0) {
      probability = `${x.label}, ${x.value.toFixed(3)}`;
      currentinference = probability;
    }
    i++;
    lh.add(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-source-commit-local mdi-12px"></i> ${x.label}, ${x.value.toFixed(3)}`)
  });

  let elapsed = 0;
  let elapsedtime = 0;
  const iterations = 3;
  lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-blank-circle-outline mdi-12px"></i> Iteration:`)
  for (let i = 0; i < iterations; ++i) {
    logger.time(`Subsequent ${i} predictions`);
    const start = performance.now();
    result = await mobileNet.predict(pixels);
    mobileNet.getTopKClasses(result, 5);
    elapsedtime = performance.now() - start;
    elapsed += performance.now() - start;
    logger.timeEnd(`Subsequent ${i} predictions`);
    lh.add(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-check mdi-12px"></i> Subsequent ${i} predictions ${elapsedtime.toFixed(3)} ms`)
  }

  const averageTime = elapsed/iterations;
  let averageText = `Average elapsed time: ${averageTime.toFixed(3)} ms\n`;
  logger.log(averageText);
  lh.add(`&nbsp;&nbsp; <i class="mdi mdi-gauge-full mdi-12px"></i> Average elapsed time: ${averageTime.toFixed(3)} ms`);
  mobileNet.dispose();

  addtestresult(configuration, averageTime, probability);

  return averageTime;
}

function addtestresult(configuration, averageTime, probability){
  let d = {};
  d['id'] = configuration.id;
  d['name'] = configuration.name;
  d['model'] = configuration.modelName;
  d['model_version'] = configuration.modelVersion;
  d['backend'] = configuration.backend;
  d['test_case'] = configuration.image.split('/').pop();
  d['test_result'] = averageTime.toFixed(3);
  d['decode_result'] = 'N/A';
  d['probability'] = probability;
  d['test_unit'] = 'ms';
  testresult.push(d);
  // nalabel = 'N/A (*): Your browser doesn\'t support native WebML API'
}

async function tf_init_run(configuration) {
  let logger = new Logger();
  let webglTime; 
  if(configuration.backend.toLowerCase() == 'webgl'){
    logger.group('Use WebGL backend');
    lh.add('<i class="mdi mdi-coffee-outline mdi-12px"></i> Use WebGL backend');
    tfc.setBackend('webgl');
    webglTime = await tf_start_run(configuration);
    logger.groupEnd();
    lh.add(`<div></div>`);
  }

  if(configuration.backend.toLowerCase() == 'cpu'){
    // As WebML POC API only accepts CPU data, so change the
    // backend to CPU.
    logger.group('Use CPU backend');
    lh.add('<i class="mdi mdi-coffee-outline mdi-12px"></i> Use CPU backend');
    tfc.setBackend('cpu');
    const webmlTime = await tf_start_run(configuration);
    // const speedupText = `Speedup: ${(webglTime/webmlTime).toFixed(3)}`;
    // logger.log(`${speedupText}`);
    logger.groupEnd();
    lh.add(`<div></div>`);
    // lh.add('<i class="mdi mdi-coffee-outline mdi-12px"></i> Result');
    // lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-marked-circle-outline mdi-12px"></i> WebGL vs WebML backend ${speedupText}`);
  }


  if(location.pathname.indexOf("benchmark") < 0 && testresult.length > 6) {
    testresult = testresult.slice(6);
  }

};
// imageElement.src = imageURL;

export { finallog, modelprogress, runTest, tf_init_run, testresult, bardata, currentinference, posenetbase64, nalabel };
