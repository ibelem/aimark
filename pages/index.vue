<template>
  <div>
    <section class="hero is-primary is-fullheight">
      <div class="hero-head container ex">
        <ai_nav_home/>
      </div>
      <div class="hero-body">
        <div class="container has-text-left">
          <div class="entrance">
            <h2 class="featured">
              Featured
            </h2>
            <h1 class="title">
              AIMark
            </h1>
            <h2 class="subtitle">
              The AIMark for web consists of multiple AI tests performed by separate neural networks on your pc or smartphone browsers.
            </h2>
            <!-- <h2 class="subtitle">
                WebML is a Web API set for a dedicated API for Machine Learning inference in the browser.
              </h2>
              -->
            <a href="benchmark" class="button is-primary">
                Run Benchmark
              </a>
            <nuxt-link to="test" class="button is-non-primary ml">
              View Tests
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  
    <div class="container">
      <div class="notification">
      </div>
      <ai_footer/>
    </div>
  </div>
</template>

<script>
  import ai_nav_home from "~/components/ai_nav-home.vue";
  import ai_footer from "~/components/ai_footer.vue";
  
  export default {
    components: {
      ai_nav_home,
      ai_footer
    },
    data() {
      return {
        isLoading: false,
        isFullPage: true
      };
    },
    methods: {
      openLoading() {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 10 * 1000);
      }
    }
  };
</script>

<style scoped>
  .hero {
    background-image: url("../static/img/home-hero.jpg");
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    transition: opacity .35s ease-in-out;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
  }
  
  .hero.is-primary,
  .button.is-primary {
    background-color: rgba(222, 12, 101, 0.8);
  }
  
  .button.is-primary:hover {
    background-color: rgba(222, 12, 101, 1.0);
  }
  
  .entrance {
    max-width: 400px;
    text-align: left;
    padding: 1.5rem;
  }
  
  .featured {
    font-size: 1.0rem;
    display: inline-block;
    font-variant-caps: all-petite-caps;
    border-bottom: rgba(222, 12, 101, 0.8) 2px solid;
    margin-bottom: 1rem;
  }
  
  .entrance:hover {
    background-color: rgba(222, 12, 101, 0.1);
  }
  
  .button.is-non-primary {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
  
  .button.is-non-primary:hover {
    background-color: transparent;
    color: rgba(255, 255, 255, 1.0);
    border: 1px solid rgba(255, 255, 255, 1.0);
  }
  
  .title {
    font-weight: 200;
  }
  
  .subtitle {
    font-weight: 300;
    font-size: 0.9rem;
  }
  
  .button {
    font-weight: 200;
  }
  
  .hero-body {
    margin-top: -4rem;
  }
  
  @media (max-width: 768px) {
    .hero .ex {
      margin: 0 !important;
    }
  }
</style>



