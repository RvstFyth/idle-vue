<template>
  <div class="woodcutting">
    <h1>Firemaking ({{skill.level}})</h1>
    <p>Firemaking is an artisan skill that is used to burn logs to create a fire, often to cook raw food on the spot. Training Firemaking also allows players to use light sources when exploring dark environments. Firemaking is the companion skill of Woodcutting in the sense that logs obtained from Woodcutting can also be burned to train Firemaking. As players level up, they gain the ability to burn better logs and use more efficient light sources. </p>
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
        <td>{{Math.max(2, parseInt(value.baseTime - (skill.level / 10)))}}s</td>
        <td><button class="btn btn-primary" v-if="skill.level >= value.level" v-on:click="start(name)">Light</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const fmAction = require('../../actions/firemaking');

export default {
  data() {
    return {
      skill: this.$store.state.character.data.skills.firemaking,
      resources: fmAction.mapping,
    }
  },
  computed: {},
  methods: {
    start(resource) {
      const interval = Math.max(2, parseInt(this.resources[resource].baseTime - (this.skill.level / 10)));
      const activeAction = {
        skill: 'firemaking',
        resource: resource,
        interval: interval
      };
      this.$alertify.success(`Started firemaking, ${interval}s interval`);
      this.$store.commit('setActiveAction', activeAction);
    }
  }
}
</script>
