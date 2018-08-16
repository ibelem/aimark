<template>
  <div class="container">
    <ai_nav/>
    <section class="section">
      About Page
      <br><br>
      <button class="button is-primary" @click="$store.commit('increment')">{{ $store.state.counter }}</button>
    </section>
    <ai_footer/>
  </div>
</template>

<script>
  import ai_nav from "~/components/ai_nav.vue";
  import ai_footer from "~/components/ai_footer.vue";
  
  export default {
    components: {
      ai_nav, ai_footer
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
  
</style>