<template>
  <div class="w-full h-full py-5 px-8">
    <div class="flex items-center text-textDarkest">
      <div class="text-xl">
        Roles
      </div>
      <div class="flex-auto"></div>
      <Button @click="$emit('close')" icon="times" :iconSize="24" variant="empty" />
    </div>
    <form novalidate autocomplete="off" @submit.prevent="handleSubmit">
      <!-- <div class="sep"></div> -->
      <Message v-if="typeof localError === 'string'" :message="localError" :success="false" />
      <div class="formField text-left">
        <label class="formFieldLabel" for="name">Name</label>
        <div class="relative">
          <Input
            :value="name"
            id="name"
            @input="setFieldValue('name', $event)"
          />
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['name']">{{ errors['name'] }}</div>
      </div>
      <div class="formField flex justify-end items-center">
        <Button class="ml-3" variant="secondary" @click.prevent="close">Cancel</Button>
        <Button
          class="ml-3"
          variant="primary"
          type="submit"
          :isWorking="isWorking"
          :disabled="!isValidDTO"
          >{{ editMode ? 'Update': 'Create'}}</Button
        >
      </div>
    </form>
  </div>
</template>
<script>
import Button from '../shared/Button/Button.vue'
import Message from '../collection/Message.vue'
import Input from '../shared/Input/Input.vue'
import { mapActions, mapGetters } from 'vuex'
import { isRequired } from '../../utils'

export default {
  components: {
    Button,
    Input,
    Message
  },
  data() {
    return {
      name: '',
      loading: false,
      localError: '',
      errors: {},
      editMode: false,
    }
  },
  watch: {
    error: function(msg) {
      this.localError = msg
      this.setHints()
    }
  },
  computed: {
    ...mapGetters('mainStore', ['error', 'currentRole']),
    isValidDTO() {
      return isRequired(this.name)
    },
    isWorking() {
      return this.loading
    },
  },
  methods: {
    ...mapActions('mainStore', ['save']),
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
    async handleSubmit() {
      this.loading = true
      const saved = await this.save({
        url: this.editMode ? `roles/${this.currentRole.id}` : 'roles',
        method: this.editMode ? 'PUT' : 'POST',
        data: {
          name: this.name
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
    if (this.currentRole && Object.keys(this.currentRole).length) {
      this.editMode = true
      this.name = this.currentRole.name
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