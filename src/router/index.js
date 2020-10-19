import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Boards from '../views/Boards.vue'
import Task from '../views/Task.vue'
import Password from '../views/ForgotPassword.vue'
import ChangePassword from '../views/ChangePassword.vue'
import Verify from '../views/Verify.vue'
import Settings from '../views/Settings.vue'
import Unauthorized from '@/views/Unauthorized.vue'
import Dashboard from '@/views/Dashboard.vue'
import User from '@/views/CreateUser.vue'
import Profile from '@/components/forms/ProfileEdit.vue'

Vue.use(VueRouter)

// const routes = [
//   { 
//     path: '/',
//     name: 'Home',
//     component: Login
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   },
//   {
//     // path: '/about',
//     // name: 'About',
//     // // route level code-splitting
//     // // this generates a separate chunk (about.[hash].js) for this route
//     // // which is lazy-loaded when the route is visited.
//     // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/verify',
      name: 'Verify',
      component: Verify
    },
    {
      path: '/forgot-password',
      name: 'Password',
      component: Password
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/create-user',
      name: 'User',
      component: User
    },
    {
      path: '/boards',
      name: 'Boards',
      component: Boards
    },
    {
      path: '/task/:title',
      name: 'Task',
      component: Task
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

export default router
