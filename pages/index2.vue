<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
       Web AI Benchmark
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
    <br>
 
      <h2>Users</h2>
      <ul class="users">
        <li v-for="user in users" :key="user.id">
          <nuxt-link :to="'/users/'+user.id">{{ user.name }}</nuxt-link>
        </li>
      </ul>
      <p>Hello {{ name }}!</p>
      <div class="links">
        <button @click="increment" class="button--grey">{{ counter }}</button><br><br>
        <nuxt-link to="index_post"
          class="button--grey">Post-Example</nuxt-link>
        <nuxt-link to="about"
          class="button--grey">About</nuxt-link>
          <p>Timestamp: {{ date }}</p>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from 'axios';
import axios from 'axios-https-proxy-fix'; 
import AppLogo from "~/components/AppLogo.vue";
import { mapState } from "vuex";

export default {
  components: {
    AppLogo
  },
  // transition: {
  //   name: "test",
  //   mode: "out-in"
  // },
  serverCacheKey() {
    // Will change every 10 secondes
    return Math.floor(Date.now() / 10000);
  },
  data() {
    return { date: Date.now() };
  },
  fetch({ store }) {
    store.commit("increment");
  },
  computed: mapState(["counter"]),
  methods: {
    increment() {
      this.$store.commit("increment");
    }
  },
  async asyncData() {
    const proxy = { host: 'child-prc', port: 913 }
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users', {proxy})
    return { users: data, name: "belem" }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 200;
  font-size: 60px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 200;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

