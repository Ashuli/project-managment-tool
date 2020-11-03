<template>
  <div class="w-full h-full py-5 px-8 text-left font-sans">
    <div class="flex items-center text-textDarkest">
      <div class="text-xl">Project</div>
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
        <label class="formFieldLabel" for="name">Project Title</label>
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
      <div class="formField">
        <label class="formFieldLabel" for="description"
          >Project Description</label
        >
        <div class="relative">
          <Input
            :value="description"
            id="description"
            @input="setFieldValue('description', $event)"
          />
        </div>
        <div
          class="formFieldTip formFieldTipError"
          v-if="errors['description']"
        >
          {{ errors["description"] }}
        </div>
      </div>
      <div class="formField">
        <label class="formFieldLabel" for="category">Category</label>
        <div class="relative">
          <Select
            id="category"
            :value="category"
            :options="options(projectCategories)"
            customRender
            @change="setFieldValue('category', $event)"
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
        <div class="formFieldTip formFieldTipError" v-if="errors['category']">
          {{ errors["category"] }}
        </div>
      </div>
      <div class="formField">
        <label class="formFieldLabel" for="startDate">Start Date</label>
        <div class="relative">
          <Input
            :value="start_date"
            id="start_date"
            type="date"
            @input="setFieldValue('start_date', $event)"
          />
        </div>
        <div class="formFieldTip"></div>
      </div>
      <div class="formField">
        <label class="formFieldLabel" for="endDate">End Date</label>
        <div class="relative">
          <Input
            :value="end_date"
            id="end_date"
            type="date"
            @input="setFieldValue('end_date', $event)"
          />
        </div>
      </div>
      <div class="formField text-left">
        <label class="formFieldLabel" for="status">Status</label>
        <div class="relative">
          <Select
            id="status"
            :value="status"
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
  components: {
    Button,
    Input,
    Message,
    Select,
    Icon,
  },
  data() {
    return {
      title: '',
      description: '',
      category: '',
      start_date: '',
      end_date: '',
      status: '',
      
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
    ...mapGetters('mainStore', ['error', 'currentProject', 'statuses', 'projectCategories']),
    isValidDTO() {
      return isRequired(this.title) &&
      isRequired(this.description) &&
      isRequired(this.category) &&
      isRequired(this.start_date) &&
      isRequired(this.end_date) &&
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
    },
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
    async getStatus() {
      await this.get({
        url: 'status',
        method: 'GET',
        mutation: 'setStatuses',
        data: {},
      })
    },
    async getProjectCategory() {
      await this.get({
        url: 'project-categories',
        method: 'GET',
        mutation: 'setProjectCategory',
        data: {},
      })
    },
    async handleSubmit() {
      this.loading = true
      const saved = await this.save({
        url: this.editMode ? `projects/${this.currentProject.id}` : 'projects',
        method: this.editMode ? 'PUT' : 'POST',
        data: {
          title: this.title,
          description: this.description,
          project_category_id: this.category,
          start_date: this.start_date,
          end_date: this.end_date,
          status_id: this.status
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
    if (this.currentProject && Object.keys(this.currentProject).length) {
      console.log(this.currentProject)
      this.editMode = true
      this.title = this.currentProject.title
      this.description = this.currentProject.description
      this.category = this.currentProject.project_category_id
      this.start_date = this.currentProject.start_date
      this.end_date = this.currentProject.end_date
      this.status = this.currentProject.status_id
    }
    this.getProjectCategory()
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