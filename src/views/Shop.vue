<template>
  <div class="shop">
    <h1>Shop</h1>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Name</th>
        <th>Options</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, name) in shop" v-bind:key="name">
        <td>{{value.name | capitalize}}</td>
        <td>
          <input type="number" step="1" :id="name" value="1"> &nbsp;&nbsp;
          <button class="btn btn-secondary">Buy</button> &nbsp;&nbsp;
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
    buy(index) {
      const item = this.shop[index];
      if(item) {
        // TODO
      }
    }
  }
}
</script>