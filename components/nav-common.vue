<template>
  <nav class="navbar is-white">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 224 56" width="168" height="42">
              <defs><clipPath id="_clipPath_NaafQerNX9oYqPYPML1NpC0noDNNJjZs"><rect width="224" height="56"/></clipPath></defs>
              <g clip-path="url(#_clipPath_NaafQerNX9oYqPYPML1NpC0noDNNJjZs)">
                <rect x="172.75" y="5.5" width="40" height="21" transform="matrix(1,0,0,1,0,0)" fill="rgb(98, 58, 25)" fill-opacity="0.9"/>
                <g transform="matrix(0.25,0,0,0.25,4,-3)"><text id="l1" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:rgba(98, 58, 25, 1.0);stroke:none;">a</text></g>
                <g transform="matrix(0.25,0,0,0.25,28.00,-3)"><text id="l2" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:rgba(98, 58, 25, 1.0);stroke:none;">i</text></g>
                <g transform="matrix(0.25,0,0,0.25,37.00,-3)"><text id="l3" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:rgba(98, 58, 25, 1.0);stroke:none;">m</text></g>
                <g transform="matrix(0.25,0,0,0.25,79.25,-3)"><text id="l4" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:rgba(98, 58, 25, 1.0);stroke:none;">a</text></g>
                <g transform="matrix(0.25,0,0,0.25,104,-3)"><text id="l5" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:rgba(98, 58, 25, 1.0);stroke:none;">r</text></g>
                <g transform="matrix(0.25,0,0,0.25,120,-3)"><text id="l6" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:rgba(98, 58, 25, 1.0);stroke:none;">k</text></g>
                <g transform="matrix(0.25,0,0,0.25,147.25,5.5)"><text class="l7" transform="matrix(1,0,0,1,0,64.8)" style="font-size:72px;fill:rgba(98, 58, 25, 1.0);stroke:none;">for</text></g>
                <g transform="matrix(0.25,0,0,0.25,175.5,5.25)"><text class="l7" transform="matrix(1,0,0,1,0,64.8)" style="font-size:72px;fill:#FFFFFF;stroke:none;">w</text></g>
                <g transform="matrix(0.25,0,0,0.25,189.25,5.25)"><text class="l7" transform="matrix(1,0,0,1,0,64.8)" style="font-size:72px;fill:#FFFFFF;stroke:none;">e</text></g>
                <g transform="matrix(0.25,0,0,0.25,199.75,5.25)"><text class="l7" transform="matrix(1,0,0,1,0,64.8)" style="font-size:72px;fill:#FFFFFF;stroke:none;">b</text></g>
              </g>
            </svg>
      </nuxt-link>
      <div class="navbar-burger burger" data-target="navMenuColorwhite" for="nav-toggle-state">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  
    <div id="navMenuColorwhite" class="navbar-menu">
      <div class="navbar-end">
        <nuxt-link class="navbar-item" to="../benchmark">
          Benchmark
        </nuxt-link>
        <nuxt-link class="navbar-item" to="../ranking">
          Ranking
        </nuxt-link>
        <nuxt-link class="navbar-item" to="../test">
          Test
        </nuxt-link>
        <nuxt-link class="navbar-item" to="../faq">
          FAQ
        </nuxt-link>
        <nuxt-link class="navbar-item" to="../about">
          About
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'nav-common',
    mounted() {
      let navbar = document.querySelector('.navbar-burger');
      navbar.addEventListener('click', function() {
        let target = navbar.dataset.target;
        let $target = document.getElementById(target);
        navbar.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    }
  }
</script>

<style scoped>
  svg {
    font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-weight: 200;
    font-style: normal;
  }
  
  svg text {
    stroke-dasharray: 100% 0;
  }
  
  svg #l1 {
    animation: stroke-offset 0.25s ease-out;
  }
  
  svg #l2 {
    animation: stroke-offset 0.25s ease-out;
  }
  
  svg #l3 {
    animation: stroke-offset 0.65s ease-out;
  }
  
  svg #l4 {
    animation: stroke-offset 0.85s ease-out;
  }
  
  svg #l5 {
    animation: stroke-offset 0.95s ease-out;
  }
  
  svg #l6 {
    animation: stroke-offset 1.0s ease-out;
  }
  
  svg .l7 {
    animation: stroke-offset 2.0s ease-in;
  }
  
  svg rect {
    animation: stroke-offset 2.0s ease-in;
  }
  
  @keyframes stroke-offset {
    0% {
      fill-opacity: 0;
      stroke-width: 0;
      stroke-dasharray: 0% 100%;
    }
    25% {
      stroke-width: 3px;
    }
    50% {
      fill-opacity: 0;
    }
    75% {
      stroke-width: 3px;
    }
    100% {
      stroke-width: 0;
    }
  }
</style>
