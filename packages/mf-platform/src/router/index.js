import { Vue, VueRouter } from 'mf-shared-dependencies-vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.fullPath === from.fullPath) { return }
//   if (store.getters[LOGIN_STATUS_GETTER] || whiteList.includes(to.path) || whiteList.includes(from.path)) {
//     next()
//   } else {
//     next('/')
//   }
// })

export default router
