<template>
  <div class="w-full h-full py-5 px-8 text-left">
    <div class="flex items-center text-textDarkest">
      <div class="text-xl">Users</div>
      <div class="flex-auto"></div>
      <Button
        @click="$emit('close')"
        icon="times"
        :iconSize="24"
        variant="empty"
      />
    </div>
    <form novalidate autocomplete="off" @submit.prevent="handleSubmit">
      <Message
        v-if="typeof localError === 'string'"
        :message="localError"
        :success="false"
      />
      <div class="formField" v-if="!editMode">
        <label class="formFieldLabel" for="first_name">First Name</label>
        <div class="relative">
          <Input
            :value="first_name"
            id="first_name"
            @input="setFieldValue('first_name', $event)"
          />
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['first_name']">
          {{ errors["first_name"] }}
        </div>
      </div>
      <div class="formField" v-if="!editMode">
        <label class="formFieldLabel" for="last_name">Last Name</label>
        <div class="relative">
          <Input
            :value="last_name"
            id="last_name"
            @input="setFieldValue('last_name', $event)"
          />
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['last_name']">
          {{ errors["last_name"] }}
        </div>
      </div>
      <div class="formField" v-if="!editMode">
        <label class="formFieldLabel" for="email">E-mail Address</label>
        <div class="relative">
          <Input
            :value="email"
            id="email"
            @input="setFieldValue('email', $event)"
            @blur="handleCheckEmail"
          />
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['email']">
          {{ errors["email"] }}
        </div>
      </div>
      <div class="formField" v-if="!editMode">
        <label class="formFieldLabel" for="password">Password</label>
        <div class="relative">
          <Input
            :value="password"
            id="password"
            type="password"
            @input="setFieldValue('password', $event)"
          />
        </div>
        <div class="formFieldTip">
          Password must contain lowercase &amp; uppercase alphabets, numbers,
          special characters &amp; length greater than {{ passwordLength - 1 }}.
        </div>
      </div>
      <div class="formField" v-if="!editMode">
          <label for="role" class="formFieldLabel">Role</label>
          <Select
            id="role"
            :value="role"
            :options="options(roles)"
            customRender
            searchable
            @change="setFieldValue('role', $event)"
          >
            <template v-slot:default="{ label }">
              <div class="my-px mr-4 flex items-center">
                <div class="pr-1 pl-2">
                  {{ label }}
                </div>
              </div>
            </template>
          </Select>
        </div>
      <div class="formField" v-if="editMode">
        <label class="formFieldLabel" for="type">Status</label>
        <div class="relative">
          <Select
            id="status"
            :options="options(statuses)"
            customRender
            @change="setFieldValue('status', $event)"
          >
            <template v-slot:default="{ label, remove }">
              <div class="my-px mr-4 flex items-center">
                <div class="pr-1 pl-2">
                  {{ label }}
                </div>
                <Icon
                  v-if="remove"
                  @click="remove(optionValue)"
                  class="text-textLight"
                  :size="20"
                  name="times"
                ></Icon>
              </div>
            </template>
          </Select>
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['status']">
          {{ errors["status"] }}
        </div>
      </div>
      <div
        class="modal-footer w-full mt-6 flex items-center justify-between px-1"
      >
        <Button variant="secondary" icon="times" @click.prevent="close">
          Cancel
        </Button>
        <Button
          type="submit"
          class="ml-3"
          :variant="'primary'"
          :isWorking="isWorking"
          :disabled="!isValidDTO"
          >{{ editMode ? "Update" : "Create" }}</Button>
      </div>
    </form>
  </div>
</template>
<script>
import Button from '@/components/shared/Button/Button.vue'
import Input from '@/components/shared/Input/Input.vue'
import Select from '@/components/shared/Select/Select.vue'
import Message from '@/components/collection/Message.vue'
import { mapActions, mapGetters } from 'vuex'
import { isValidEmail, isRequired, strongPassword } from '../../utils'
export default {
  name: 'User',
  components: {
    Button,
    Input,
    Message,
    Select
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      status: '',
      role: '',

      message: '',
      loading: false,
      localError: '',
      errors: {},
      emailExisted: false,
      passwordLength: 8,
      editMode: false
    }
  },
  watch: {
    error: function(msg) {
      this.localError = msg
      this.setHints()
    }
  },
  computed: {
    ...mapGetters('mainStore', ['error', 'currentUser', 'roles', 'statuses']),
    isValidDTO() {
      return isRequired(this.first_name) &&
      isRequired(this.last_name) &&
      isValidEmail(this.email) &&
      !this.emailExisted &&
      strongPassword(this.password) &&
      isRequired(this.role) &&
      isRequired(this.status)
    },
    options() {
      return (data) => data.map((item) => ({
        label: item.name,
        value: item.id
      }))
    },
    isWorking() {
      return this.loading
    }
  },
  methods: {
    ...mapActions('mainStore', ['save', 'get']),
    setFieldValue(type, value) {
      this[type] = value
    },
    setHints() {
      if (typeof this.localError === 'object') {
        this.localError.forEach(item => {
          this.errors[item.context.key] = item.message
        })
      }
    },
    async getRoles() {
      await this.get({
        url: 'roles',
        method: 'GET',
        mutation: 'setRoles',
        data: {},
      })
    },
    async getStatus() {
      await this.get({
        url: 'status',
        method: 'GET',
        mutation: 'setStatuses',
        data: {},
      })
    },
    async handleCheckEmail() {
      this.loading = true
      const saved = await this.save({
        url: `users/check/email`,
        method: 'POST',
        data: {
          email: this.email
        },
      })
      if (saved) {
        this.emailExisted = false
        this.errors['email'] = ''
      } else {
        this.emailExisted = true
      }
      this.loading = false
    },
    async handleSubmit() {
      this.loading = true
      const saved = await this.save({
        url: this.editMode ? `users/${this.currentUser.id}` : 'users',
        method: this.editMode ? 'PUT' : 'POST',
        data: {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          role: this.role,
          status: this.status
        },
      })
      if (saved) {
        this.close('refetch')
      }
      this.loading = false
    },
   close(type) {
        this.$emit('close', type)
    }
  },
  created() {
    if (this.currentUser && Object.keys(this.currentUser).length) {
      this.editMode = true
      this.status = this.currentUser.status
    }
    this.getRoles()
    this.getStatus()
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