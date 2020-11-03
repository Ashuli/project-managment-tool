<template>
  <div class="relative flex text-sm -mr-5">
    <div class="flex items-center">
      <button
        @click="isOpen = !isOpen"
        class="relative z-0 block w-8 rounded-full overflow-hidden focus:outline-none focus:border-white bg-white"
        :style="getStyles"
      >
      
        <img class="h-full w-full object-cover" :src="img" alt="Profile image" />
      </button>
      <Icon
          :size="12"
          name="chevron-down"
          class="ml-1"
      />
    </div>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      style="background: rgba(27, 31, 60, 0.0);"
      class="fixed inset-0 h-full z-10 w-full cursor-default outline-none focus:outline-none"></button>
    <div
      v-if="isOpen"
      class="absolute right-0 z-20 mt-12 py-2 w-48 bg-white rounded-sm boxshadow text-left font-sans">
      <a
        class="block px-4 py-2 text-gray-800
       hover:bg-secondary rounded-lg cursor-pointer" 
        @click.prevent="goto"
        >View profile</a>
      <a
        class="block px-4 py-2 text-gray-800
        hover:bg-secondary rounded-lg cursor-pointer"
        @click.prevent="logout"
        >Log off</a>
    </div>
  </div>
</template>

<script>
import { buttonVariants } from '@/utils'
import Icon from '@/components/shared/Icon/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    img: String,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    const handleEscape = e => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false;
      }
    };
    document.addEventListener('keydown', handleEscape);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape);
    });
  },
  computed: {
    getStyles() {
      const color = buttonVariants['secondary']
      return {
        '--bg-variant': color,
        '--primary': buttonVariants.primary,
      }
    },
  },
  methods: {
    goto() {
      this.$router.push('/p/settings')
      this.isOpen = false
    },
    logout() {
      this.$emit('handleLogout');
    },
  },
};
</script>
<style lang="postcss" scoped>
.primary {
  background: var(--primary);
}
.circle {
  border-color: var(--primary);
}
.boxshadow {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>