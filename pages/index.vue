<template>
  <div>
    <section class="hero is-primary is-fullheight">
      <div class="hero-head container">
        <ai_nav_home/>
      </div>
  
      <div class="hero-body">
        <div class="container has-text-left">
          <div class="entrance">
            <h2 class="featured">
              Featured
            </h2>
            <h1 class="title">
              WebML Benchmark
            </h1>
            <h2 class="subtitle">
              The WebML Benchmark consists of multiple AI tasks performed by separate neural networks on your pc or smartphone.
            </h2>
            <nuxt-link to="benchmark" class="button is-primary">
                  Run Benchmark Now
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  
    <div class="container">
      <div class="notification">
      <!--
        This container is <strong>centered</strong> on desktop.
        <section>
          <b-field>
            <button class="button is-primary is-medium" @click="openLoading">
                    Launch loading
                </button>
          </b-field>
          <b-field>
            <b-switch v-model="isFullPage">Display loader over full page</b-switch>
          </b-field>
          <b-notification :closable="false">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
            <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
          </b-notification>
          <b-field label="Select a date">
            <b-datepicker placeholder="Click to select..." icon="calendar-today">
            </b-datepicker>
          </b-field>
        </section>
        -->
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
    background-image: url("../assets/img/home-hero.jpg");
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    transition: opacity .35s ease-in-out;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
  }

  .hero.is-primary, .button.is-primary {
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
  @media (max-width: 768px) {
    .hero .container {
      margin: 0 !important;
    }
  }
</style>



