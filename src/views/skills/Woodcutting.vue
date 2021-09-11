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
export default {
  data() {
    return {
      skill: this.$store.state.character.data.skills.woodcutting,
      axe: this.$store.state.character.data.gear.axe,
      resources: {
        log: { name: 'log', level: 1, xp: 25, axe: 1, baseTime: 21},
        oak: { name: 'oak log', level: 15, xp: 37.5, axe: 1, baseTime: 22},
        willow: { name: 'willow log', level: 30, xp: 67.5, axe: 1, baseTime: 23},
        maple: { name: 'maple log', level: 45, xp: 100, axe: 1, baseTime: 24},
        yew: { name: 'yes log', level: 60, xp: 175, axe: 1, baseTime: 25},
      },
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
