'use strict';

class Logger {
  constructor() {
    this.indent = 0;
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
    return this.summarize(results);
  }
  /**
   * Setup model
   * @returns {Promise<void>}
   */
  async setupAsync() {
    throw Error("Not Implemented");
  }
  async executeAsync() {
    let results = [];
    for (let i = 0; i < this.configuration.iteration; i++) {
      this.onExecuteSingle(i);
      await new Promise(resolve => requestAnimationFrame(resolve));
      let tStart = performance.now();
      await this.executeSingleAsync();
      let elapsedTime = performance.now() - tStart;
      results.push(elapsedTime);
    }
    return results;
  }
  /**
   * Execute model
   * @returns {Promise<void>}
   */
  async executeSingleAsync() {
    throw Error('Not Implemented');
  }
  /**
   * Finalize
   * @returns {Promise<void>}
   */
  async finalizeAsync() {}
  summarize(results) {
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
  }
  onExecuteSingle(iteration) {}
}
class WebMLJSBenchmark extends Benchmark {
  constructor() {
    super(...arguments);
    this.inputTensor = null;
    this.outputTensor = null;
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
            // $("#progressing").html((percentComplete * 100) + "%");
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
  setInputOutput() {
    const width = 224;
    const height = 224;
    const channels = 3;
    const imageChannels = 4; // RGBA
    this.inputTensor = new Float32Array(224 * 224 * 3);
    this.outputTensor = new Float32Array(1001);
    let canvasElement = document.querySelector('canvas');
    let canvasContext = canvasElement.getContext('2d');
    let imageElement = document.querySelector('img');
    imageElement.src = this.configuration.test;
    canvasContext.drawImage(imageElement, 0, 0, width, height);
    let pixels = canvasContext.getImageData(0, 0, width, height).data;
    if (this.configuration.modelName.toLowerCase() === 'mobilenet') {
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
    } 
  }
  async setupAsync() {
    this.setInputOutput();
    let result = await this.loadModelAndLabels();
    let targetModel;
    if (this.configuration.modelName.toLowerCase() === 'mobilenet') {
      this.labels = result.text.split('\n');
      let flatBuffer = new flatbuffers.ByteBuffer(result.bytes);
      targetModel = tflite.Model.getRootAsModel(flatBuffer);
      if (this.configuration.backend !== 'native') {
        this.model = new MobileNet(targetModel, this.configuration.backend);
      } else {
        this.model = new MobileNet(targetModel);
      }
    } 
    await this.model.createCompiledModel();
  }
  printPredictResult() {
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
      console.log(`label: ${this.labels[index]}, probability: ${(prob * 100).toFixed(2)}%`);
      lh.add(`&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-check mdi-6px"></i> label: ${this.labels[index]}, probability: ${(prob * 100).toFixed(2)}%`);
    }
  }
  async executeSingleAsync() {
    let result = await this.model.compute(this.inputTensor, this.outputTensor);
    console.log(`compute result: ${result}`);
    lh.add(`&nbsp;&nbsp;&nbsp;&nbsp; <i class="mdi mdi-check mdi-6px"></i> compute result: ${result}`)
    this.printPredictResult();
  }
  async finalizeAsync() {
    this.model = null;
  }
}

const BenchmarkClass = {
  'webml-polyfill.js': WebMLJSBenchmark,
  'Web ML API': WebMLJSBenchmark
};

let testresult = [];

async function runMobilenet(configuration) {
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

    let benchmark = new BenchmarkClass['webml-polyfill.js']();
    benchmark.onExecuteSingle = (i => { 
      logger.log(`Iteration: ${i + 1} / ${configuration.iteration}`);
      lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-blank-circle-outline mdi-12px"></i> Iteration: ${i + 1} / ${configuration.iteration}`)
    });
    let summary = await benchmark.runAsync(configuration);
    logger.groupEnd();
    lh.add(`<div></div>`);
    logger.group('Result');
    lh.add(`<i class="mdi mdi-coffee-outline mdi-12px"></i> Result`);

    logger.log(`[${configuration.modelName} + ${configuration.backend}] Elapsed Time: ${summary.mean.toFixed(2)}+-${summary.std.toFixed(2)} [ms]`);
    lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-marked-circle-outline mdi-12px"></i> [${configuration.modelName} + ${configuration.backend}] Elapsed Time: ${summary.mean.toFixed(2)}+-${summary.std.toFixed(2)} [ms]`);
    
    let d = {};
    d['model'] = configuration.modelName;
    d['model_version'] = configuration.modelVersion;
    d['backend'] = configuration.backend;
    d['test_case'] = configuration.test.split('/').pop();
    d['test_result'] = summary.mean.toFixed(2);
    d['test_unit'] = 'ms';
    testresult.push(d);

    logger.groupEnd();
    lh.add(`<div></div>`);
    console.log(testresult)
  } catch (err) {
    logger.error(err);
    lh.add(`&nbsp;&nbsp; <i class="mdi mdi-close-circle-outline mdi-12px"></i> [${configuration.modelName} + ${configuration.backend}] ` + err);
    
    let d = {};
    d['model'] = configuration.modelName;
    d['model_version'] = configuration.modelVersion;
    d['backend'] = configuration.backend;
    d['test_case'] = configuration.test.split('/').pop();
    d['test_result'] = 'N/A';
    d['test_unit'] = 'ms';
    testresult.push(d);

    lh.add(`<div></div>`);
  }
  logger.groupEnd();
  lh.fill();
}

export { finallog, modelprogress, runMobilenet, testresult};