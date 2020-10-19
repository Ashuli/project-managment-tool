<template>
  <div class="flex h-screen bg-gray-100">
    <div
      class="max-w-sm p-8 m-auto bg-white rounded shadow-lg md:w-full text-left"
    >
      <form @submit.prevent="handleSubmit">
        <div class="modal-header pb-3 mb-2 flex">
          <div class="m-auto">
            <img :src="logoPath" />
          </div>
        </div>
        <div class="block">
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-800"
            for="email"
            >Email</label
          >
          <Input
            aria-label="email"
            placeholder="Email"
            :value="form.email"
            @input="(v) => (form.email = v)"
            class="w-full mb-4 text-xs text-gray-800 bg-gray-200 border rounded focus:bg-white"
          />
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-800"
            for="password"
            >Password</label
          >
          <Input
            class="w-full mb-4 text-xs text-gray-800 bg-gray-200 border rounded focus:bg-white"
            aria-label="passwort"
            type="password"
            :value="form.password"
            @input="(v) => (form.password = v)"
          />
        </div>
        <div class="mt-8">
          <button
            class="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-blue-800 rounded hover:bg-blue-700"
            type="submit"
            :disabled="$v.form.$invalid"
          >
            Sign In
          </button>
        </div>
      </form>
      <footer>
        <button
          class="float-right text-sm text-blue-800 hover:text-blue-700"
          @click="gotoForgotPassword"
          >Forgot Password?</button
        >
      </footer>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
// import Message from '@/components/collection/Message.vue'
import Input from '@/components/shared/Input/Input.vue'
import Logo from '@/assets/logo.png'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

export default {
  name: 'login', 
  components: {
    Input,
    // Message
  },
  data() {
    return {
      form: {
       email: '',
       password: ''
      },
      logoPath: Logo,
      loading: false,
      // localError: '',
      errors: {}
    }
  },
  watch: {
    error: function(msg) {
      this.localError = msg
      this.setHints()
    }
  },
  methods: {
    async handleSubmit() {
      await this.$store.dispatch('retrieveToken', {
        email: this.form.email,
        password: this.form.password
      });
      if(!localStorage.getItem('access_token')){
        this.$store.state.errorMsg = 'Incorrect Email/Password';
      }else{
        this.$router.push('/boards');
      } 
  },
      gotoForgotPassword() {
        this.$router.push('/forgot-password')
    }
},
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  }
}
</script>
<style scoped>
 .error{
   @apply text-xs text-left text-red-500 -mt-4 mb-4;
 }
 .errmsg{
   @apply text-xs text-red-500 mb-4;
 }
</style>
