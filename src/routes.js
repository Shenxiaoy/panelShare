import VueRouter from 'vue-router'
import Vue from 'vue'
import Children4 from './routes/Children4'
import App from './pages/index'

Vue.use(VueRouter)

const routes = [
  {path: '/4', component: Children4},
  {path: '/sxy', component: App},
]

const router = new VueRouter({
  routes: routes
})

export default router