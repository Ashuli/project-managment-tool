<template>
  <div class="w-full md:w-4/12 lg:w-4/12 m-auto">
    <div class="bg-white p-4 mt-16">
      <div class="">
        <div class="mb-4">
          <h3 class="font-bold text-center">Edit profile</h3>
        </div>
      </div>
      <div class="update-profile">
        <div class="avatar-container">
          <img :src="checkProfile()" class="" />
        </div>
      </div>
      <div class="text-center">
        <a href="#" class="font-bold text-xs text-teal-500"
        @click.prevent="openUserModal">Change photo</a>
      </div>
    </div>
    <div class="bg-white p-4 mt-2 text-left">
      <div class="pb-8">
        <ul class="flex menus">
          <li><a href="#" :class="{ 'active': tabview === 'basic' }"
            @click.prevent="tabview = 'basic'">Basic profile</a></li>
          <li><a href="#" :class="{ 'active': tabview === 'password' }"
            @click.prevent="tabview = 'password'">Password change</a></li>
        </ul>
      </div>

      <div v-if="tabview === 'basic'">
        <!-- <div class="formField">
          <label for="vorname" class="formFieldLabel">Title</label>
          <Select
            id="title"
            :value="basic.title"
            :options="options(titles)"
            customRender
            searchable
            @change="setFieldValue('title', $event)"
          >
            <template v-slot:default="{ label }">
              <div class="my-px mr-4 flex items-center">
                <div class="pr-1 pl-2">
                  {{ label }}
                </div>
              </div>
            </template>
          </Select>
        </div> -->
        <div class="formField">
          <label class="formFieldLabel" for="first_name">First name</label>
          <Input
            aria-label="first_name"
            icon=""
            :value="basic.last_name"
            @input="v => (basic.last_name = v)"
          />
        </div>

        <div class="formField">
          <label class="formFieldLabel" for="last_name">Last name</label>
          <Input
            aria-label="last_name"
            icon=""
            :value="basic.first_name"
            @input="v => (basic.first_name = v)"
          />
        </div>

        <div class="formField">
          <label for="email" class="formFieldLabel">E-mail address</label>
          <Input
            aria-label="Email"
            icon=""
            :disabled="true"
            :value="basic.email"
            @input="v => (basic.email = v)"
          />
        </div>

        <div class="w-full my-4 flex justify-center">
          <Button :disabled="!isValidUserDTO" @click="handleUpdateUser">
            Save
          </Button>
        </div>
      </div>
      <div v-if="tabview === 'password'">
        <Message v-if="typeof localError === 'string'" :message="localError" :success="false" />
        <div class="formField">
          <label class="formFieldLabel" for="old_password">Old password</label>
          <Input
            aria-label="old_password"
            icon=""
            type="password"
            :value="form.old_password"
            @input="v => (form.old_password = v)"
          />
          <div class="formFieldTip formFieldTipError" v-if="errors['old_password']">{{ errors['old_password'] }}</div>
        </div>

        <div class="formField">
          <label class="formFieldLabel" for="password">Password</label>
          <div class="relative">
            <Input
              :value="form.password"
              id="password"
              type="password"
              @input="v => (form.password = v)"
            />
          </div>
          <div class="formFieldTip">Password must contain lowercase &amp; uppercase alphabets, numbers, special characters &amp; length greater than {{ passwordLength - 1 }}.</div>
        </div>

        <div class="formField">
          <label class="formFieldLabel" for="c_password">Repeat password</label>
          <Input
            aria-label="c_password"
            icon=""
            type="password"
            :value="form.c_password"
            @input="v => (form.c_password = v)"
          />
        </div>
        <div class="w-full my-4 flex justify-center">
          <Button :disabled="!isValidPasswordDTO" :isWorking="isWorking" @click="handlePasswordChange">
            Save
          </Button>
        </div>
      </div>
    </div>
    <SnackbarRoot />
    <!-- <ModalRoot @closeModal="closeUploadModal" :width="300" /> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Input from '@/components/shared/Input/Input.vue'
import eventBus from '@/eventBus'
import Alert from '@/components/collection/Alert.vue'
import SnackbarRoot from '@/components/collection/SnackbarRoot.vue'
import Button from '@/components/shared/Button/Button.vue'
// import Select from '@/components/shared/Select/Select.vue'
// import UploadPhoto from '@/components/modals/UploadPhoto.vue'
// import ModalRoot from '@/components/modals/ModalRoot.vue'
import { BASE_URL_IMAGE_PATH } from '@/config'
import DefaultProfile from '@/assets/avatar.png'
import Message from '@/components/collection/Message.vue'
import { userInfoService } from '../services/storageService';
import { strongPassword, isRequired } from '../utils'

