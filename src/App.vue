<template>
  <div id="app" class="container">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/skills">Skills</router-link> |
      <router-link to="/bank">Bank</router-link> |
      <router-link to="/shop">Shop</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/settings">Settings</router-link>
    </div>
    <div v-if="activeAction.skill">
    <button class="btn btn-outline-dark btn-sm" v-on:click="stop">Stop</button> Active action: {{activeAction.skill}} ({{activeAction.resource}})
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      activeAction: 'activeAction'
    })
  },
  methods: {
    stop() {
      const activeAction = {
        skill: null,
        resource: null,
        started: 0,
        interval: 10,
        last: 0
      };

      this.$store.commit('setActiveAction', activeAction);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
