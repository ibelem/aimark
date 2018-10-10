# aimark

> Web AI Benchmark

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

--

Browser Performance

                IDLE   Loaded   WASM    WebGL2  WebML   All_Backends
  Browser       31804K 35024K   35824K  36576K  36328K  37008K
  GPU Process   26316K 28648K   29004K  50656K  214476K 352520K
  BenchmarkPage 22080K 72976K   296456K 246040K 81828K  374880K

  Test Environment: AMD64 8 Cores - 8 GB - HD 530 - Linux x86_64 - Chrome 70.0.3503.0