export default {
  name: 'Settings',
  components: {
    SnackbarRoot,
    Button,
    // UploadPhoto,
    // ModalRoot,
    Input,
    // Select,
    Message
  },
  data() {
    return {
      basic: {
        first_name: '',
        last_name: '',
        email: '',
      },
      form: {
        c_password: '',
        old_password: '',
        password: '',
      },
      photoId: '',
      img: '',
      showUploadModal: false,
      tabview: 'basic',
      localError: '',
      passwordLength: 8,
      loading: false,
      errors: {}
    }
  },
  created() {
    this.getProfile()
  },
  watch: {
    error: function(msg) {
      this.localError = msg
      this.setHints()
    },
  },
  computed: {
    ...mapGetters(['getUser']),
    ...mapGetters('mainStore', ['error']),
    options() {
      return items =>
        items.map(item => ({
          label: item,
          value: item,
          item,
        }))
    },
    isValidPasswordDTO() {
      return strongPassword(this.form.c_password) &&
      isRequired(this.form.password) &&
      this.samePassword() 
    },
    isValidUserDTO() {
      return isRequired(this.basic.first_name) && isRequired(this.basic.last_name)
    },
    isWorking() {
      return this.loading
    },
  },
  methods: {
    ...mapActions('mainStore', ['update', 'getEntry']),
    ...mapActions(['setUser', 'logout']),
    setFieldValue(type, value) {
      this.basic[type] = value
    },
    setHints() {
      if (typeof this.localError === 'object') {
        this.localError.forEach(item => {
          this.errors[item.context.key] = item.message
        })
      }
    },
    dateFormat(date) {
      return date
    },
    async getProfile() {
      const user = await this.getEntry({
        url: 'users/profile',
        method: 'GET',
        data: {}
      })
      if (user) {
        this.basic = user
        this.basic.birthDate = this.dateFormat(user.birthDate)
      }
    },
    excludeFields(form) {
      const excludes = [
        '_id',
        'createdAt',
        'updatedAt',
        'email',
        'profileCompleted',
        'role',
        'isActive',
        'avatar',
        '__v',
      ]
      if (this.getUser.role === 'admin') {
        excludes.push('title')
      }
      const copyForm = {}
      for (const key in form) {
        if (excludes.indexOf(key) === -1) {
          copyForm[key] = form[key]
        }
      }
      return copyForm
    },
    samePassword() {
      return this.form.password === this.form.c_password
    },
    // openUserModal() {
    //   eventBus.$emit('openModalRoot', {
    //     component: UploadPhoto,
    //     title: 'Profilbild',
    //   })
    // },
    // closeUploadModal() {
    //   this.showUploadModal = false
    // },
    async handlePasswordChange() {
      this.loading = true
      const updated = await this.update({
        url: `users/change/password`,
        method: 'PUT',
        data: {
          new_password: this.form.password,
          old_password: this.form.old_password,
        }
      })
      if (updated) {
        this.form.password = ''
        this.form.old_password = ''
        this.form.c_password = ''
        this.showAlert('Password updated', 'success')
      }
       this.loading = false
    },
    async handleUpdateUser() {
      const updated = await this.update({
        url: `users/update/profile`,
        method: 'PUT',
        data: this.excludeFields(this.basic)
      })
      if (updated) {
        const user = { ...this.getUser }
        user.first_name = this.basic.first_name
        user.last_name = this.basic.last_name

        this.setUser(user)
        userInfoService.saveUser(user);
        this.showAlert('Profile updated', 'success')
      }
    },
    showAlert(msg, type, duration = 5000, isAlert = true) {
      eventBus.$emit('open', {
        component: isAlert ? Alert : null,
        props: {
          text: msg,
          type,
        },
        duration,
      })
    },
    checkProfile() {
      return this.getUser && this.getUser.avatar
        ? `${BASE_URL_IMAGE_PATH}/${this.getUser.avatar}`
        : DefaultProfile
    },
  },
}
</script>
<style lang="postcss" scoped>
.menus {
  @apply py-2 bg-secondary;
}
.menus .active {
  @apply font-medium text-primary;
}
.menus li {
  @apply px-2 text-textMedium;
}
.menus li a:hover {
  @apply text-primary;
}
</style>
<style scoped>
.main-body {
  padding: 0 48px;
  padding-top: 88px;
  background: #e9ecef;
}
.custom-file-label::after {
  content: 'Durchsuchen' !important;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: block;
  /* height: 2.25rem; */
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  color: #495057;
  content: 'Browse';
  background-color: #e9ecef;
  border-left: 1px solid #ced4da;
  border-radius: 0 0.25rem 0.25rem 0;
}
.update-profile {
  position: relative;
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
}
.avatar-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.avatar-container img {
  width: 100%;
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