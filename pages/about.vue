<template>
  <div class="container">
    <nav-common/>
    <section class="section">
      About Page
      <br><br>
      <button class="button is-primary" @click="$store.commit('increment')">{{ $store.state.counter }}</button>
    </section>
    <footer-common/>
  </div>
</template>

<script>
  import NavCommon from "~/components/nav-common.vue";
  import FooterCommon from "~/components/footer-common.vue";
  
  export default {
    components: {
      NavCommon, FooterCommon
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