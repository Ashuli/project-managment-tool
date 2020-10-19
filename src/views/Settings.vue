<template>
  <div class="w-full md:w-4/12 lg:w-4/12 m-auto text-left">
    <div class="bg-white p-4 mt-16">
      <div class="">
        <div class="mb-4">
          <h3 class="font-bold text-center">Edit profilen</h3>
        </div>
      </div>
      <div class="update-profile">
        <div class="avatar-container">
          <img src="img/7.jpg" class="" />
        </div>
      </div>
      <div class="text-center">
        <a href="#" class="font-bold text-xs text-teal-500"
        @click.prevent="openUserModal">Change photo</a>
      </div>
    </div>
    <div class="bg-white p-4 mt-2">
      <div class="pb-8">
        <ul class="flex menus">
          <li><a href="#" :class="{ 'active': tabview === 'basic' }"
            @click.prevent="tabview = 'basic'">Basic profile</a></li>
          <li><a href="#" :class="{ 'active': tabview === 'password' }"
            @click.prevent="tabview = 'password'">Password change</a></li>
        </ul>
      </div>

      <div v-if="tabview === 'basic'">
        <div class="formField">
          <label for="vorname" class="formFieldLabel">Title</label>
          <Select
            id="title"
            :value="basic.title"
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
        </div>

        <div class="formField">
          <label class="formFieldLabel" for="first name">first name</label>
          <Input
            aria-label="first name"
            icon=""
            :value="basic.lastName"
            @input="v => (basic.lastName = v)"
          />
        </div>

        <div class="formField">
          <label class="formFieldLabel" for="Last nam">Last name</label>
          <Input
            aria-label="Last nam"
            icon=""
            :value="basic.firstName"
            @input="v => (basic.firstName = v)"
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
          <label class="formFieldLabel" for="oldPassword">Old password</label>
          <Input
            aria-label="oldPassword"
            icon=""
            type="password"
            :value="form.oldPassword"
            @input="v => (form.oldPassword = v)"
          />
          <div class="formFieldTip formFieldTipError" v-if="errors['oldPassword']">{{ errors['oldPassword'] }}</div>
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
    <ModalRoot @closeModal="closeUploadModal" :width="300" />
  </div>
</template>
<script>
import Input from '@/components/shared/Input/Input.vue'
import Button from '@/components/shared/Button/Button.vue'
import Message from '@/components/collection/Message.vue'
import SnackbarRoot from '@/components/collection/SnackbarRoot.vue'
export default {
  name: 'Settings',
  components: {
    Button,
    Input,
    Message,
    SnackbarRoot
  },
  data() {
    return {
      basic: {
        firstName: '',
        lastName: '',
        email: '',
      },
      form: {
        c_password: '',
        oldPassword: '',
        password: '',
      },
      photoId: '',
      img: '',
      showUploadModal: false,
      tabview: 'basic',
      statuses: ['employed', 'unemployed'],
      titles: ['Divers', 'Herr', 'Frau'],
      passwordLength: 8,
    }
  }
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