import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import Bank from '../views/Bank'
import Settings from '../views/Settings'
import Shop from '../views/Shop'
import Skills from '../views/Skills'
import Start from '../views/Start'
import Woodcutting from "../views/skills/Woodcutting";

import store from '../store/store';

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Start', component: Start },
  { path: '/home', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/bank', name: 'Bank', component: Bank },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/skills', name: 'Skills', component: Skills },

  { path: '/woodcutting', name: 'Woodcutting', component: Woodcutting },
  // {
  //   path: '/skills',
  //   name: 'Skills',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Skills.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!store.state.character && to.name !== 'Start') next({ name: 'Start' });
  else if(store.state.character && to.name === 'Start') next({ name: 'Home' });
  else next()
})

export default router
