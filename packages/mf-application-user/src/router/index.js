
import { Vue, VueRouter } from 'mf-shared-dependencies-vue'
import UserExample1 from '../views/user-example-1.vue'
import UserExample2 from '../views/user-example-2.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/user/user-example-1',
    name: 'UserExample1',
    component: UserExample1
  },
  {
    path: '/user/user-example-2',
    name: 'UserExample2',
    component: UserExample2
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
