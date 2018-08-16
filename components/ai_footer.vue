<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <Environment/>
      <br>
      <p>
        &copy;2018 <strong>AIMark</strong> - <a href='https://github.com/intel/webml-polyfill'>WebML Polyfill Project</a> / <nuxt-link to="/">WebML Team</nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script>
  import Environment from "~/components/ai_environment.vue";
  
  export default {
    components: {
      Environment,
    }
  };
</script>

<style scoped>
</style>