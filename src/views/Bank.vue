<template>
  <div class="bank">
    <h1>Bank</h1>

    <table class="table table-hover">
      <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Options</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, name) in this.bank.items" v-bind:key="name">
        <td>{{name}}</td>
        <td>{{value.amount}}</td>
        <td>
          <input type="number" step="1" :value="value.amount"> &nbsp;&nbsp;
          <button class="btn btn-secondary">Sell</button> &nbsp;&nbsp;
          <button class="btn btn-danger">Drop</button>&nbsp;&nbsp;
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bank: this.$store.state.bank
    }
  },
  methods: {
    drop(name) {

    }
  }
}
</script>
