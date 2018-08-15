<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <environment-common/>
      <br>
      <p>
        &copy;2018 <strong>AIMark</strong> - <a href='https://github.com/intel/webml-polyfill'>WebML Polyfill Project</a> / <nuxt-link to="/">WebML Team</nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script>
  import EnvironmentCommon from "~/components/environment-common.vue";
  
  export default {
    components: {
      EnvironmentCommon,
    }
  };
</script>

<style scoped>
</style>