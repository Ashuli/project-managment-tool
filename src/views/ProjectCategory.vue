<template>
  <div>
    <nav-pro />
    <div class="flex flex-col items-center my-16 px-8">
      <div class="w-full" v-if="projectCategories.length >= 0">
        <div class="flex justify-end mt-20 mr-6">
          <Button :icon="'plus'" @click="openModal"
            >Add project category</Button
          >
        </div>
      </div>
      <div class="w-full" v-if="projectCategories.length">
        <div>
          <form autocomplete="off" class="flex items-end w-1/2" novalidate>
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
          @update="updateProjectCategory"
        />
      </div>
      <div class="w-full py-4 px-8" v-else-if="projectCategories.length === 0">
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
          selectedProjectCategory: {},
      }
  },
  computed: {
    ...mapGetters('mainStore', ['projectCategories']),
    filteredProjectCategories() {
      const filter = this.filter.toLowerCase()
      return this.projectCategories.filter(item => {
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
      return this.filteredProjectCategories.map(entry => ({
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
            title: 'Edit'
          }
        ],
        entry
      }))
    }
  },
  methods: {
    ...mapActions('mainStore', ['get', 'delete', 'setCurrentProjectCategory']),
    async getProjectCategories() {
      await this.get({
        url: 'project-categories',
        method: 'GET',
        mutation: 'setProjectCategory',
        data: {},
      })
    },
    triggerDelete(entry) {
      this.selectedProjectCategory = entry
      eventBus.$emit('toggle-project-category-delete', true)
    },
    async deleteProjectCategory(entry) {
      const deleted = await this.delete({
        url: `project-categories/${this.selectedProjectCategory.id}`,
        method: 'DELETE',
        data: {}
      })
      if (deleted) {
          this.showAlert('Delete :) .', 'success')
          this.getProjectCategories()
      }

      eventBus.$emit('toggle-project-category-delete', false)
    },
    updateProjectCategory(entry) {
      this.setCurrentProjectCategory(entry)
      eventBus.$emit('toggle-project-category-update', this.getProjectCategories)
    },
    openModal() {
      this.setCurrentProjectCategory(null)
      eventBus.$emit('toggle-create-project-category', this.getProjectCategories)
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
      this.getProjectCategories()
      eventBus.$on('confirm-delete-project-category', this.deleteProjectCategory)
  }
}

</script>