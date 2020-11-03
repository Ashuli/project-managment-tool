<template>
  <div id="loginScreen" class="mt-24">
    <form
      @submit.prevent="handleSubmit"
      class="flex
    px-6
     justify-center items-center h-full text-left"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content p-4">
          <div class="modal-header pb-3 mb-2 flex">
            <div class="m-auto">
              <img :src="logoPath" />
            </div>
          </div>
          <div class="modal-body">
            <div class="block">
              <Message v-if="typeof localError === 'string'" :message="localError" :success="false" />
            </div>

            <div class="formField">
              <label class="formFieldLabel" for="email">E-mail address</label>
              <Input
                aria-label="email"
                :value="form.email"
                @input="v => (form.email = v)"
              />
            </div>
            <div class="formField">
              <label for="passwort" class="formFieldLabel">Password</label>
                <Input
                  aria-label="passwort"
                  type="password"
                  :value="form.password"
                  @input="v => (form.password = v)"
                />
            </div>
            <div class="form-group">
              <a
                title
                class="inline-block cursor-pointer
                    align-baseline font-bold
                    text-sm text-teal-500 hover:text-teal-800"
                @click.prevent="gotoForgotPassword"
              >
                Password forgotten?
              </a>
            </div>
            <div class="py-2 mt-2">
              <!-- <span class="text-textMedium text-13"
                >The fields marked with an asterisk * are
                Mandatory fields.</span
              > -->
            </div>
          </div>
          <div class="modal-footer">
            <div class="text-center">
              <Button
                class="w-full"
                type="submit"
                :variant="'primary'"
                :isWorking="isWorking"
                :disabled="$v.form.$invalid"
              >
                Login
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
import { required, email } from 'vuelidate/lib/validators'
import Message from '@/components/collection/Message.vue'
import Input from '@/components/shared/Input/Input.vue'
import Button from '@/components/shared/Button/Button.vue'
import Logo from '@/assets/logo.png'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

export default {
  name: 'Login',
  components: {
    Message,
    Input,
    Button,
  },
  data() {
    return {
      form: {
        password: '',
        email: '',
      },
      loading: false,
      logoPath: Logo,
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
    ...mapGetters(['error']),
    isWorking() {
      return this.loading
    },
  },
  methods: {
    ...mapActions(['login']),
    setHints() {
      if (typeof this.localError === 'object') {
        this.localError.forEach(item => {
          this.errors[item.context.key] = item.message
        })
      }
    },
    async handleSubmit() {
      this.loading = true
      this.$v.form.$touch()
      if (this.$v.form.$pending || this.$v.form.$error) return
      const success = await this.login({
        email: this.form.email,
        password: this.form.password,
      })
      if (success) {
        this.$router.push('/p')
      }
      this.loading = false
    },
    gotoForgotPassword() {
      this.$router.push('/forgot-password')
    }
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
}
</script>
<style lang="postcss" scoped>
.form-group {
  @apply mt-5;
}
</style>
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
