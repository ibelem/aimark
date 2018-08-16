<template>
  <div class="container">
    <ai_nav/>
    <section class="section">
      <h2 class="subtitle">
        The WebML Benchmark consists of multiple AI tasks performed by separate neural networks on your desktop or smartphone.
      </h2>
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
    font-weight: ２00;
    font-size: 1rem;
  }
  
</style>