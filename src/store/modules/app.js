import $hub from '@/util/flowhub'

const app = {
  state: {
    eventHandler: null
  },
  mutations: {
    SET_EVENT_LISTENER_HANDLER: (state, eventHandler) => {
      if (eventHandler) {
        state.eventHandler = eventHandler
      }
    },
  },
  actions: {
    RunEventListener({ commit }) {
      return new Promise((resolve, reject) => {
        const dispatcher = $hub.WS('ws://localhost:8080/ws')
        commit('SET_EVENT_LISTENER_HANDLER', dispatcher)
        resolve(true)
      })
    },
    StopEventListener({ state, commit }) {
      return new Promise((resolve, reject) => {
        state.eventHandler.off()
        resolve(true)
      })
    }
  }
}

export default app