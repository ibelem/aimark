<template>
  <div>
    <section class="hero is-primary is-fullheight">
      <div class="hero-head container ex">
        <ai_nav_home/>
      </div>
      <div class="hero-body container">
        <div class="columns fw">
          <div class="ic column is-half">
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
          <div class="content column is-half ic">
            <canvas class="ic" id="mlcanvas"></canvas>
            <div class="content__inner">
              <h3 class="content__title">Artificial Intelligence</h3>
            </div>
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
    head: {
      script: [{
          src: '../js/index/three.min.js',
          defer: true
        },
        {
          src: '../js/index/perlin.js',
          defer: true
        },
        {
          src: '../js/index/TweenMax.min.js',
          defer: true
        },
        {
          src: '../js/index/mlanimation.js',
          defer: true
        }
      ]
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
    color: rgba(255, 255, 255, 0.8);
  }
  
  .button.is-primary:hover {
    background-color: rgba(222, 12, 101, 1.0);
    color: rgba(255, 255, 255, 1.0);
  }
  
  .fw {
    width: 100%; 
  }
  
  .featured {
    font-size: 1.0rem;
    display: inline-block;
    font-variant-caps: all-petite-caps;
    border-bottom: rgba(222, 12, 101, 0.8) 2px solid;
    margin-bottom: 1rem;
  }
  
  
  .button.is-non-primary {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.8);
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


  #mlcanvas {
    width: 240px;
    height: 240px;
    margin-top: -20px;
  }
  
  @media (max-width: 768px) {
    .hero .ex {
      margin: 0 !important;
    }

    #mlcanvas {
      width: 50vw !important;
      height: 50vw !important;
      margin-top: 0px;
    }

  }

  .content__inner {
    grid-area: 1 / 1 / 1 / 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin-top: -120px;
  }

  .content__title {
    font-size: 1.0em;
    color: rgba(255, 255, 255, 0.75);
    padding: 0.45em 0.5em;
    line-height: 1;
    margin: 0;
    letter-spacing: 0.5em;
    text-indent: 0.5em;
    text-transform: uppercase;
    background-color: rgba(222, 12, 101, 0.6);
    font-weight: 400;
  }

  .content__title:hover {
    color: rgba(255, 255, 255, 1.0);
    background-color: rgba(222, 12, 101, 0.9);
  }

  @media screen and (max-width: 55em) {
    .content__title {
      font-size: 0.85em;
    }
  }

</style>



