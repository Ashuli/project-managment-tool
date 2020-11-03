<template>
  <div class="w-full h-full py-5 px-8 text-left font-sans">
    <div class="flex items-center text-textDarkest">
      <div class="text-xl">Add Card</div>
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
      <div class="formField">
        <label class="formFieldLabel" for="name">Task Title</label>
        <div class="relative">
          <Input
            :value="title"
            id="title"
            @input="setFieldValue('title', $event)"
          />
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['title']">
          {{ errors["title"] }}
        </div>
      </div>
      <div class="formField flex justify-end items-center">
        <Button class="ml-3" variant="secondary" @click.prevent="close"
          >Cancel</Button
        >
        <Button
          class="ml-3"
          variant="primary"
          type="submit"
          :isWorking="isWorking"
          :disabled="!isValidDTO"
          >Create</Button
        >
      </div>
    </form>
  </div>
</template>
<script>
import Button from '../shared/Button/Button.vue'
import Input from '../shared/Input/Input.vue'
import Message from '../collection/Message.vue'
import { mapActions, mapGetters } from 'vuex'
import { isRequired } from '../../utils'
export default {
  components: {
    Button,
    Message,
    Input
  },
  data() {
    return {
      title: '',

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
    ...mapGetters('mainStore', ['error']),
    isValidDTO() {
      return isRequired(this.title)
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
    async handleSubmit() {
      this.loading = true
      const saved = await this.save({
        url: 'task',
        method: 'POST',
        data: {
          title: this.title
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
