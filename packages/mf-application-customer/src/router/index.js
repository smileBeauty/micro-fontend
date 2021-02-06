
import { Vue, VueRouter } from 'mf-shared-dependencies-vue'
import CustomerExample1 from '../views/customer-example-1.vue'
import CustomerExample2 from '../views/customer-example-2.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/customer/customer-example-1',
    name: 'CustomerExample1',
    component: CustomerExample1
  },
  {
    path: '/customer/customer-example-2',
    name: 'CustomerExample2',
    component: CustomerExample2
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
