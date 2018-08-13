<template>
  <div class="container">
  <nav-common/>
    <div>
      About  
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <button class="button--grey" @click="$store.commit('increment')">{{ $store.state.counter }}</button>
      <br><br>
      <nuxt-link to='/'>Go to Home</nuxt-link>
    </div>
  </div>
</template>

<script>
import NavCommon from "~/components/nav-common.vue";

export default {
  components: {
    NavCommon
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