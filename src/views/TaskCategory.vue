<template>
  <div>
    <nav-pro />
    <div class="flex flex-col items-center my-16 px-8">
      <div class="w-full" v-if="taskCategories.length >= 0">
        <div class="flex justify-end mt-20 mr-6">
          <Button :icon="'plus'" @click="openModal">Add task category</Button>
        </div>
      </div>
      <div class="w-full" v-if="taskCategories.length">
        <div>
          <form autocomplete="off" class="flex items-end w-1/4" novalidate>
            <Input
              aria-label="search"
              @input="(v) => (filter = v)"
              :value="filter"
              icon="search"
            />
          </form>
        </div>
        <Lists
          :entries="options"
          @delete="triggerDelete"
          @update="updateTaskCategory"
        />
      </div>
      <div class="w-full py-4 px-8" v-else-if="taskCategories.length === 0">
        <div class="flex items-center text-sm">No data.</div>
      </div>
      <div class="w-full py-4 px-8" v-else>
        <div class="flex items-center text-sm">
          <Icon name="spin" class="spinner" />
          <span class="px-2">Loading...</span>
        </div>
      </div>
      <SnackbarRoot />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Lists from '../components/Lists/Lists.vue'
import Input from '../components/shared/Input/Input.vue'
import Button from '../components/shared/Button/Button.vue'
import NavPro from '../components/NavPro.vue'
import Icon from '../components/shared/Icon/Icon.vue'
import eventBus from '../eventBus'
import Alert from '../components/collection/Alert.vue'
import SnackbarRoot from '../components/collection/SnackbarRoot.vue'

export default {
  components: {
    Lists,
    Input,
    Button,
    Icon,
    SnackbarRoot,
    NavPro
  },
  data() {
      return {
          filter: '',
          selectedTaskCategory: {},
      }
  },
  computed: {
    ...mapGetters('mainStore', ['taskCategories']),
    filteredTaskCategory() {
      const filter = this.filter.toLowerCase()
      return this.taskCategories.filter(item => {
        for (const key in item) {
          if (
            typeof item[key] === 'string' &&
            item[key].toLowerCase().indexOf(filter) !== -1
          ) {
            return true
          }
        }
        return false
      })
    },
    options() {
      return this.filteredTaskCategory.map(entry => ({
        code: entry.code,
        name: entry.name,
        order: entry.order,
        description: entry.description,
        status: entry.status,
        handlers: [
          {
            name: 'update',
            icon: 'edit',
            title: 'Edit'
          },
          {
            name: 'delete',
            icon: 'trash',
            title: 'Delete'
          }
        ],
        entry
      }))
    }
  },
  methods: {
    ...mapActions('mainStore', ['get', 'delete', 'setCurrentTaskCategory']),
    async getTaskCategory() {
      await this.get({
        url: 'task-categories',
        method: 'GET',
        mutation: 'setTaskCategory',
        data: {},
      })
    },
    triggerDelete(entry) {
      this.selectedTaskCategory = entry
      eventBus.$emit('toggle-task-category-delete', true)
    },
    async deleteTaskCategory(entry) {
      const deleted = await this.delete({
        url: `taskCategories/${this.selectedTaskCategory.id}`,
        method: 'DELETE',
        data: {}
      })
      if (deleted) {
          this.showAlert('Delete :) .', 'success')
          this.getTaskCategory()
      }
      eventBus.$emit('toggle-task-category-delete', false)
    },
    updateTaskCategory(entry) {
      this.setCurrentTaskCategory(entry)
      eventBus.$emit('toggle-task-category-update', this.getTaskCategory)
    },
    openModal() {
      this.setCurrentTaskCategory(null)
      eventBus.$emit('toggle-create-task-category', this.getTaskCategory)
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
  },
  created() {
      this.getTaskCategory()
      eventBus.$on('confirm-delete-task-category', this.deleteTaskCategory)
  }
}
</script>