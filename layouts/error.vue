<template>
  <div>
    <section class="hero">
      <div class="container">
        <nav-common/>
        <div class="er">
          <h1 v-if="error.statusCode === 404">Oops, page not found</h1>
          <h1 v-else>An error occured</h1>
        </div>
      </div>
    </section>
    <div class="container">
      <footer-common/>
    </div>
  </div>
</template>

<script>
  import NavCommon from "~/components/nav-common.vue";
  import FooterCommon from "~/components/footer-common.vue";
  
  export default {
    components: {
      NavCommon,
      FooterCommon
    },
    props: {
      error: {
        type: Object,
        default: null
      }
    }
  };
</script>

<style scoped>
  .er {
    margin: 4rem auto;
    text-align: center;
    font-size: 1.0rem;
    font-weight: 200;
  }
  .er h1 {
    font-weight: 200;
  }
</style>