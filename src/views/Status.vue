<template>
  <div>
    <nav-pro />
    <div class="flex flex-col items-center my-16 px-8">
      <div class="w-full" v-if="statuses.length >= 0">
        <div class="flex justify-end mt-20 mr-6">
          <Button :icon="'plus'" @click="openModal">Add status</Button>
        </div>
      </div>
      <div class="w-full" v-if="statuses.length">
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
          @update="updateStatus"
        />
      </div>
      <div class="w-full py-4 px-8" v-else-if="statuses.length === 0">
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
          selectedStatus: {},
      }
  },
  computed: {
    ...mapGetters('mainStore', ['statuses']),
    filteredStatuses() {
      const filter = this.filter.toLowerCase()
      return this.statuses.filter(item => {
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
      return this.filteredStatuses.map(entry => ({
        id: entry.id,
        name: entry.name,
        type: entry.type,
        order: entry.order,
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
    ...mapActions('mainStore', ['get', 'delete', 'setCurrentStatus']),
    async getStatuses() {
      await this.get({
        url: 'status',
        method: 'GET',
        mutation: 'setStatuses',
        data: {},
      })
    },
    triggerDelete(entry) {
      this.selectedStatus = entry
      eventBus.$emit('toggle-status-delete', true)
    },
    async deleteStatus(entry) {
      const deleted = await this.delete({
        url: `status/${this.selectedStatus.id}`,
        method: 'DELETE',
        data: {}
      })
      if (deleted) {
          this.showAlert('Delete :) .', 'success')
          this.getStatuses()
      }

      eventBus.$emit('toggle-status-delete', false)
    },
    updateStatus(entry) {
      this.setCurrentStatus(entry)
      eventBus.$emit('toggle-status-update', this.getStatuses)
    },
    openModal() {
      this.setCurrentStatus(null)
      eventBus.$emit('toggle-create-status', this.getStatuses)
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
      this.getStatuses()
      eventBus.$on('confirm-delete-status', this.deleteStatus)
  }
}
</script>