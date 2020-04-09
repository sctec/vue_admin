import Vue from 'vue'
import Vuex from 'vuex'

const path = require('path');

Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);
let modules = {};
files.keys().forEach(key => {
    let name = path.basename(key, '.js');
    modules[name] = files(key).default || files(key)
});
//改变state中的数据会触发getters方法
const getters = {
    //改变token触发token()方法
    token: (state) => {
        return state.user.token
    },
    userName: state => state.user.userName,
    roles: state => state.user.roles,
    introduce: state => state.user.introduce,
    routes: state => state.permission.routes,
    addRoutes: state => state.permission.addRoutes,
    opened: state => {
        if (state.app.opened === 'false') {
            return false
        } else if (state.app.opened === 'true') {
            return true
        }
    },
    msgIsShow: state => state.app.msgIsShow,
    showDriver: state => state.app.showDriver
};
const store = new Vuex.Store({
    modules,
    getters
});
export default store
