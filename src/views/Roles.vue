<template>
  <div>
    <nav-pro />
    <div class="flex flex-col items-center my-16 px-8">
      <div class="w-full" v-if="roles.length >= 0">
        <div class="flex justify-end mt-20 mr-2">
          <Button :icon="'plus'" @click="openModal">Add roles</Button>
        </div>
      </div>
      <div class="w-full" v-if="roles.length">
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
          @update="updateRole"
        />
      </div>
      <div class="w-full py-4 px-8" v-else-if="roles.length === 0">
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
import Icon from '../components/shared/Icon/Icon.vue'
import NavPro from '../components/NavPro.vue'
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
          selectedRole: {},
      }
  },
  computed: {
    ...mapGetters('mainStore', ['roles']),
    filteredRoles() {
      const filter = this.filter.toLowerCase()
      return this.roles.filter(item => {
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
      return this.filteredRoles.map(entry => ({
        name: entry.name,
        handlers: [
          {
            name: 'update',
            icon: 'edit',
            title: 'Bearbeiten'
          },
          {
            name: 'delete',
            icon: 'trash',
            title: 'Löschen'
          }
        ],
        entry
      }))
    }
  },
  methods: {
    ...mapActions('mainStore', ['get', 'delete', 'setCurrentRole']),
    async getRoles() {
      await this.get({
        url: 'roles',
        method: 'GET',
        mutation: 'setRoles',
        data: {},
      })
    },
    triggerDelete(entry) {
      this.selectedRole = entry
      eventBus.$emit('toggle-roles-delete', true)
    },
    async deleteRole(entry) {
      const deleted = await this.delete({
        url: `roles/${this.selectedRole.id}`,
        method: 'DELETE',
        data: {}
      })
      if (deleted) {
          this.showAlert('Delete :) .', 'success')
          this.getRoles()
      }

      eventBus.$emit('toggle-delete-roles', false)
    },
    updateRole(entry) {
      this.setCurrentRole(entry)
      eventBus.$emit('toggle-roles-update', this.getRoles)
    },
    openModal() {
      this.setCurrentRole(null)
      eventBus.$emit('toggle-create-roles', this.getRoles)
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
      this.getRoles()
      eventBus.$on('confirm-delete-roles', this.deleteRole)
  }
}
</script>