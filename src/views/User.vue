<template>
  <div>
    <nav-pro />
    <div class="flex flex-col items-center my-16 px-8">
      <div class="w-full" v-if="users.length >= 0">
        <div class="flex justify-end mt-20 mr-2">
          <Button :icon="'plus'" @click="openModal">Add users</Button>
        </div>
      </div>
      <div class="w-full" v-if="users.length">
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
          @update="updateUser"
        />
      </div>
      <div class="w-full py-4 px-8" v-else-if="users.length === 0">
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
          selectedUser: {},
      }
  },
  computed: {
    ...mapGetters('mainStore', ['users']),
    filteredUsers() {
      const filter = this.filter.toLowerCase()
      return this.users.filter(item => {
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
      return this.filteredUsers.map(entry => ({
        first_name: entry.first_name,
        last_name: entry.last_name,
        email: entry.email,
        status: entry.status,
        handlers: [
          {
            name: 'update',
            icon: 'edit',
            title: 'Edit'
          }
        ],
        entry
      }))
    }
  },
  methods: {
    ...mapActions('mainStore', ['get', 'delete', 'setCurrentUser']),
    async getUsers() {
      await this.get({
        url: 'users',
        method: 'GET',
        mutation: 'setUsers',
        data: {},
      })
    },
    // triggerDelete(entry) {
    //   this.selectedUser = entry
    //   eventBus.$emit('toggle-delete-user', true)
    // },
    // async deleteUser(entry) {
    //   const deleted = await this.delete({
    //     url: `user/${this.selectedUser.id}`,
    //     method: 'DELETE',
    //     data: {}
    //   })
    //   if (deleted) {
    //       this.showAlert('Delete :) .', 'success')
    //       this.getUsers()
    //   }

    //   eventBus.$emit('toggle-delete-user', false)
    // },
    updateUser(entry) {
      this.setCurrentUser(entry)
      eventBus.$emit('toggle-user-update', this.getUsers)
    },
    openModal() {
      this.setCurrentUser(null)
      eventBus.$emit('toggle-create-user', this.getUsers)
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
      this.getUsers()
      eventBus.$on('confirm-user-delete', this.deleteUser)
  }
}

</script>