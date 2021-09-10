<template>
  <div class="skills">
    <h1>Skills overview</h1>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col-sm-3" v-for="(value, name) in this.skills" v-bind:key="name">
        <div class="card">
          <div class="card-body" style="text-align: left">
            <h5 class="card-title"><img :src="getSkillingIcon(name)"> {{name}}</h5>
            <div class="progress">
              <div class="progress-bar" role="progressbar" :style="{width: `${value.remainderPercentage}%`}" :aria-valuenow="Math.floor(((value.nextLevel - value.remainder) / value.nextLevel) * 100)" aria-valuemin="0" :aria-valuemax="100">{{value.remainderPercentage}}%</div>
            </div>
            <p class="card-text">
              <br>
               Level: {{value.level}}<br>
               TNL: {{value.remainder}}<br>
               Total XP: {{value.xp}}
            </p>
            <button class="btn btn-dark" v-on:click="openSkillingPage(name)"><i class="bi bi-play-fill"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
table thead tr th, table tbody, tr, td {
  text-align: left;
}
</style>

<script>
const valuesHelper = require('../helpers/values');

export default {
  data() {
    return {
      skills: this.$store.state.character.data.skills,
    }
  },
  methods: {
    openSkillingPage: function (page) {
      page = valuesHelper.uppercaseFirst(page);
      const l = this.$router.resolve({name: page});
      if(l.resolved.matched.length) {
        this.$router.push(page);
      }
      else {
        this.$alertify.error(`This skill is not implemented yet`)
      }
    },
    getSkillingIcon: function(skill) {
      return require('../assets/icons/skilling/'+skill+'.png')
    }
  }
}
</script>