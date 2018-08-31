<template>
  <div>
    <section>
      <div class="container">
        <ai_nav/>
        <div class="er">
          <h1 v-if="error.statusCode === 404">Oops, page not found. You boldly go where no man has gone before. <br><nuxt-link to='../'>Back Home</nuxt-link></h1>
          <h1 v-else>An error occured</h1>
        </div>
      </div>
    </section>
    <div class="container">
      <ai_footer/>
    </div>
  </div>
</template>

<script>
  import ai_nav from "~/components/ai_nav.vue";
  import ai_footer from "~/components/ai_footer.vue";
  
  export default {
    components: {
      ai_nav,
      ai_footer
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
    margin: 4rem 1.5rem;
    text-align: center;
    font-size: 1.0rem;
    font-weight: 200;
  }
  .er h1 {
    font-weight: 200;
  }
</style>