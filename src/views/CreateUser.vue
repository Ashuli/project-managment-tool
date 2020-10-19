<template>
  <div class="mt-12 lg:mt-24 md:mt-24">
    <form
      class="flex md:px-6 lg:px-6 justify-center items-center h-full text-left"
      @submit.prevent="handleSubmit"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h4 class="m-auto mb-2 font-bold">Create User</h4>
          </div>
          <div class="modal-body">
            <Message
              v-if="typeof localError === 'string'"
              :message="localError"
              :success="false"
            />
            <div class="flex flex-col">
              <div class="formField">
                <label class="formFieldLabel" for="firstName">First Name</label>
                <div class="relative">
                  <Input
                    :value="form.first_name"
                    id="firstName"
                    @input="setFieldValue('firstName', $event)"
                  />
                </div>
                <div class="formFieldTip" v-if="errors['first_name']">
                  {{ errors["firstName"] }}
                </div>
              </div>

              <div class="formField">
                <label class="formFieldLabel" for="lastName">Last Name</label>
                <div class="relative">
                  <Input
                    :value="form.last_ame"
                    id="lastName"
                    @input="setFieldValue('last_name', $event)"
                  />
                </div>
                <div
                  class="formFieldTip formFieldTipError"
                  v-if="errors['lastName']"
                >
                  {{ errors["lastName"] }}
                </div>
              </div>

              <div class="formField">
                <label class="formFieldLabel" for="email"
                  >Email Address</label
                >
                <div class="relative">
                  <Input
                    :value="form.email"
                    id="email"
                    @input="setFieldValue('email', $event)"
                    @blur="handleCheckEmail"
                  />
                </div>
                <div
                  class="formFieldTip formFieldTipError"
                  v-if="errors['email']"
                >
                  {{ errors["email"] }}
                </div>
              </div>

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
                <div class="formFieldTip">
                  Password must contain lowercase &amp; uppercase alphabets,
                  numbers, special characters &amp; length greater than
                  {{ passwordLength - 1 }}.
                </div>
              </div>

              <div
                class="modal-footer w-full mt-6 flex items-center justify-between px-1"
              >
                <Button @click="backToLogin" variant="secondary" icon="times">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  class="ml-3"
                  :variant="'primary'"
                  :isWorking="isWorking"
                  :disabled="!isValidDTO"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Button from '@/components/shared/Button/Button.vue'
import Input from '@/components/shared/Input/Input.vue'
import Message from '@/components/collection/Message.vue'
export default {
  name: 'User',
  components: {
    Button,
    Input,
    Message
  },
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      message: '',
      loading: false,
      localError: '',
      errors: {},
      emailExisted: false,
      passwordLength: 8
    }
  },
  methods: {
    async handleSubmit() {
      await this.$store.dispatch('createUser', {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        password: this.form.password,
      });
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