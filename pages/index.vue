<template>
<div>
<section class="hero is-primary is-fullheight">
  <!-- Hero head: will stick at the top -->
  <div class="hero-head">
    <nav-home/>
  </div>

  <!-- Hero content: will be in the middle -->
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
        <b-datepicker
            placeholder="Click to select..."
            icon="calendar-today">
        </b-datepicker>
    </b-field>
    </section>
  </div>
  <footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
  </div>
</footer>
</div>
</div>
</template>

<script>
import NavHome from "~/components/nav-home.vue";

export default {
  components: {
    NavHome
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


