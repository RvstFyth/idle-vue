module.exports = {

    mapping: {
        log: { name: 'shrimps', level: 1, xp: 25, axe: 1, baseTime: 21}
    },

    run (store, notifier) {
        store.commit('setCharacterSkillXP', {
            skill: 'fishing',
            xp: this.mapping[store.state.activeAction.resource].xp
        });
        store.commit('bank/add', {
            item: store.state.activeAction.resource,
            amount: 1
        });
        notifier.success(`Fishing: +${this.mapping[store.state.activeAction.resource].xp}XP and 1 ${store.state.activeAction.resource}`);
    }
}