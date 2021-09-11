const mapping = {
    log: { name: 'log', level: 1, xp: 25, axe: 1},
    oak: { name: 'oak log', level: 15, xp: 37.5, axe: 1},
    willow: { name: 'willow log', level: 30, xp: 67.5, axe: 1},
    maple: { name: 'maple log', level: 45, xp: 100, axe: 1},
    yew: { name: 'yew log', level: 60, xp: 175, axe: 1},
};

module.exports = {

    run (store, notifier) {
        store.commit('setCharacterSkillXP', {
          skill: 'woodcutting',
          xp: mapping[store.state.activeAction.resource].xp
        });
        store.commit('bank/add', {
            item: 'log',
            amount: 1
        });
        notifier.success(`Woodcutting: +${mapping[store.state.activeAction.resource].xp}XP and 1 ${store.state.activeAction.resource}`);
    }
}