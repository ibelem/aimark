<template>
  <section class="container">
    <div>
      About  
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <button class="button--grey" @click="$store.commit('increment')">{{ $store.state.counter }}</button>
      <br><br>
      <nuxt-link to='/'>Go to Home</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  // transition: {
  //   name: "test",
  //   mode: "out-in"
  // },
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
.container {
  font-size: 20px;
  text-align: center;
  padding-top: 100px;
}
</style>