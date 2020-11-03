<template>
  <div class="flex w-full mt-24 px-4 flex-col items-center">
      <div class="w-full md:w-6/12 lg:w-6/12 bg-white px-4 py-2">
        <Message v-if="typeof localError === 'string'" :message="localError" :success="false" />
        <Icon v-if="isWorking" class="spinner" :size="24" name="spin" /> <span class="ml-2" v-if="isWorking">Verifying...</span>
        <div v-if="verified" class="text-success">Your email verified successfully. 
            <Button :variant="'secondary'" class="ml-3" @click="gotoLogin">Login</Button></div>
      </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Icon from '@/components/shared/Icon/Icon.vue'
import Button from '@/components/shared/Button/Button.vue'
import Message from '@/components/collection/Message.vue'

export default {
  components: {
    Icon,
    Message,
    Button
  },
  props: ['id'],
  data() {
    return {
      loading: false,
      localError: '',
      verified: false
    }
  },
  watch: {
    error: function(msg) {
      this.localError = msg
    },
  },
  computed: {
    ...mapGetters('passwordStore', ['error']),
    isWorking() {
      return this.loading
    },
  },
  methods: {
    ...mapActions('passwordStore', ['verifyEmail']),
    async init() {
        this.loading = true
      const worked = await this.verifyEmail({
        url: 'users/verify',
        method: 'PUT',
        data: {
          token: this.id,
        },
      })
      if (worked) {
        this.verified = true
      }
      this.loading = false
    },
    gotoLogin() {
        this.$router.push('/login')
    }
  },
  created() {
    this.init()
  },
}
</script>
