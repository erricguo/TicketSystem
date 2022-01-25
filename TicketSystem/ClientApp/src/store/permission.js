import { asyncRouterMap, constantRouterMap } from '@/router'

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

const permission = {

    mutations: {
        SET_ROUTERS: (state, routers) => {
            //if (sessionStorage.getItem("store")) {
            //    //this.replaceState(Object.assign({}, state, JSON.parse(sessionStorage.getItem("store"))))
            //    //this.$store.dispatch("GenerateRoutes", { roles: this.$store.state.claims.Role });
            //    state = JSON.parse(sessionStorage.getItem("store"))
            //}

            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
            //sessionStorage.setItem("store", JSON.stringify(state))
        }
    },
    actions: {
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
            })
        }
    }
}

export default permission