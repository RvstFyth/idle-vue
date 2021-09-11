import Vue from 'vue';
import Vuex from 'vuex';
import Character from '../classes/character';
// import Bank from '../classes/bank';

Vue.use(Vuex);

import Bank from './modules/bank';

const charData = localStorage.getItem('character');
const bankData = localStorage.getItem('bank');

let character;

if(charData) {
    character = new Character();
    character.fromJSON(charData);
} else {
    // Cleanup old mess
    if(bankData) localStorage.removeItem('bank');
}

const store = new Vuex.Store({
    state: {
        character,
        activeAction: {
            skill: null,
            resource: null,
            started: 0,
            interval: 10,
            last: 0
        }

    },
    actions: {  },
    mutations: {
        setCharacter: (state, character) => {
            state.character = character;
            if(character) localStorage.setItem('character', character.toJSON());
            else localStorage.removeItem('character');
        },
        setCharacterSkillXP: (state, payload) => {
            if(state.character && state.character.data.skills[payload.skill]) {
                state.character.data.skills[payload.skill].addXP(payload.xp);
            }
        },
        setBank: (state, bank) => {
            state.bank = bank;
            if(bank) localStorage.setItem('bank', bank.toJSON());
            else localStorage.removeItem('bank');
        },
        setActiveAction: (state, payload) => {
            state.activeAction = {
                skill: payload.skill,
                resource: payload.resource,
                started: Date.now() / 1000 | 0,
                interval: payload.interval,
                last: Date.now() / 1000 | 0
            }
        },
        setLastActiveAction: (state) => {
            state.activeAction.last = Date.now() / 1000 | 0
        },
    },
    modules: {
        bank: Bank
    }
});

if(bankData) {
    const items = JSON.parse(bankData);
    for(let i in items) {
        console.log(i, items[i])
        store.commit('bank/add', {
            item: i,
            amount: items[i].amount
        })
    }
    //store.state.bank.commit('fromJSON', bankData);
}

export default store;