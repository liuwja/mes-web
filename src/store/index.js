import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        user: {
            username: '',
            userDesc: '',
            password: '',
            clientIp: '',
            workCenterNumber: '',
            workCenterDesc: ''
        },
        currentOrder: {}

    },
    mutations: {
        putUser(state, user) {
            if (user) {
                state.user = user;
            }
        },
        removeUser(state) {
            for (let k in state.user) {
                k = '';
            }
        }
    }
});
export default store;