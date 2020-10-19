<template>
  <div class="flex justify-evenly">
    <div
      class="flex-shrink-0 p-3 bg-gray-100 rounded-md mr-3 font-sans h-screen"
      style="width: 20rem"
      v-for="(col, index) in status" :key='col'
    >
      <h3 class="text-sm font-medium text-gray-900 text-left">{{col}}</h3>
        <div>
          <ul ref='ul' class="mt-2 flex flex-col">
            <li v-for="task in filter(col)" :key="task.id">
              <card-task @update-task='(title, status) => $emit("update-task", title, status)' :status='col' width='100%' :card='task' />
            </li>
          </ul>
        </div>
      <div v-if="index === 0" class="mt-2 mb-2 flex flex-col">
        <div class="w-full flex items-center">
          <button
            class="flex items-center self-start px-4 py-1 block rounded bg-white text-sm leading-snug font-normal text-gray-900"
            @click="$emit('show')"
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
</template>
<script>
import CardTask from '@/components/shared/Card/CardTask.vue'
export default {
  props: ['tasks', 'status'],
  data() {
    return {
      clicked: '',
      title: ''
    };
  },
  components: {
    CardTask
  },
  methods: {
    filter(name) {
      return this.tasks.filter(task => {
        return task.status.name === name;
      });
    },
    addNewCard() {

    }    
  }
}
</script>
