<template>
  <div class="container">
    <nav-common/>
    <section class="section">
      <h2 class="subtitle">
        The WebML Benchmark consists of multiple AI tasks performed by separate neural networks on your pc or smartphone.
      </h2>
      <test-common/>
    </section>
    <footer-common/>
  </div>
</template>

<script>
  import NavCommon from "~/components/nav-common.vue";
  import FooterCommon from "~/components/footer-common.vue";
  import TestCommon from "~/components/test-common.vue";

  export default {
    components: {
      NavCommon, FooterCommon, TestCommon
    },
    asyncData() {
      return new Promise(resolve => {
        setTimeout(function() {
          resolve({});
        }, 1000);
      });
    }
  };
</script>

<style scoped>
  .title {
    font-weight: 200;
  }
  
  .subtitle {
    font-weight: ２00;
    font-size: 1rem;
  }
  
</style>