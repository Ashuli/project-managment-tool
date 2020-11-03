<template>
  <div class="w-full h-full py-5 px-8">
    <div class="flex items-center text-textDarkest">
      <div class="text-xl">Project Category</div>
      <div class="flex-auto"></div>
      <Button
        @click="$emit('close')"
        icon="times"
        :iconSize="24"
        variant="empty"
      />
    </div>
    <form novalidate autocomplete="off" @submit.prevent="handleSubmit">
      <!-- <div class="sep"></div> -->
      <Message
        v-if="typeof localError === 'string'"
        :message="localError"
        :success="false"
      />
      <div class="formField text-left">
        <label class="formFieldLabel" for="code">Code</label>
        <div class="relative">
          <Input
            :value="code"
            id="code"
            @input="setFieldValue('code', $event)"
          />
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['code']">
          {{ errors["code"] }}
        </div>
      </div>
      <div class="formField text-left">
        <label class="formFieldLabel" for="name">Name</label>
        <div class="relative">
          <Input
            :value="name"
            id="name"
            @input="setFieldValue('name', $event)"
          />
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['name']">
          {{ errors["name"] }}
        </div>
      </div>
      <div class="formField text-left">
        <label class="formFieldLabel" for="order">Order</label>
        <div class="relative">
          <Input
            :value="order"
            id="order"
            @input="setFieldValue('order', $event)"
          />
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['order']">
          {{ errors["order"] }}
        </div>
      </div>
      <div class="formField text-left">
        <label class="formFieldLabel" for="description">Description</label>
        <div class="relative">
          <Input
            :value="description"
            id="description"
            @input="setFieldValue('description', $event)"
          />
        </div>
        <div
          class="formFieldTip formFieldTipError" v-if="errors['description']">
          {{ errors["description"] }}
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
          >{{ editMode ? "Update" : "Create" }}</Button
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
    Message,
  },
  data() {
    return {
      code: '',
      name: '',
      order: '',
      description: '',

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
    ...mapGetters('mainStore', ['error', 'currentProjectCategory']),
    isValidDTO() {
      return isRequired(this.code) && 
      isRequired(this.name) &&
      isRequired(this.order) &&
      isRequired(this.description)
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
        url: this.editMode ? `project-categories/${this.currentProjectCategory.id}` : 'project-categories',
        method: this.editMode ? 'PUT' : 'POST',
        data: {
          code: this.code,
          name: this.name,
          order: this.order,
          description: this.description,
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
    if (this.currentProjectCategory && Object.keys(this.currentProjectCategory).length) {
      this.editMode = true
      this.code = this.currentProjectCategory.code
      this.name = this.currentProjectCategory.name
      this.order = this.currentProjectCategory.order
      this.description = this.currentProjectCategory.description
      this.status = this.currentProjectCategory.status
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