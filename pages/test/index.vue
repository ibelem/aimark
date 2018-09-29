<template>
  <div class="container">
    <ai_nav/>
    <section class="section">
      <h1 class="subtitle">
        The AIMmark for Web consists of multiple AI tasks performed by separate neural networks on your desktop or smartphone browsers.
      </h1>
      <ai_test/>
    </section>
    <ai_footer/>
  </div>
</template>

<script>
  import ai_nav from "~/components/ai_nav.vue";
  import ai_footer from "~/components/ai_footer.vue";
  import ai_test from "~/components/ai_test.vue";

  export default {
    components: {
      ai_nav, ai_footer, ai_test
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
    font-size: 1rem;
  }
  
</style>