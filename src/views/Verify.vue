<template>
  <div id="loginScreen" class="h-screen">
    <form
      @submit.prevent="handleSubmit"
      class="flex px-6 justify-center items-center h-full text-left"
      ref="form"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h4 class="m-auto mb-2 font-bold">Enter activation code</h4>
          </div>
          <div class="modal-body">
            <Message
              v-if="typeof localError === 'string'"
              :message="localError"
              :success="false"
            />
            <p class="mb-1 text-13 text-textMedium">
              You have just sent an activation code to your saved e-mail
              address. After you enter the correct code you can enter your
              password in the next step reset. Your unlock code
            </p>
            <p class="text-primary" v-if="email">
              {{ timer || "Timeout, please request new code again." }}
            </p>
            <div class="formField">
              <label class="formFieldLabel" for="code1">Your unlock code</label>
              <div class="inputContainer flex justify-between h-8">
                <input
                  class="input mr-1"
                  type="text"
                  size="1"
                  placeholder
                  autofocus
                  v-model="form.code1"
                  id="code1"
                />
                <input
                  class="input mr-1"
                  type="text"
                  id="code2"
                  size="1"
                  v-model="form.code2"
                  placeholder
                  maxlength="1"
                />

                <input
                  class="input mr-1"
                  type="text"
                  id="code3"
                  v-model="form.code3"
                  size="1"
                  placeholder
                  maxlength="1"
                />

                <input
                  class="input mr-1"
                  type="text"
                  id="code4"
                  v-model="form.code4"
                  size="1"
                  placeholder
                  maxlength="1"
                />
                <input
                  class="input mr-1"
                  type="text"
                  id="code5"
                  v-model="form.code5"
                  size="1"
                  placeholder
                  maxlength="1"
                />
                <input
                  class="input mr-1"
                  type="text"
                  id="code5"
                  v-model="form.code6"
                  size="1"
                  placeholder
                  maxlength="1"
                />
              </div>
            </div>
            <div class="py-2">
              <span class="text-textMedium text-13"
                >The fields marked with an asterisk * are Mandatory
                fields.</span
              >
            </div>
            <div
              class="modal-footer w-full mt-6 flex items-center px-1 justify-between"
            >
              <Button
                @click="backToPrev"
                class="text-center w-24"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                :variant="'primary'"
                :disabled="$v.form.$invalid"
              >
                Transfer activation code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Button from '@/components/shared/Button/Button.vue'
import Message from '@/components/collection/Message.vue'

export default {
  components: {
    Button,
    Message
  },
  data() {
    return {
      form: {
        code1: '', 
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
      },
      email: '',
      timer: 300
    }
  },
  methods: {
    async handleSubmit() {
      this.$router.push('/change-password')
    },
    backToPrev() {
      this.$router.push('/forgot-password')
    }
  },
  validations: {
    form: {
      code1: {
        required
      },
      code2: {
        required
      },
      code3: {
        required
      },
      code4: {
        required,
      },
      code5: {
        required
      },
      code6: {
        required
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.inputContainer {
  position: relative;
  height: 32px;
  width: 100%;
}
.input {
  height: 100%;
  width: 100%;
  padding: 0 7px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background: #f4f5f7;
  color: #172b4d;
  transition: background 0.1s;
  font-size: 15px;
  text-align: center;
  &:hover {
    background: #ebecf0;
  }
  &:focus {
    background: #fff;
    border: 1px solid #1b1f3c;
    box-shadow: 0 0 0 1px #1b1f3c;
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
  }
}
.inputContainer {
  &.flat {
    height: 40px;
    .input {
      border: none;
      border-bottom: 2px solid #1b1f3c;
      font-size: 21px;
      background: #fff;

      &::placeholder {
        font-size: 21px;
      }
      &:focus,
      &:hover {
        border: none;
        border-bottom: 2px solid #1b1f3c;
        box-shadow: none;
        background: #fff;
      }
    }
  }
}
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
<style scoped>
.main-body {
  padding: 0 48px;
  padding-top: 88px;
  background: #f8f6f8;
}
</style>
