import Vue from 'vue';

Vue.filter('capitalize', (str) => {
  if (!str) return '';
  return str.toString().charAt(0).toUpperCase() + str.slice(1);
});
