import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import permission from '@/store/permission'
import { router ,asyncRouterMap, constantRouterMap } from '@/router'
Vue.use(Vuex)

const state = {
    routers: constantRouterMap,
    addRouters: [],
    isAuthenticated: false,
    claims: {},
    token: "",
};
//const state = { mode: 'login', list: [] };
const getters = {};
//const mutations = { setMode: (state, data) => { state.mode = data }, setList: (state, data) => { state.list = data } };


/*
const actions = { // 獲取權限列表 
    getPermission({ commit }) {
        return new Promise((resolve, reject) => {
            axios({
                url: '/privilege/queryPrivilege?id=' + sessionStorage.getItem('privId'),
                methods: 'get',
                headers: {
                    token: sessionStorage.getItem('token'),
                    name: sessionStorage.getItem('name')
                }
            }).then((res) => {
                // 存儲權限列表 
                commit('setList', res.data.cust.privileges[0].children);
                resolve(res.data.cust.privileges[0].children)
            }).catch(() => { reject() })
        })
    }

};*/
const mutations = {
    SET_ROUTERS: (state, routers) => {
        //if (sessionStorage.getItem("store")) {
        //    //this.replaceState(Object.assign({}, state, JSON.parse(sessionStorage.getItem("store"))))
        //    //this.$store.dispatch("GenerateRoutes", { roles: this.$store.state.claims.Role });
        //    state = JSON.parse(sessionStorage.getItem("store"))
        //}
        //routers.forEach((item) => {
        //    router.options.routes.push(item)
        //});
        //router.addRoutes(routers) // 动态添加可访问路由表

        state.addRouters = routers
        state.routers = constantRouterMap.concat(routers)
        //sessionStorage.setItem("store", JSON.stringify(state))
    }
};
const actions = {
    GenerateRoutes({ commit }, data) {
        return new Promise(resolve => {
            const { roles } = data
            let accessedRouters
            if (roles.indexOf('admin') >= 0) {
                accessedRouters = asyncRouterMap
            } else {
                accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            }
            commit('SET_ROUTERS', accessedRouters)
            resolve(accessedRouters)
        }).catch(function (reason) {
            console.log('catch:', reason);
        });
    }
};


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

export default new Vuex.Store({
//export const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        
        app,
        appConfig,
        verticalMenu,
    },
  strict: process.env.DEV,
})
