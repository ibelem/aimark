# aimark

AI Benchmark for Web

> The AIMark for web consists of multiple AI tests performed by separate neural networks on your pc or smartphone browsers.

## Precondition - Models

1. Download following models

| Model Name | Paper | Model_Files |
|--------------------- | ---------:|
| Mobilenet_V1_1.0_224 | [paper](https://arxiv.org/abs/1704.04861) |  [model file](http://download.tensorflow.org/models/mobilenet_v1_2018_02_22/mobilenet_v1_1.0_224.tgz)| 
| Mobilenet_V2_1.0_224 | [paper](https://arxiv.org/abs/1801.04381) |  [model file](http://download.tensorflow.org/models/tflite_11_05_08/mobilenet_v2_1.0_224.tgz)| 
| SqueezeNet | [paper](https://arxiv.org/abs/1602.07360) |  [model file](https://s3.amazonaws.com/download.onnx/models/squeezenet.tar.gz)| 
| Inception_V3 | [paper](http://arxiv.org/abs/1512.00567) |  [model file](https://storage.googleapis.com/download.tensorflow.org/models/tflite/model_zoo/upload_20180427/inception_v3_2018_04_27.tgz)| 
| SSD Mobilenet | [paper](https://arxiv.org/abs/1801.04381) |  [model file](https://drive.google.com/file/d/1bKD4eK8Zh9x_R7wc9CxpLHk2hrYG5orU/view?usp=sharing)| 
|  PoseNet | [paper](https://arxiv.org/abs/1803.08225) | [model file](https://github.com/tensorflow/tfjs-models/blob/master/posenet/src/checkpoints.ts)| 

2. Untar or unzip downloaded models to following paths:


> aimark/static/model

├── mobilenet

│   ├── labels.txt

│   ├── mobilenet_v1_1.0_224.tflite

│   ├── mobilenet_v2_1.0_224.tflite

├── squeezenet

│   ├── labels.json

│   ├── model.onnx

│   ├── README.md

│   ├── test_data_set_0

│   │   ├── input_0.pb

│   │   └── output_0.pb

│   ├── test_data_set_1

│   │   ├── input_0.pb

│   │   └── output_0.pb

│   └── test_data_set_2

│       ├── input_0.pb

│       └── output_0.pb

├── inception

│   ├── inception_v3.tflite

│   ├── labels.txt

├── ssd_mobilenet

│   ├── coco_labels_list.txt

│   └── ssd_mobilenet.tflite

├── posenet

│   ├── mobilenet_v1_100

│   │   ├── manifest.json

│   │   ├── MobilenetV1_Conv2d_0_biases

│   │   ├── *

│   ├── mobilenet_v1_101

│   │   ├── manifest.json

│   │   ├── MobilenetV1_Conv2d_0_biases

│   │   ├── *

│   ├── mobilenet_v1_050

│   ├── mobilenet_v1_075

