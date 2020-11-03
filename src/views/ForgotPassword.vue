<template>
  <div id="loginScreen" class="h-screen">
    <form
      @submit.prevent="handleSubmit"
      class="flex
    px-6
     justify-center items-center h-full text-left"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h4 class="m-auto mb-4 font-bold">Password forgotten?</h4>
          </div>
          <div class="modal-body">
            <Message v-if="typeof localError === 'string'" :message="localError" :success="false" />

            <div class="formField">
              <label class="formFieldLabel" for="email">E-mail address</label>
              <div class="relative">
                <Input
                  :value="email"
                  id="email"
                  @input="v => (email = v)"
                />
              </div>
              <div class="formFieldTip formFieldTipError" v-if="errors['email']">{{ errors['email'] }}</div>
            </div>

            <div class="py-4">
              <span class="text-textMedium text-13"
                >The fields marked with an asterisk * are
                Mandatory fields.</span
              >
            </div>
          </div>
          <div class="modal-footer flex items-center justify-between">
            <Button
              @click="backToLogin"
              variant="secondary"
              icon="times"
            >
              Cancel
            </Button>
            <Button
              type="submit"
                :variant="'primary'"
                :isWorking="isWorking"
                :disabled="!isValidDTO"
              >
              Yes, send unlock code
            </Button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Input from '@/components/shared/Input/Input.vue'
import Button from '@/components/shared/Button/Button.vue'
import Message from '@/components/collection/Message.vue'
import { isValidEmail } from '../utils'
import { appStorage } from '../services/storageService'

export default {
  name: 'Password',
  components: {
    Input,
    Button,
    Message
  },
  data() {
    return {
      email: '',
      loading: false,
      localError: '',
      errors: {}
    }
  },
  watch: {
    error: function(msg) {
      this.localError = msg
      this.setHints()
    },
  },
  computed: {
    ...mapGetters('passwordStore', ['error']),
    isValidDTO() {
      return isValidEmail(this.email)
    },
    isWorking() {
      return this.loading
    },
  },
  methods: {
    ...mapActions('passwordStore', ['sendEmail']),
    async handleSubmit() {
      this.loading = true
      const code = await this.sendEmail({
        url: 'passwordreset/email',
        method: 'POST',
        data: {
          email: this.email,
        }
      })
      if (code) {
        appStorage.setItem('email', this.email)
        this.$router.push('/verify')
      }
      this.loading = false
    },
    setHints() {
      if (typeof this.localError === 'object') {
        this.localError.forEach(item => {
          this.errors[item.context.key] = item.message
        })
      }
    },
    backToLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="postcss" scoped>
.formField {
  @apply mt-5;
}
.formFieldLabel {
  @apply block pb-1-25 text-textMedium text-13 font-medium;
}
.formFieldTip {
  @apply pt-1-5 text-textMedium text-13;  
}
.formFieldTipError {
  @apply text-primary
}
</style>
<style scoped lange="sass">
.body {
  margin-top: 70px;
}
.card-header {
  background-color: black;
}
.main-body {
  padding: 0 48px;
  padding-top: 88px;
  background: #f8f6f8;
}
</style>
