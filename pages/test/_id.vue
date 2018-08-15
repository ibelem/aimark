<template>
  <div class="container">
    <nav-common/>
    <section class="section">
      <run-common/>
    </section>
    <footer-common/>
  </div>
</template>

<script>
  import NavCommon from "~/components/nav-common.vue";
  import FooterCommon from "~/components/footer-common.vue";
  import RunCommon from "~/components/run-common.vue";
  
  export default {
    components: {
      NavCommon,
      FooterCommon,
      RunCommon
    },
    asyncData() {
    }
  };
</script>

<style scoped>
</style>