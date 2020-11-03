<template>
  <div class="flex w-full mt-24 px-4 flex-col items-center">
      <div class="w-full md:w-6/12 lg:w-6/12 bg-white px-4 py-2">
          <div
            class="alert py-2 rounded text-success"
            role="alert"
        >{{ text }} <Button :variant="'secondary'" class="ml-3" @click="goBack">Back</Button></div>
      </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Message from '@/components/collection/Message.vue'
import Button from '@/components/shared/Button/Button.vue'

export default {
  components: {
    Message,
    Button
  },
  data() {
      return {
          msg: `User Created`
      }
  },
  computed: {
      text() {
          return this.msg
      }
  },
  methods: {
    goBack() {
        this.$router.push('/p')
    }
  }
}
</script>
