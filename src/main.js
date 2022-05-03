import Vue from 'vue';
import App from './App.vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import store from './store/store';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import router from './router';
import VueAlertify from 'vue-alertify';

const system = require('./helpers/system');

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAlertify)

const actions = {
  woodcutting: require('./actions/woodcutting'),
  firemaking: require('./actions/firemaking')
};

// Globally defined vueJS filters
import './helpers/filters';

new Vue({
  router,
  render: h => h(App),
  store,
  data: {
    character: null,
    lastSaveTimestamp: 0,
  },
  mounted() {
    this.loop();
  },
  methods: {
    loop: function() {
      setInterval(() => {
        const character = this.$store.state.character;
        if(character) {
          if(this.lastSaveTimestamp === 0) this.lastSaveTimestamp = system.timestamp();
          const activeAction = this.$store.state.activeAction;
          if(activeAction.skill && activeAction.resource) {
            const actionFile = actions[activeAction.skill];
            if(actionFile) {
              if((activeAction.last + activeAction.interval < system.timestampMs())) {
                console.log(activeAction.last, activeAction.interval, system.timestampMs())
                actionFile.run(store, this.$alertify);
                this.$store.commit('setLastActiveAction');
              }
              else if (activeAction.skill) {
                this.$store.commit('updateProgress');
              }
            }
            else {
              this.$alertify.error(`Invalid active action defined..`);
              this.$store.commit('setActiveAction', {
                skill: null,
                resource: null,
                interval: 0
              });
            }
          }

          if(this.lastSaveTimestamp + this.$store.state.config.saveInterval < system.timestamp()) {
            this.$store.commit('setCharacter', this.$store.state.character);
            localStorage.setItem('bank', JSON.stringify(this.$store.state.bank.items));
            this.$alertify.message(`Character saved!`);
            this.lastSaveTimestamp = system.timestamp()
          }
        }
      }, 150);
    }
  }
}).$mount('#app')
