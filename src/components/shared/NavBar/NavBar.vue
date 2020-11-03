<template>
  <div>
    <header>
      <div
        class="relative flex px-6 justify-between items-center py-3 bg-gray-100 border-b border-gray-200"
      >
        <div class="flex">
          <div>
            <a href="" class="flex items-center justify-between px-4">
              <img src="@/assets/logo.png" class="h-10" alt="" />
            </a>
          </div>
          <!-- <div class="mr-10">
            <a
              @click="goToBoard"
              class="flex items-center justify-between px-4 py-1 bg-blue-700 text-white rounded hover:bg-blue-600"
            >
              <span>
                <svg
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </span>
              <span
                class="text-sm ml-1 font-semibold font-sans py-1 cursor-pointer"
                >Boards</span
              >
            </a>
          </div> -->
          <div class="relative -ml-2">
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
              @input="$emit('value', $event.target.value)"
              class="w-64 rounded-md border border-gray-400 pl-10 pr-3 py-2 text-sm text-gray-900 placeholder-gray-600 font-sans"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div class="flex items-center">
          <button @click="shoeOrHide" class="w-12 mt-3 px- relative">
            <span
              style="left: 23px; top: -8px"
              class="absolute inline-block bg-red-500 rounded-full text-white w-4 h-4 text-xs left-0 top-0"
              >3</span
            >
            <icon icon="bell" class="text-gray-500 text-lg inline-block w-4" />
          </button>
          <button class="ml-6">
            <img
              class="h-8 w-8 rounded-full object-cover"
              @click="isOpen = !isOpen"
              :src="img"
              alt=""
            />
          </button>
          <div
            v-if="isOpen"
            class="absolute right-0 z-20 mt-32 mr-1 py-2 w-48 bg-gray-200 font-semibold rounded-sm boxshadow text-sm font-sans text-left"
          >
            <a
              class="block px-4 py-2 text-gray-800 hover:bg-white"
              href="#"
              @click.prevent="goto"
              >Profile</a
            >
            <a
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              href="#"
              @click.prevent="logout"
              >Logout</a
            >
          </div>
        </div>
        <div
          :style="{ height: height }"
          style="top: 100%; right: 0; width: 16.65rem"
          class="absolute overflow-hidden flex flex-col w-68 shadow-lg font-sans rounded-l-lg mr-1"
        >
          <p
            class="text-left font-semibold border-b py-3 bg-gray-900 text-white p-4"
          >
            Notifications
          </p>
          <div
            v-for="notification in notifications"
            :key="notification.title"
            @click="changeRoute(notification.type)"
            class="cursor-pointer flex group hover:bg-gray-300 flex-col bg-gray-200 border-b px-4 py-2 text-left"
          >
            <p class="group-hover:text-white text-gray-900 font-medium">
              {{ notification.title }}
            </p>
            <p class="group-hover:text-white text-xs font-medium">
              {{ notification.sub }} <time> {{ notification.date }}</time>
            </p>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      height: 0,
      img: 'img/7.jpg',
      notifications: [
        {
          title: 'New Project Created',
          type: 'Active',
          date: '09-01-2020',
          sub: 'Contract'
        },
        {
          title: 'New Task Add',
          type: 'Paused',
          date: '09-01-2020',
          sub: 'task'
        }
      ]
    }
  },
  methods: {
    goToBoard() {
      this.$router.push('/boards')
    },
    shoeOrHide() {
      this.height = this.height === 0 ? 'auto' : 0;
    },
    changeRoute(type) {
      if (!this.$route.path.includes('/notifications')) {
        this.$router.push('/notifications/' + type);
        this.height = 0;
      }
    },
    profile() {

    },
    goto() {
      // this.$emit('to');
      this.$router.push('/p/settings')
      this.isOpen = false
    },
    logout() {
      this.$router.push('/login')
      // this.$emit('handleLogout');
    },
  }
}
</script>
