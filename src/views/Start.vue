<template>
  <div class="hello">
    <h1>Start</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
    </p>
    <form>
      <div class="row g-3 align-items-center">
        <div class="col-auto"><label for="characterName" class="form-label">Character name</label></div>
        <div class="col-auto"><input type="text" id="characterName" class="form-control" v-model="data.newCharacterName"></div>
        <div class="col-auto"><button type="button" class="btn btn-success" v-on:click="createCharacter">Start!</button> </div>
      </div>
    </form>
  </div>
</template>

<script>

import Character from '../classes/character';
//import Bank from '../classes/bank';

export default {
  methods: {
    data() {
      return {
        newCharacterName: ''
      }
    },
    createCharacter: function() {
      if(this.data.newCharacterName) {
        this.$alertify.success(`Character with name ${this.data.newCharacterName} created!`);
        const char = new Character(this.data.newCharacterName);
        this.$store.commit('setCharacter', char);
        this.$router.push('Home')
      }
    }
  }
}
</script>
