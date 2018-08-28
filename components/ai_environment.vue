<template>
  <div class="">
        <div v-if="devicevendor.toString().length > 0 || devicemodel.toString().length > 0 || devicetype.toString().length > 0">
          Model: {{ devicevendor }} {{ devicemodel }} {{ devicetype }}
        </div>
        {{ cpuarchitecture }} {{ cpuhardwareconcurrency }} / 
        <span v-if="devicememory.toString().length > 0">
        {{ devicememory }} /
        </span>
        {{ gpu }}<br>
        {{ os }} {{ osversion }} {{ osplatform }} / 
        {{ browsername }} {{ browserversion }}
  </div>
</template>

<script>
  export default {
    name: 'environment',
    head: {
      script: [{
          src: 'https://cdn.jsdelivr.net/npm/ua-parser-js@0/dist/ua-parser.min.js',
          defer: true
        },
        {
          src: '../js/environment.js',
          defer: true
        },
      ],
      link: [{
        rel: 'stylesheet',
        href: ''
      }]
    },
    mounted: function() {
        let aienv = new AIEnvironment();
        let result = aienv.result();
        this.devicevendor = result.hardware.devicevendor ? result.hardware.devicevendor : ''
        this.devicemodel = result.hardware.devicemodel ? result.hardware.devicemodel : ''
        this.devicetype = result.hardware.devicetype ? result.hardware.devicetype : ''
        this.devicememory = result.hardware.devicememory ? result.hardware.devicememory : ''
        this.cpuarchitecture = result.hardware.cpuarchitecture;
        this.cpuhardwareconcurrency = result.hardware.cpuhardwareconcurrency;
        this.gpu = result.hardware.gpu;
        this.gpuvender = result.hardware.gpuvender;
        
        this.os = result.software.os;
        this.osversion = result.software.osversion;
        this.platform = result.software.platform;
        this.browsername = result.browser.name;
        this.browserversion = result.browser.version;
        this.enginename = result.browser.enginename;
        this.engineversion = result.browser.engineversion;
    },
    methods: {
    },
    computed: {
      // os_and_version: function() {
      //   return this.os + ' ' + this.osversion
      // }
    },
    data() {
      return {
        devicevendor: '',
        devicemodel: '',
        devicetype: '',
        devicememory: '',
        cpuarchitecture: '',
        cpuhardwareconcurrency: '',
        gpu: '',
        gpuvender: '',
        os: '',
        osversion: '',
        osplatform: '',
        browsername: '',
        browserversion: '',
        enginename: '',
        engineversion: ''
      }
    }
  };
</script>

<style scoped>
  
</style>
