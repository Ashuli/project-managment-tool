<template>
  <div class="h-screen overflow-hidden">
    <!-- <create-task @show="show" :title='title' :status='statuss' @hide='hide' :top="top" :height='height' /> -->
    <!-- <add-members />
    <add-checklist /> -->
    <!-- <nav-bar @value='(val) => keyword = val' /> -->
    <div class="flex-shrink-0 border-b-4 bg-white border-gray-200">
    <nav-task style="border-bottom: 2px solid #edf2f7; border-top: 2px solid #edf2f7;" />
    </div>
    <div class="h-screen flex">
      <div class="flex-1 min-w-0 flex flex-col bg-white">
        <div class="flex-1 overflow-auto">
          <main class="inline-flex p-3">
            <!-- <task-status @show='show' @update-task='handler' :status='status' :tasks='searchTask()' /> -->
            <div class="flex justify-evenly">
              <div
                class="flex-shrink-0 p-3 bg-gray-100 rounded-md mr-3 font-sans h-screen"
                style="width: 20rem"
                v-for="(col, index) in status" :key='col'
              >
                <h3 class="text-sm font-medium text-gray-900 text-left">{{col}}</h3>
                  <div>
                    <ul ref='ul' class="mt-2 flex flex-col">
                      <li v-for="task in filterr(col)" :key="task.id">
                        <card-task :status='col' width='100%' :card='task' />
                      </li>
                    </ul>
                  </div>
                <div v-if="index === 0" class="mt-2 mb-2 flex flex-col">
                  <div class="w-full flex items-center">
                    <button
                      class="w-full flex items-center self-start px-4 py-1 block rounded bg-white text-sm leading-snug font-normal text-gray-900"
                      @click="openModal"
                    >
                      <span>
                        <svg
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </span>
                      Add new task
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-shrink-0 ml-3">
              <a
                href=""
                class="flex items-center px-4 py-1 rounded text-sm leading-snug font-normal bg-gray-100 text-gray-900 font-sans"
              >
                <span>
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </span>
                Add new column
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import eventBus from '../eventBus'
import Alert from '../components/collection/Alert.vue'
import NavTask from '@/components/NavTask.vue'
import CardTask from '@/components/Card/CardTask.vue';
export default {
  name: 'Task',
  props: ['filterd'],
  inject: ['searchTask'],
  components: {
    NavTask,
    CardTask
  },
  data() {
    return {
      filter: '',
      selectedTask: {},
      title: '',
      // statuss: '',
      keyword: '',
      top: '-100%',
      height: 0,
      status: ['backlog', 'in progress', 'review', 'done'],
      tasks: [
        {
          id: 6,
          description: 'Add job category tods tasks and boards',
          img: '/img/7.jpg',
          title: 'Title',
          start_date: 'Sep 14',
          end_date: 'Sep 19',
          category: {
            name: 'New d'
          },
          color: '#d4ac0d',
          status: {
            id: 6,
            name: 'done'
          }
        },
        {
          id: 12,
          description: 'Add job category tods tasks and boards',
          img: '/img/7.jpg',
          title: 'Title',
          start_date: 'Sep 14',
          end_date: 'Sep 19',
          category: {
            name: 'New b'
          },
          color: '#f7dc6f',
          status: {
            status_id: 12,
            name: 'backlog'
          }
        },
        {
          id: 13,
          description: 'Add job category tods tasks and boards',
          img: '/img/7.jpg',
          title: 'Title',
          start_date: 'Sep 14',
          end_date: 'Sep 19',
          category: {
            name: 'New b'
          },
          color: '#c39bd3',
          status: {
            id: 13,
            name: 'backlog'
          }
        },
        {
          id: 2,
          description: 'Add job category tods tasks and boards',
          img: '/img/7.jpg',
          title: 'Title',
          start_date: 'Sep 14',
          end_date: 'Sep 19',
          category: {
            name: 'New i'
          },
          color: '#85c1e9 ',
          status: {
            id: 2,
            name: 'in progress'
          }
        },
        {
          id: 3,
          description: 'Add job category tods tasks and boards',
          img: '/img/7.jpg',
          title: 'Title',
          start_date: 'Sep 14',
          end_date: 'Sep 19',
          category: {
            name: 'New i'
          },
          color: '#48c9b0 ',
          status: {
            id: 3,
            name: 'backlog'
          }
        },
        {
          id: 4,
          description: 'Add job category tods tasks and boards',
          img: '/img/7.jpg',
          title: 'Title',
          start_date: 'Sep 14',
          end_date: 'Sep 19',
          category: {
            name: 'New r'
          },
          color: '#dc7633',
          status: {
            id: 4,
            name: 'in progress'
          }
        },
        {
          id: 5,
          description: 'Add job category tods tasks and boards',
          img: '/img/7.jpg',
          title: 'Title',
          start_date: 'Sep 14',
          end_date: 'Sep 19',
          category: {
            name: 'New r'
          },
          color: '#212f3d',
          status: {
            id: 5,
            name: 'review'
          }
        },
      ]
    }
  },
  computed: {
    // ...mapGetters('mainStore'),
    filteredStatuses() {
      const filter = this.filter.toLowerCase()
      return this.tasks.filter(item => {
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
    // options() {
    //   return this.filteredTasks.map(entry => ({
    //     id: entry.id,
    //     name: entry.name,
    //     type: entry.type,
    //     order: entry.order,
    //     status: entry.status,
    //     // handlers: [
    //     //   {
    //     //     name: 'update',
    //     //     icon: 'edit',
    //     //     title: 'Edit'
    //     //   },
    //     //   {
    //     //     name: 'delete',
    //     //     icon: 'trash',
    //     //     title: 'Delete'
    //     //   }
    //     // ],
    //     entry
    //   }))
    // }
  },
  methods: {
    filterr(name) {
      return this.searchTask().filter(task => {
        return task.status.name === name;
      });
    },
    ...mapActions('mainStore', ['get', 'delete', 'setCurrentTask']),
    async getTasks() {
      await this.get({
        url: 'tasks',
        method: 'GET',
        mutation: 'setTasks',
        data: {},
      })
    },
    triggerDelete(entry) {
      this.selectedTask = entry
      eventBus.$emit('toggle-status-delete', true)
    },
    async deleteTask(entry) {
      const deleted = await this.delete({
        url: `tasks/${this.selectedTask.id}`,
        method: 'DELETE',
        data: {}
      })
      if (deleted) {
          this.showAlert('Delete :) .', 'success')
          this.getTasks()
      }

      eventBus.$emit('toggle-delete-task', false)
    },
    updateStatus(entry) {
      this.setCurrentTask(entry)
      eventBus.$emit('toggle-task-update', this.getTasks)
    },
    openModal() {
      this.setCurrentTask(null)
      eventBus.$emit('toggle-create-task', this.getTasks)
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
      this.getTasks()
      eventBus.$on('confirm-delete-task', this.deleteTask)
  }
 }
</script>
<style>
  .placeholder {
    background: rgba(33, 33, 33, 0.08);
    border-radius: .4rem;
    transform: scaleY(0.08);
    transform-origin: 0%, 0%;
  }
</style>