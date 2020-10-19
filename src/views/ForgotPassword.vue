<template>
  <div id="loginScreen" class="h-screen">
    <form
      @submit.prevent="handleSubmit"
      class="flex px-6 justify-center items-center h-full"
    >
      <div class="modal-dialog text-left font-sans" role="document">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h4 class="m-auto mb-4 font-bold">Password forgotten?</h4>
          </div>
          <div class="modal-body">
            <div class="formField">
              <label class="formFieldLabel" for="email">E-mail address</label>
              <div class="relative">
                <Input :value="email" id="email" @input="(v) => (email = v)" />
              </div>
              <!-- <div class="formFieldTip formFieldTipError" v-if="errors['email']">{{ errors['email'] }}</div> -->
            </div>

            <div class="py-4">
              <span class="text-textMedium text-13"
                >The fields are Mandatory fields.</span
              >
            </div>
          </div>
          <div class="modal-footer flex items-center justify-between">
            <Button @click="backToLogin" variant="secondary"> Cancel </Button>
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
import Input from '@/components/shared/Input/Input.vue'
import Button from '@/components/shared/Button/Button.vue'

export default {
  name: 'Password',
  components: {
    Input,
    Button
  },
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async handleSubmit() {
      this.$router.push('/verify')
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
  @apply text-primary;
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
