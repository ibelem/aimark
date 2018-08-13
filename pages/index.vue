<template>
  <div>
    <section class="hero is-primary is-fullheight">
      <div class="hero-head container">
        <nav-home/>
      </div>
  
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Title
          </h1>
          <h2 class="subtitle">
            Subtitle
          </h2>
        </div>
      </div>
    </section>
  
    <div class="container">
      <div class="notification">
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
      </div>
      <footer-common/>
    </div>
  </div>
</template>

<script>
  import NavHome from "~/components/nav-home.vue";
  import FooterCommon from "~/components/footer-common.vue";
  
  export default {
    components: {
      NavHome, FooterCommon
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
    transition: opacity .35s ease-in-out;
  }
</style>



