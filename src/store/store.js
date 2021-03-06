import Vue from 'vue';
import Vuex from 'vuex';
import Character from '../classes/character';
import Bank from './modules/bank';
import system from '../helpers/system';
// import Bank from '../classes/bank';

Vue.use(Vuex);

const charData = localStorage.getItem('character');
const bankData = localStorage.getItem('bank');

let character;

if (charData) {
  character = new Character();
  character.fromJSON(charData);
} else if (bankData) {
  // Cleanup old mess
  localStorage.removeItem('bank');
}

const store = new Vuex.Store({
  state: {
    character,
    activeAction: {
      skill: null,
      resource: null,
      started: 0,
      interval: 10,
      last: 0,
      progress: 0,
    },
    config: {
      notifications: {
        save: true,
        skillingResult: true,
      },
      saveInterval: 10,
    },

  },
  getters: {
    activeAction: (state) => state.activeAction,
  },
  actions: { },
  mutations: {
    updateConfigValue: (state, payload) => {
      if (state.config[payload.key]) state.config[payload.key] = payload.value;
      // state.config = {...state.config}
    },
    setCharacter: (state, char) => {
      state.character = char;
      if (char) localStorage.setItem('character', char.toJSON());
      else localStorage.removeItem('character');
    },
    setCharacterSkillXP: (state, payload) => {
      if (state.character && state.character.data.skills[payload.skill]) {
        state.character.data.skills[payload.skill].addXP(payload.xp);
      }
    },
    setActiveAction: (state, payload) => {
      state.activeAction = {
        skill: payload.skill,
        resource: payload.resource,
        started: system.timestampMs(),
        interval: payload.interval * 1000,
        last: system.timestampMs(),
        progress: 0,
      };
    },
    resetActiveAction: (state) => {
      state.activeAction = {
        skill: null,
        resource: null,
        started: 0,
        interval: 10,
        last: 0,
        progress: 0,
      };
    },
    setLastActiveAction: (state) => {
      state.activeAction.last = system.timestampMs();
    },
    updateProgress: (state) => {
      const max = state.activeAction.interval;
      const next = (state.activeAction.last + state.activeAction.interval);
      const current = next - system.timestampMs();
      state.activeAction.progress = Math.floor(100 - ((current / max) * 100));
    },
  },
  modules: {
    bank: Bank,
  },
});

if (bankData) {
  const items = JSON.parse(bankData);
  Object.entries(items).forEach(([key, value]) => {
    store.commit('bank/add', {
      item: key,
      amount: value.amount,
    });
  });
  // store.state.bank.commit('fromJSON', bankData);
}

export default store;
