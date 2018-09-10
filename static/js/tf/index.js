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

import {MobileNet} from '~/static/js/tf/mobilenet';
// import imageURL from '~/static/img/mobilenet/traffic_light.jpg';
// const resultElement = document.getElementById('result');

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
let progress = 0 ;
let probability = null;
let testresult = [];
let bardata = [];

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
async function start_run() {
  let imageElement = document.querySelector('#testimage');

  let logger = new Logger();

  logger.log('Loading MobileNet...');
  

  const mobileNet = new MobileNet();
  logger.time('Loading of model');
  await mobileNet.load();
  logger.timeEnd('Loading of model');
  const pixels = tfc.fromPixels(imageElement);

  logger.time('First prediction');
  let result = await mobileNet.predict(pixels);
  const topK = mobileNet.getTopKClasses(result, 5);
  logger.timeEnd('First prediction');

  topK.forEach(x => {
    logger.log(`${x.value.toFixed(3)}: ${x.label}\n`)
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
  lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-marked-circle-outline mdi-12px"></i> Average elapsed time: ${averageTime.toFixed(3)} ms`);
  mobileNet.dispose();
  return averageTime;
}

async function init_run() {
  let logger = new Logger();
  logger.group('Use WebGL backend');
  lh.add('<i class="mdi mdi-coffee-outline mdi-12px"></i> Use WebGL backend');
  tfc.setBackend('webgl');
  const webglTime = await start_run();
  logger.groupEnd();
  lh.add(`<div></div>`);
  logger.group('Use WebML backend');
  lh.add('<i class="mdi mdi-coffee-outline mdi-12px"></i> Use WebML backend');
  progress = 1;
  // As WebML POC API only accepts CPU data, so change the
  // backend to CPU.
  tfc.setBackend('cpu');
  const webmlTime = await start_run();

  const speedupText = `Speedup: ${(webglTime/webmlTime).toFixed(3)}`;
  logger.log(`${speedupText}`);
  logger.groupEnd();
  lh.add(`<div></div>`);
  lh.add('<i class="mdi mdi-coffee-outline mdi-12px"></i> Result');
  lh.add(`&nbsp;&nbsp; <i class="mdi mdi-checkbox-marked-circle-outline mdi-12px"></i> WebGL vs WebML backend ${speedupText}`);
  progress = 2;
};
// imageElement.src = imageURL;

export { finallog, progress, init_run, testresult, bardata };
