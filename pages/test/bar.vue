<template>
  <div>
    <ai_chart/>
  </div>
</template>

<script>
  import ai_nav from "~/components/ai_nav.vue";
  import ai_footer from "~/components/ai_footer.vue";
  import ai_chart from '~/components/ai_chart.vue';
  
  export default {
    components: {
      ai_nav,
      ai_footer,
      ai_chart
    }
  }
</script>