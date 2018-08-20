<template>
  <div class="container">
    <ai_run/>
  </div>
</template>

<script>
// import axios from 'axios'
import axios from 'axios-https-proxy-fix'; 

export default {
  async asyncData({ params }) {
    const proxy = { host: 'child-prc.', port: 913 }
    // We can use async/await ES6 feature
    let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {proxy})
    return { post: data }
  },
  head() {
    return {
      title: this.post.title
    }
  }
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  border: 1px #ddd solid;
  padding: 20px;
  text-align: left;
}
ul li a {
  color: gray;
}
p {
  font-size: 20px;
}
a {
  color: #41B883;
}
</style>