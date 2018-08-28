<template>
  <footer class="footer">
    <ai_connection/>
    <div class="content has-text-centered">
      <ai_webml_badge/>
      <br><br>
      <ai_environment/>
      <br>
      <p>
        &copy;2018 <strong>AIMark</strong> <nuxt-link to="https://github.com/intel/webml-polyfill">WebML Team</nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script>
  import ai_environment from "~/components/ai_environment.vue";
  import ai_connection from "~/components/ai_connection.vue";
  import ai_webml_badge from "~/components/ai_webml_badge.vue";
  
  export default {
    components: {
      ai_environment, ai_connection, ai_webml_badge
    }
  };
</script>

<style scoped>
  strong {
    margin-right: 0.5rem;
  }
</style>