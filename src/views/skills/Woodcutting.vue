<template>
  <div class="woodcutting">
    <h1>Woodcutting ({{skill.level}})</h1>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
    <h5 style="text-align: left">Axe: {{axesMapping[axe]}}</h5>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Resource</th>
        <th>Level</th>
        <th>XP</th>
        <th>Options</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, name) in this.resources" v-bind:key="name">
        <td>{{name}}</td>
        <td>{{value.level}}</td>
        <td>{{value.xp}}</td>
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
        log: { name: 'log', level: 1, xp: 25, axe: 1},
        oak: { name: 'oak log', level: 15, xp: 37.5, axe: 1},
        willow: { name: 'willow log', level: 30, xp: 67.5, axe: 1},
        maple: { name: 'maple log', level: 45, xp: 100, axe: 1},
        yew: { name: 'yes log', level: 60, xp: 175, axe: 1},
      },
      axesMapping: ['none', 'bronze', 'iron', 'steel', 'mithril', 'adamant', 'rune']
    }
  },
  methods: {
    start(resource) {
      const activeAction = {
        skill: 'woodcutting',
        resource: resource,
        interval: 10
      };

      this.$store.commit('setActiveAction', activeAction);
    }
  }
}
</script>
