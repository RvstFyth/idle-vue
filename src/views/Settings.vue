<template>
  <div class="settings">
    <h1>Settings</h1>
    <table class="table table-sm">
      <tbody>
      <tr>
        <td>Saving interval (seconds)</td>
        <td><input type="number" class="form-control form-control-sm" value="10" v-model="saveInterval"> </td>
      </tr>
      </tbody>
    </table>
    <button class="btn btn-danger" v-on:click="reset">Reset character</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: this.$store.state.config
    }
  },
  computed: {
    saveInterval: {
      get () {
        return this.$store.state.config.saveInterval
      },
      set (val) {
        this.$store.commit('updateConfigValue', {key: 'saveInterval', value: parseInt(val)})
      }
    }
  },
  methods: {
    reset: function() {
      this.$store.commit('setCharacter', null);
      this.$store.commit('bank/reset');
      localStorage.removeItem('bank');
      this.$router.push('/')
    }
  }
}
</script>
