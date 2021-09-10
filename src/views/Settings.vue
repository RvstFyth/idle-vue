<template>
  <div class="settings">
    <h1>Settings</h1>
    <button class="btn btn-danger" v-on:click="reset">Reset</button>
  </div>
</template>

<script>
export default {
  methods: {
    reset: function() {
      this.$store.commit('setCharacter', null);
      this.$router.push('/')
    }
  }
}
</script>
