<template>
  <footer class="footer">
    <ai_connection/>
    <div class="content has-text-centered">
      <ai_environment/>
      <br>
      <p>
        &copy;2018 <strong>AIMark</strong> <a href='https://github.com/intel/webml-polyfill'>WebML Polyfill Project</a> / <nuxt-link to="/">WebML Team</nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script>
  import ai_environment from "~/components/ai_environment.vue";
  import ai_connection from "~/components/ai_connection.vue"
  
  export default {
    components: {
      ai_environment, ai_connection
    }
  };
</script>

<style scoped>
  strong {
    margin-right: 0.5rem;
  }
</style>