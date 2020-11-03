<template>
  <div class="w-full h-full py-5 px-8">
    <div class="flex items-center text-textDarkest">
      <div class="text-xl">Status</div>
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
        <label class="formFieldLabel" for="type">Type</label>
        <div class="relative">
          <Select
            id="type"
            :options="options"
            customRender
            @change="setFieldValue('type', $event)"
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
        <div class="formFieldTip formFieldTipError" v-if="errors['type']">
          {{ errors["type"] }}
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
        <label class="formFieldLabel" for="status">Status</label>
        <div class="relative">
          <Input
            :value="status"
            id="status"
            @input="setFieldValue('status', $event)"
          />
        </div>
        <div class="formFieldTip formFieldTipError" v-if="errors['status']">
          {{ errors["status"] }}
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
import Icon from '../shared/Icon/Icon.vue'
import Select from '../shared/Select/Select.vue'
import { mapActions, mapGetters } from 'vuex'
import { isRequired } from '../../utils'

export default {
  name: 'Status',
  components: {
    Button,
    Input,
    Icon,
    Message,
    Select
  },
  data() {
    return {
      name: '',
      type: '',
      order: '',
      status: 'true',

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
    ...mapGetters('mainStore', ['error', 'currentStatus']),
    isValidDTO() {
      return isRequired(this.name) &&
      isRequired(this.type) &&
      isRequired(this.order)
    },
    options() {
      return [{
        label: 'Project',
        value: 'Project'
      },
      {
        label: 'Task',
        value: 'Task'
      },
      {
        label: 'User',
        value: 'User'
      }
      ]
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
        url: this.editMode ? `status/${this.currentStatus.id}` : 'status',
        method: this.editMode ? 'PUT' : 'POST',
        data: {
          name: this.name,
          type: this.type,
          order: this.order,
          status: this.status
        },
      })
      if (saved) {
        console.log('hello')
        this.close('refetch')
      }
      this.loading = false
    },
    close(type) {
        this.$emit('close', type)
    }
  },
  created() {
    if (this.currentStatus && Object.keys(this.currentStatus).length) {
      this.editMode = true
      this.name = this.currentStatus.name
      this.type = this.currentStatus.type
      this.order = this.currentStatus.order
      this.status = this.currentStatus.status
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