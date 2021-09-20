<template>
  <div class="woodcutting">
    <h1>Woodcutting ({{skill.level}})</h1>
    <p>Woodcutting is a gathering skill that primarily involves chopping trees to obtain logs used in the Fletching, Firemaking, and Construction skills. Players with a higher Woodcutting level can chop down new types of trees and cut down trees quicker, especially as higher levels of axes become available</p>
    <h5 style="text-align: left">Axe: {{axesMapping[axe]}}</h5>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Resource</th>
        <th>Level</th>
        <th>XP</th>
        <th><i class="bi bi-clock"></i></th>
        <th>Options</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, name) in this.resources" v-bind:key="name">
        <td>{{name}}</td>
        <td>{{value.level}}</td>
        <td>{{value.xp}}</td>
        <td>{{Math.max(2, parseInt(value.baseTime - axe - (skill.level / 10)))}}s</td>
        <td><button class="btn btn-primary" v-if="skill.level >= value.level" v-on:click="start(name)">Chop</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const wcAction = require('../../actions/woodcutting');

export default {
  data() {
    return {
      skill: this.$store.state.character.data.skills.woodcutting,
      axe: this.$store.state.character.data.gear.axe,
      resources: wcAction.mapping,
      axesMapping: ['none', 'bronze', 'iron', 'steel', 'mithril', 'adamant', 'rune']
    }
  },
  computed: {},
  methods: {
    start(resource) {
      const interval = Math.max(2, parseInt(this.resources[resource].baseTime - this.axe - (this.skill.level / 10)));
      const activeAction = {
        skill: 'woodcutting',
        resource: resource,
        interval: interval
      };
      this.$alertify.success(`Started woodcutting, ${interval}s interval`);
      this.$store.commit('setActiveAction', activeAction);
    }
  }
}
</script>
