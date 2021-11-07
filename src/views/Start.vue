<template>
  <div class="hello">
    <h1>Troxa idle</h1>
    <p>
      Start your adventure by creating a character!
    </p>
    <form>
<!--      <div class="row g-3 align-items-center">-->
        <div class="col-auto"><input type="text" id="characterName" class="form-control" v-model="data.newCharacterName" placeholder="character name"></div><br>
        <div class="col-auto"><button type="button" class="btn btn-success" v-on:click="createCharacter">Start!</button> </div>
<!--      </div>-->
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
