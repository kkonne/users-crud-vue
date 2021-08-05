import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userSearchResult: [],
    selected: {}
  },

  getters: {
    getUserSearchResult: state => {
      return state.userSearchResult;
    },

    isUserSelected: state => user => {
      return state.selected.id === user.id;
    },

    getSelectedUser: state => {
      return state.selected;
    }
  },

  mutations: {
    updateUserSearchResult(state, userSearchResult) {
      state.userSearchResult = userSearchResult;
    },

    selectUser(state, user){
      state.selected = user;
    },
    
    unselectUser(state){
      state.selected = {};
    },
  },

  actions: {
  },

  modules: {
  }
})
