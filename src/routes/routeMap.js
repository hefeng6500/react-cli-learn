import login from '../pages/login'
import index from '../pages/index'

export default [
  { path: '/', name: 'default', auth: true, component: index },
  { path: '/index', name: 'index', auth: true,  component: index },
  { path: '/login', name: 'login', component: login },
]