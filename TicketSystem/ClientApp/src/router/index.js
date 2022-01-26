import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

//手動跳轉的頁面白名單 
const whiteList = [
    '/'
];

//默認不需要權限的頁面 
export const constantRouterMap = [
    {
        path: '/login',
        name: 'login',
        meta: {
            layout: 'full',
        },
        component: (resolve) => require(['@/views/Login.vue'], resolve)
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            pageTitle: '首頁',
            breadcrumb: [
                {
                    text: '首頁',
                    active: true,
                },
            ],
        },
        component: (resolve) => require(['@/views/Home.vue'], resolve)
    },
    {
        path: '/error-404',
        name: 'error-404',
        component: (resolve) => require(['@/views/error/Error404.vue'], resolve),
        meta: {
            layout: 'full',
        },
    },
]
//註冊路由 
export const router = new VueRouter({
    mode: 'history',
    routes: constantRouterMap
});

//異步路由（需要權限的頁面） 
export const asyncRouterMap = [
    {
        path: '/user',
        name: 'user',
        pageTitle: '使用者管理',
        breadcrumb: [
            {
                text: '使用者管理',
                active: true,
            },
        ],
        component: (resolve) => require(['@/views/User.vue'], resolve)
    },
    {
        path: '/role',
        name: 'role',
        meta: {
            pageTitle: '角色管理',
            breadcrumb: [
                {
                    text: '角色管理',
                    active: true,
                },
            ],
        },
        component: (resolve) => require(['@/views/Role.vue'], resolve)
    },
    {
        path: '/menu',
        name: 'menu',
        meta: {
            pageTitle: '選單管理',
            breadcrumb: [
                {
                    text: '選單管理',
                    active: true,
                },
            ],
        },
        component: (resolve) => require(['@/views/Menu.vue'], resolve)
    },
    {
        path: '/ticket',
        name: 'ticket',
        meta: {
            pageTitle: '案件管理',
            breadcrumb: [
                {
                    text: '案件管理',
                    active: true,
                },
            ],
        },
        component: (resolve) => require(['@/views/Ticket.vue'], resolve)
    },
    {
        path: '/roleaction',
        name: 'roleaction',
        meta: {
            pageTitle: '權限管理',
            breadcrumb: [
                {
                    text: '權限管理',
                    active: true,
                },
            ],
        },
        component: (resolve) => require(['@/views/RoleAction.vue'], resolve)
    },
]
    ;


/*const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
      {
          path: '/user',
          name: 'user',
          component: () => import('@/views/User.vue'),
          meta: {
              pageTitle: '使用者管理',
              breadcrumb: [
                  {
                      text: '使用者管理',
                      active: true,
                  },
              ],
          },
      },
      {
          path: '/role',
          name: 'role',
          component: () => import('@/views/Role.vue'),
          meta: {
              pageTitle: '角色管理',
              breadcrumb: [
                  {
                      text: '角色管理',
                      active: true,
                  },
              ],
          },
      },
      {
          path: '/menu',
          name: 'menu',
          component: () => import('@/views/Menu.vue'),
          meta: {
              pageTitle: '選單',
              breadcrumb: [
                  {
                      text: '選單',
                      active: true,
                  },
              ],
          },
      },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
}) */


/** * 根據權限匹配路由 * @param {array} permission 權限列表（菜單列表） * @param {array} asyncRouter 異步路由對象 */
function routerMatch(permission, asyncRouter) {
    return new Promise((resolve) => {
        const routers = [];
        // 創建路由 
        function createRouter(permission) {
            // 根據路徑匹配到的router對象添加到routers中即可 
            permission.forEach((item) => {
                if (item.children && item.children.length) { createRouter(item.children) } let path = item.path;
                // 循環異步路由，將符合權限列表的路由加入到routers中 
                asyncRouter.find((s) => {
                    if (s.path === '') {
                        s.children.find((y) => {
                            if (y.path === path) {
                                y.meta.permission = item.permission; routers.push(s);
                            }
                        })
                    }

                    if (s.path === path) {
                        s.meta.permission = item.permission; routers.push(s);
                    }
                })
            })
        }
        createRouter(permission)
        resolve([routers])
    })
}


router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
        //NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
        if (store.state.claims.Role && !store.state.claims.initRoute) { // 判斷當前用戶是否已拉取完user_info資訊
            store.state.claims.initRoute = true
            const roles = store.state.claims.Role // note: roles must be a array! such as: ['editor','develop']
            store.dispatch('GenerateRoutes', { roles }).then((res) => { // 根據roles許可權生成可訪問的路由表

                try {
                    res.forEach((item) => {
                        if (!router.options.routes.indexOf(item)) {
                            router.options.routes.push(item)
                        }
                    });
                    router.addRoutes(res) // 動態添加可訪問路由表


                    next({ ...to, replace: true }) // hack方法 確保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                } catch (e) {
                    console.log('catch:', e);
                }

            })
        } else {
            next()
            // 沒有動態改變許可權的需求可直接next() 刪除下方許可權判斷 ↓
            /*if (hasPermission(store.getters.roles, to.meta.roles)) {
                next()//
            } else {
                next({ path: '/401', replace: true, query: { noGoBack: true } })
            }*/
            // 可刪 ↑
        }
    }


}),
    // ? For splash screen
    // Remove afterEach hook if you are not using splash screen
    router.afterEach(() => {
        // Remove initial loading
        const appLoading = document.getElementById('loading-bg')
        if (appLoading) {
            appLoading.style.display = 'none'
        }
    })

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router

