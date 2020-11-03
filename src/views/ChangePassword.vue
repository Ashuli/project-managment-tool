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
            <h4 class="m-auto mb-2 font-bold">New password</h4>
            <p class="mb-1 text-gray-500">
              Please enter a new password
            </p>
          </div>
          <div class="modal-body">
            <Message v-if="typeof localError === 'string'" :message="localError" :success="false" />
            <p class="text-primary" v-if="email">{{ timer || 'Timeout, please request new code again.' }}</p>
            <div class="formField">
              <label class="formFieldLabel" for="password">Password</label>
              <div class="relative">
                <Input
                  :value="form.password"
                  id="password"
                  type="password"
                  @input="setFieldValue('password', $event)"
                />
              </div>
              <div class="formFieldTip">Password must contain lowercase &amp; uppercase alphabets, numbers, special characters &amp; length greater than {{ passwordLength - 1 }}.</div>
            </div>

            <div class="formField ">
              <label class="formFieldLabel" for="c_password">Repeat password</label>
              <div class="relative">
                <Input
                  :value="form.c_password"
                  id="c_password"
                  type="password"
                  @input="setFieldValue('c_password', $event)"
                />
              </div>
              <div class="formFieldTip" v-if="errors['c_password']">{{ errors['c_password'] }}</div>
            </div>

            <div class="modal-footer w-full mt-6 flex items-center px-1 justify-between">
                <Button
                  @click="backToLogin"
                  :icon="'times'"
                  variant="secondary">
                  Cancel
                </Button>
              <Button
                  type="submit"
                  :variant="'primary'"
                  :isWorking="isWorking"
                  :disabled="!isValidDTO">
                Save / login
              </Button>
            </div>
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
import { strongPassword } from '../utils'
import { appStorage } from '../services/storageService'

export default {
  components: {
    Input,
    Button,
    Message
  },
  data() {
    return {
      form: {
        password: '',
        c_password: '',
      },
      loading: false,
      localError: '',
      passwordLength: 8,
      errors: {},
      email: '',
      timer: 300
    }
  },
  watch: {
    error: function(msg) {
      this.localError = msg
    },
  },
  computed: {
    ...mapGetters('passwordStore', ['error']),
    isValidDTO() {
      return strongPassword(this.form.password) &&
      this.samePassword() 
    },
    isWorking() {
      return this.loading
    },
  },
  methods: {
    ...mapActions('passwordStore', ['sendEmail']),
    setFieldValue(type, value) {
      this.form[type] = value
    },
    async handleSubmit() {
      this.loading = true

      const data = {
        new_password: this.form.password,
        email: this.email,
      }
      const success = await this.sendEmail({
        url: 'passwordreset',
        method: 'POST',
        data: data
      })
      if (success) {
        appStorage.removeItem('email')
        this.backToLogin()
      }
      this.loading = false
    },
    backToLogin() {
      this.$router.push('/login')
    },
    samePassword() {
      return this.form.password === this.form.c_password
    },
  },
  created() {
    if (appStorage.getItem('email')) {
      this.email = appStorage.getItem('email')
      setInterval(() => {
        if (this.timer < 1) {
          return;
        }
        this.timer = this.timer - 1
      }, 1000)
    }
  },
}
</script>
<style lang="postcss" scoped>
.formField {
  @apply mt-5;
}
.sep {
  @apply mt-5 border border-backgroundLightest;
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