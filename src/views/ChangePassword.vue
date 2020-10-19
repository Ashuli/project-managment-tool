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
            <p class="mb-1 text-gray-900 font-sans">
              Please enter a new password
            </p>
          </div>
          <div class="modal-body">
            <!-- <Message v-if="typeof localError === 'string'" :message="localError" :success="false" /> -->
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
              <!-- <div class="formFieldTip" v-if="errors['c_password']">{{ errors['c_password'] }}</div> -->
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
                Save / to login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import Input from '@/components/shared/Input/Input.vue'
import Button from '@/components/shared/Button/Button.vue'

export default {
  components: {
    Input,
    Button
  },
  data() {
    return {
      form: {
        password: '',
        c_password: '',
      },
      passwordLength: 8,
      email: '',
      timer: 300
    }
  },
  methods: {
    backToLogin() {
      this.$router.push('/login')
    }
  }
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