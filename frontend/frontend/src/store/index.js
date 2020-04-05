import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null, 
    fullName: localStorage.getItem('fullName') || null, 
    email: localStorage.getItem('email') || null, 
    organization: localStorage.getItem('organization') || null, 
    region: localStorage.getItem('region') || null
  },
  mutations: {
    login(state, data){
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('fullName', data.fullName);
      localStorage.setItem('email', data.email);
      localStorage.setItem('organization', data.organization);
      localStorage.setItem('region', data.region);
      state.token = data.token;
      state.username = data.username;
      state.fullName = data.fullName;
      state.email = data.email;
      state.organization = data.organization;
      state.region = data.region;
    },
    logout(state){
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('fullName');
      localStorage.removeItem('email');
      localStorage.removeItem('organization');
      localStorage.removeItem('region');
      state.token = null;
      state.username = null;
      state.fullName = null;
      state.email = null;
      state.organization = null;
      state.region = null;
    }
  },
  actions: {
  }
})
