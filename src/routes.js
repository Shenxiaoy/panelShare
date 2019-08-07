import VueRouter from 'vue-router'
import Vue from 'vue'
import Children4 from './routes/Children4'
import App from './pages/index'
import NotePanel from './pages/notePanel'

Vue.use(VueRouter)

const routes = [
  {path: '/4', component: Children4},
  {path: '/', component: App},
  {path: '/1', component: NotePanel},
]

const router = new VueRouter({
  routes: routes
})

export default router