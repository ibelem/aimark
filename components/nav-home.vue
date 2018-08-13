<template>
  <nav class="navbar">
  <div class="navbar-brand">
    <nuxt-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </nuxt-link>
    <div class="navbar-burger burger" data-target="navMenuColorwhite" for="nav-toggle-state">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navMenuColorwhite" class="navbar-menu">
    <div class="navbar-start">
    </div>
    <div class="navbar-end">
       <nuxt-link class="navbar-item" to="benchmark">
        Benchmark
      </nuxt-link>
      <div class="navbar-item has-dropdown is-hoverable">
        <nuxt-link class="navbar-link" to="ranking">
          Ranking
        </nuxt-link>
        <div class="navbar-dropdown is-boxed is-right">
          <nuxt-link class="navbar-item" to="overview">
            Overview
          </nuxt-link>
          <hr class="navbar-divider">
          <nuxt-link class="navbar-item" to="platforms">
            Platforms
          </nuxt-link>
        </div>
      </div>
      <nuxt-link class="navbar-item" to="tests">
        Tests
      </nuxt-link>
      <nuxt-link class="navbar-item" to="faq">
        FAQ
      </nuxt-link>
      <nuxt-link class="navbar-item" to="about">
        About
      </nuxt-link>
    </div>
  </div>
  </nav>
</template>

<script>
    export default {
        name: 'nav-home',
        mounted() {
            let navbar = document.querySelector('.navbar-burger');
            navbar.addEventListener('click', function () {
                let target = navbar.dataset.target;
                let $target = document.getElementById(target);
                navbar.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        }
    }
</script>

<style scoped>
</style>
