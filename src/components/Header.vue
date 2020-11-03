<template>
  <div class="h-full">
    <nav class="flex items-center justify-between p-2 px-6 py-1 fixed w-full z-50 top-0 bg-gray-100 border-b border-gray-200" :style="getStyles">
      <div class="flex w-full">
        <div class="lg:flex-grow flex flex-row items-center">
          <div class="h-10 px-4">
            <img :src="logoPath" class="h-full" />
          </div>
          <router-link
            v-for="(route, index) in filterByType('left')"
            exact-active-class="active"
            tag="li"
            :to="`${route.path}`"
            :key="index"
            class="nav block font-normal py-2 lg:inline-block lg:mt-0 mx-4"
          >
            <Icon class="cursor-pointer" :name="route.icon" v-if="route.icon" />
          </router-link>
          <div v-if="search" class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                class="h-4 w-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <input
              @input="handler($event.target.value)"
              class="w-64 rounded-lg border border-gray-400 pl-10 pr-3 py-2 text-sm text-gray-900 placeholder-gray-600 font-sans"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div class="flex justify-end items-center py-2">
          <router-link
            v-for="(route, index) in filterByType('right')"
            exact-active-class="active"
            tag="li"
            :to="`${route.path}`"
            :key="index"
            :title="route.name"
            class="nav block font-normal py-2 lg:inline-block lg:mt-0 mx-2"
          >
            <Icon
              class="cursor-pointer"
              :size="18"
              :name="route.icon"
              v-if="route.icon"
            />
            <a
              class="hover:no-underline hover:opacity-100"
              v-if="!route.icon"
              >{{ route.name }}</a
            >
          </router-link>
          <span class="pr-2 text-sm">
            {{ getUser ? getUser.first_name + " " + getUser.last_name : "" }}
          </span>
          <Profile :img="checkProfile()" @handleLogout="handleLogout" />
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { routeAccess, BASE_URL_IMAGE_PATH } from '../config'
import DefaultProfile from '../assets/avatar.png'
import Profile from './collection/Profile.vue'
import { buttonVariants, getUserRole } from '@/utils'
import Icon from './shared/Icon/Icon.vue'
import eventBus from '../eventBus'
import Logo from '@/assets/logo.png'

export default {
  name: 'Nav',
  props: ['search'],
  components: {
    Profile,
    // Button,
    Icon,
  },
  data() {
    return {
      isOpen: false,
      height: 0,
      routes: [
        {
          id: 0,
          name: 'Dashboard',
          path: '/p',
          align: 'left',
          roles: ['admin']
        },
      ],
      role: '',
      allNotification: [],
      logoPath: Logo,
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    getStyles() {
      const color = buttonVariants['brand']
      return {
        '--bg-variant': color,
      }
    },
  },
  methods: {
    shoeOrHide() {
      this.height = this.height === 0 ? 'auto' : 0;
    },
    ...mapActions(['logout', 'setUser']),
    async init() {
    },
    handleLogout() {
      this.logout()
    },
    checkProfile() {
      return this.getUser && this.getUser.avatar
        ? `${BASE_URL_IMAGE_PATH}/${this.getUser.avatar}`
        : DefaultProfile
    },
    filterByType(type) {
      return this.routes.filter(route => route.align === type)
    },
    handler(val) {
      eventBus.$emit('value', val)
    }
  },
  created() {
    this.role = getUserRole()
    this.routes = this.routes.filter(route => {
      if (route.roles && route.roles.indexOf(this.getUser.role) !== -1) {
        const metaName = route.path.split('/').slice(-1)[0]
        return routeAccess[this.role].indexOf(metaName) !== -1
      }
    })
    this.init()
  },
}

</script>
<style lang="postcss" scoped>
.brand {
  background: #fff;
  box-shadow: 0 0 6px rgba(0, 0,0, 0.1);
}
.nav.active {
  @apply text-primary;
}

</style>
<style scoped>
.col {
  padding-right: 0;
}
.fa-logout {
  background-color: rgb(138, 206, 88);
  width: 40px;
  height: 100%;
}
span.fas {
  margin: 0;
  border-radius: 0;
  font-size: initial;
}
.u-profile .fas {
  line-height: inherit;
}
.u-profile .avatar {
  height: 40px;
  width: auto;
}
.n-center {
  padding: 8px;
}

</style>
