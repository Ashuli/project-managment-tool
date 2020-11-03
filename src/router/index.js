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
import Users from '@/views/User.vue'
import Status from '@/views/Status.vue'
import VerifyEmail from '@/views/VerifyEmail.vue'
import TaskCategory from '@/views/TaskCategory.vue'
import ProjectCategory from '@/views/ProjectCategory.vue'
import Roles from '@/views/Roles.vue'
import DocumentType from '@/views/DocumentType.vue'
import Entry from '@/views/Entry.vue'
import Message from '@/components/collection/Message.vue'

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
  mode: 'hash',
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
      path: '/verify-email', // temporary
      name: 'VerifyEmail',
      component: VerifyEmail
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
    // {
    //   path: '/add-project',
    //   name: 'AddProject',
    //   component: AddProject
    // },
    {
      path: '/p',
      component: Entry,
      children: [
        {
          path: '',
          component: Boards,
        }, 
        {
          path: '/task/:title',
          component: Task
        },
        {
          path: 'settings',
          component: Settings
        },
        {
          path: 'status',
          component: Status
        },
        {
          path: 'task-category',
          component: TaskCategory
        },
        {
          path: 'project-category',
          component: ProjectCategory
        },
        {
          path: 'roles',
          component: Roles
        },
        {
          path: 'document-type',
          component: DocumentType
        },
        {
          path: 'users',
          component: Users
        },
        // {
        //   path: 'profile',
        //   component: Profile
        // },
        {
          path: 'message',
          component: Message
        }
      ]
    },
  ]
})

export default router
