<template>
  <div class="bar-chart">
    <bar-chart v-if="showBar" :data="barData" :options="options" />
  </div>
</template>

<script>
  export default {
    mounted() {
      this.showBar = true
    },
    data() {
      return {
        showBar: false,
        barData: {
          labels: ['bee_eater.jpg', 'pineapple.jpg', 'pinwheel.jpg'],
          datasets: [{
            label: 'WASM',
            backgroundColor: '#7bd9a5',
            data: [40, 39, 10]
          },
          {
            label: 'WebGL',
            backgroundColor: '#22c3aa',
            data: [10, 9, 80]
          },
          {
            label: 'WebML',
            backgroundColor: '#4ea397',
            data: [10, 9, 80]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  }
</script>