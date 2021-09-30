<template>
  <div class="bank">
    <h1>Bank</h1>
    <b>Gold:</b> {{character.data.gold}}
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Options</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, name) in bankItems" v-bind:key="name">
        <td>{{name | capitalize}}</td>
        <td>{{value.amount}}</td>
        <td>
          <input type="number" step="1" :value="value.amount" :id="name"> &nbsp;&nbsp;
          <button class="btn btn-secondary" v-on:click="sell(name)">Sell</button> &nbsp;&nbsp;
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      character: this.$store.state.character,
    }
  },
  methods: {
    sell(name) {
      const amount = parseInt(document.getElementById(name).value);
      this.character.data.gold += amount;
      this.$store.commit('bank/remove', {
        item: name, amount: amount
      });
      this.$alertify.success(`Sold ${amount} x ${name}`)
    }
  },
  computed: {
    ...mapGetters({
      bankItems: 'bank/items'
    })

  }
}
</script>
