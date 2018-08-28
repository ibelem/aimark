<template>
  <div>
    <div class='webmlbadge is-small mr'>
      <div class='webml-title'>WebML</div>
      <div v-if='webmlstatus' class='webml-status webml-status-true'>
        <span>Compatible</span>
      </div>
      <div v-else class='webml-status webml-status-false'>
        <span>Incompatible</span>
      </div>
    </div>
    <div class='webmlbadge is-small'>
      <div class='webml-title'>WebML Polyfill</div>
      <div v-if='ispolyfill' class='webml-status webml-status-true'>
        <span >Enabled</span>
      </div>
      <div v-else class='webml-status webml-status-false'>
        <span>Disabled</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ai_webml_badge",
    mounted: function() {
      setTimeout(this.updateWebMLStatus, 100);
    },
    methods: {
      updateWebMLStatus: function(){
        let _this = this;
        if (navigator.ml && navigator.ml.getNeuralNetworkContext()) {
          _this.webmlstatus = true;
          if (navigator.ml.isPolyfill) {
            _this.ispolyfill = true;
          } else {
            _this.ispolyfill = false;
          }
        } else {
          _this.webmlstatus = false;
          _this.ispolyfill = false;
        }
      }
    },
    destoryed() {
      clearTimeout(this.updateWebMLStatus);
    },
    data() {
      return {
        webmlstatus: false,
        ispolyfill: false,
      }
    }
  }
</script>

<style scoped>
  .mr { margin: 0 0.5rem;}
  .webmlbadge {
    display: inline-block;
  }
  
  .webml-title {
    display: inline-block;
    border: 1px solid rgba(222, 12, 101, 0.9);
    background: rgba(222, 12, 101, 0.9);
    color: rgba(255, 255, 255, 1.0);
    padding: 0.5rem;
  }

  .webml-title:hover {
    border: 1px solid rgba(222, 12, 101, 1.0);
    background: rgba(222, 12, 101, 1.0);
  }
  
  .webml-status {
    display: inline-block;
    color: rgba(255, 255, 255, 1.0);
    padding: 0.5rem;
  }
  
  .webml-status-false {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  
  .webml-status-true {
    background: transparent;
    color: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(222, 12, 101, 0.9);
  }
</style>