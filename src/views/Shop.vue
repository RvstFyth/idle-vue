<template>
  <div class="shop">
    <h1>Shop</h1>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Options</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, name) in shop" v-bind:key="name">
        <td>{{value.name | capitalize}}</td>
        <td>{{value.price}}</td>
        <td>
          <input type="number" step="1" :id="value.name" value="1"> &nbsp;&nbsp;
          <button class="btn btn-secondary" v-on:click="buy(value.name)">Buy</button> &nbsp;&nbsp;
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
      shop: [
        {name: 'tinderbox', price: 250},
        {name: 'small fishing net', price: 500}
      ],
    }
  },
  methods: {
    buy(i) {
      const item = this.shop.filter(e => e.name === i)[0];
      if(item) {
        const amount = parseInt(document.getElementById(item.name).value);
        const price = parseInt(amount) * item.price;
        if (this.$store.state.character.data.gold < price) {
          this.$alertify.error(`You don't have enough gold..`);
        }
        else {
          this.$store.state.character.data.gold -= price;
          this.$store.commit('bank/add', {
            item: item.name, amount: amount
          });
          this.$alertify.succes(`You bough ${amount} x` ${item.name})
        }
      }
    }
  }
}
</script>