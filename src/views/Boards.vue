<template>
  <div class="h-screen overflow-hidden bg-gray-100">
    <nav-pro />
    <div class="flex justify-end mt-24 mr-12">
      <button
        class="flex items-center px-2 py-1 text-sm font-normal text-gray-200 bg-gray-800 rounded hover:bg-gray-700"
        @click="openModal"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path fill="fff" d="M0 oh24v24H0z"></path>
          <path
            d="M12 7v10m5-5H7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
        </svg>
        <span>Add project</span>
      </button>
    </div>
    <div class="flex ml-8 flex-wrap">
      <card-board
        @deleteProject="triggerDelete"
        @updateProject="updateProject"
        v-for="card in searchProject()"
        :key="card.title"
        width="20rem"
        :card="card"
        :entries="options"
      />
    </div>
    <div class="flex flex-col items-center my-16 px-8">
      <SnackbarRoot />
    </div>
  </div>
</template>

<script>
import CardBoard from '@/components/Card/CardBoard.vue'
import { mapActions, mapGetters } from 'vuex'
import NavPro from '../components/NavPro.vue'
import eventBus from '../eventBus'
import Alert from '../components/collection/Alert.vue'
import SnackbarRoot from '../components/collection/SnackbarRoot.vue'

export default {
  name: 'Boards',
  inject: ['searchProject'],
  props: ['filterd'],
  components: {
    CardBoard,
    SnackbarRoot,
    NavPro
  },
  data() {
      return {
          keyword: '',
          filter: '',
          selectedProject: {},
      }
  },
  computed: {
    ...mapGetters('mainStore', ['projects']),
    filteredprojects() {
      const filter = this.filter.toLowerCase()
      return this.projects.filter(item => {
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
    getKeyword() {
      this.keyword = this.filterd;
      return this.keyword;
    },
    options() {
      return this.filteredprojects.map(entry => ({
        category: entry.project_category.name,
        title: entry.title,
        description: entry.description,
        start_date: entry.start_date,
        end_date: entry.end_date,
        status: entry.status.name,
        entry
      }))
    }
  },
  methods: {
     newDate(date){
      return new Date(date).getMonth() + ' - ' + new Date(date).getDay();
    },
    ...mapActions('mainStore', ['get', 'delete', 'setCurrentProject']), // check it
    async getprojects() {
      await this.get({
        url: 'projects',
        method: 'GET',
        mutation: 'setProjects',
        data: {},
      })
    },
    triggerDelete(entry) {
      this.selectedProject = entry
      eventBus.$emit('toggle-delete-project', true)
    },
    async deleteProject(entry) {
      const deleted = await this.delete({
        url: `projects/${this.selectedProject.id}`,
        method: 'DELETE',
        data: {}
      })
      if (deleted) {
          this.showAlert('Delete :) .', 'success')
          this.getprojects()
      }

      eventBus.$emit('toggle-delete-project', false)
    },
    openModal() {
      this.setCurrentProject(null)
      eventBus.$emit('toggle-create-project', this.getprojects)
    },
    updateProject(entry) {
      this.setCurrentProject(entry)
      eventBus.$emit('toggle-project-update', this.getprojects)
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
      this.getprojects()
      eventBus.$on('confirm-delete-project', this.deleteProject)
  }
}
</script>
