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
    <div v-if='ispolyfill' class='webmlbadge is-small mr'>
      <div class='webml-title'>Polyfill</div>
      <div class='webml-status webml-status-true'>
        <span>Enabled</span>
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
      updateWebMLStatus: function() {
        if (navigator.ml && navigator.ml.getNeuralNetworkContext()) {
          if (!navigator.ml.isPolyfill) {
            this.webmlstatus = true;
            this.ispolyfill = false;
          } else {
            this.webmlstatus = false;
            this.ispolyfill = true;
          }
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
  .mr {
    margin: 0 0.40rem;
  }
  
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
  
  @media (max-width: 768px) {
    .webmlbadge {
      font-size: 0.8rem;
    }
    .webml-title,
    .webml-status {
      padding: 0.25rem 0.5rem;
    }
  }
  
  @media (max-width: 320px) {
    .webmlbadge {
      font-size: 0.70rem;
    }
    .webml-title,
    .webml-status {
      padding: 0.25rem;
    }
  }
</style>
