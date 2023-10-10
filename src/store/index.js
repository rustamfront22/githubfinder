import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    getUserInfo: null,
    getRepos: null,
    requestStatus: true
  },
  mutations: {
    getUser(state, payload){
      state.getUserInfo = payload
    },
    getRepos(state, payload){
      state.getRepos = payload
    },
    statusCheck(state, payload){
      state.requestStatus = payload
    },
  },
  actions: {
    async getUser({commit}, user){
      try {
        let res1 = await axios.get(`https://api.github.com/users/${user}`)
        let res2 = await axios.get(`https://api.github.com/users/${user}/repos`)
        let status = true
        commit('getUser', res1.data)
        commit('getRepos', res2.data)
        commit('statusCheck', status)
      } catch (error) {
        if (error.response.status == '404') {
          let status = false
          commit('statusCheck', status)
        }
      }
    }
  },
})
