<template>
  <div class="h-screen overflow-hidden">
    <create-task @show="show" :title='title' :status='statuss' @hide='hide' :top="top" :height='height' />
    <!-- <add-members />
    <add-checklist /> -->
    <nav-bar @value='(val) => keyword = val' />
    <div class="flex-shrink-0 border-b-4 bg-white border-gray-200">
    <nav-task style="border-bottom: 2px solid #edf2f7; border-top: 2px solid #edf2f7;" />
    </div>
    <div class="h-screen flex">
      <div class="flex-1 min-w-0 flex flex-col bg-white">
        <div class="flex-1 overflow-auto">
          <main class="inline-flex p-3">
            <task-status @show='show' @update-task='handler' :status='status' :tasks='searchTask()' />
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

import NavBar from '@/components/shared/NavBar/NavBar.vue'
import NavTask from '@/components/NavTask.vue'
import TaskStatus from '@/components/shared/Status/TaskStatus.vue'
import CreateTask from '@/components/modals/CreateTask.vue'

export default {
  name: 'Task',
  components: {
    NavBar,
    NavTask,
    TaskStatus,
    CreateTask
  },
  data() {
    return {
      title: '',
      statuss: '',
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
          startDate: 'Sep 14',
          endDate: 'Sep 19',
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
          startDate: 'Sep 14',
          endDate: 'Sep 19',
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
          startDate: 'Sep 14',
          endDate: 'Sep 19',
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
          startDate: 'Sep 14',
          endDate: 'Sep 19',
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
          startDate: 'Sep 14',
          endDate: 'Sep 19',
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
          startDate: 'Sep 14',
          endDate: 'Sep 19',
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
          startDate: 'Sep 14',
          endDate: 'Sep 19',
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
    getKeyword() {
      return this.keyword;
    }
  },
  methods: {
    show(el) {
      console.log(el);
      this.top = 0;
      this.height = '100vh';
      return false;
    },
    hide(el) {
      // console.log(el.id);
      if (el.id === 'top' || el.id === 'btn') {
          this.top = '-100%';
          this.height = 0;
        }
    },
    handler(title, status) {
      // console.log(title, status);
      this.title = status;
      this.statuss = title;
      this.top = 0;
      this.height = '100vh';
    }
  },
  inject: ['searchTask']
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