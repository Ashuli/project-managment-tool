<template>
  <div
    id="top"
    @click="$emit('hide', $event.target)"
    class="flex items-center w-full transition-all duration-500 ease-out z-20 bg-blur fixed overflow-auto h-full"
    :style="{ top, height }"
    @submit.prevent="onUserSubmit"
  >
    <div
      id="top"
      class="max-w-md p-8 m-auto bg-white rounded shadow-lg md:w-full font-sans text-left"
    >
      <div class="flex items-center justify-end">
        <button
          id="btn"
          @click.exact.self="$emit('hide', $event.target)"
          class="w-12"
        >
          <icon icon="times" />
        </button>
      </div>
      <div class="mb-4">
        <label
          class="block mb-2 text-sm font-semibold text-gray-800"
          for="username"
          >Project title</label
        >
        <input
          class="w-full p-2 px-3 text-sm text-gray-800 bg-gray-200 border rounded focus:bg-white"
          type="text"
          name="projectname"
          placeholder="Project name"
          v-model="title"
        />
      </div>
      <div class="mb-4">
        <label
          class="block mb-2 text-sm font-semibold text-gray-800"
          for="username"
          >Project description</label
        >
        <textarea
          class="w-full p-2 px-3 text-sm text-gray-800 bg-gray-200 border rounded resize focus:bg-white"
          placeholder="Project description"
          v-model="description"
        ></textarea>
      </div>
      <div class="w-full">
        <label
          class="block mb-2 text-sm font-medium text-gray-800"
          for="username"
          >Catagory</label
        >
        <div class="relative">
          <select
            class="block w-full mb-4 p-2 px-3 leading-tight text-sm text-gray-800 bg-gray-200 border border-gray-200 rounded appearance-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            @click="getCategory"
            @change="handler($event.target.value, 'project_categories')"
          >
            <option
              :value="category.id"
              v-for="category in project_categories"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-800 pointer-events-none"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex mb-4">
        <div class="w-1/3 mr-2">
          <label
            class="block mb-2 text-sm font-medium text-gray-800 text"
            for="enddate"
            >Start Date</label
          >
          <div class="relative mt-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              class="w-full p-2 px-3 pl-10 pr-4 text-sm text-gray-800 bg-gray-200 border rounded focus:bg-white"
              type="date"
              name="enddate"
              placeholder="Start Date"
              v-model="start_date"
            />
          </div>
        </div>
        <div class="w-1/3 mr-2">
          <label
            class="block mb-2 text-sm font-medium text-gray-800 text"
            for="enddate"
            >End Date</label
          >
          <div class="relative mt-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              class="w-full p-2 px-3 pl-10 pr-4 text-sm text-gray-800 bg-gray-200 border rounded focus:bg-white"
              type="date"
              name="endDate"
              placeholder="End Date"
              v-model="end_date"
            />
          </div>
        </div>
        <div class="w-1/3">
          <label
            class="block mb-2 text-sm font-medium text-gray-800"
            for="username"
            >Status</label
          >
          <div class="relative">
            <select
              class="block w-full p-2 px-3 leading-tight text-sm text-gray-800 bg-gray-200 border border-gray-200 rounded appearance-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              @click="getStatus"
              @change="handler($event.target.value, 'status')"
            >
              <option
                :value="stat.id"
                class="font-sans"
                v-for="stat in status"
                :key="stat.id"
              >
                {{ stat.name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-800 pointer-events-none"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-8">
        <button
          id="btn"
          @click="$emit('hide', $event.target)"
          class="px-4 py-2 mb-4 text-sm font-medium text-gray-800 bg-gray-300 rounded hover:bg-gray-200 focus:outline-none active:outline-none"
          type="submit"
        >
          Cancel
        </button>
        <button
          class="px-6 py-2 mb-4 ml-4 text-sm font-medium text-white bg-blue-800 rounded hover:bg-blue-700 focus:outline-none active:outline-none"
          type="submit"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'addProject',
  data() {
    return {
      status_id: '',
      project_category_id: '',
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      // project_categories: [
      //   {
      //     id: '',
      //     name: ''
      //   },
      //   {
      //     id: '',
      //     name: ''
      //   }
      // ],
      // status: [
      //   {
      //     id: '',
      //     name: '',
      //   },
      //   {
      //     id: '',
      //     name: '',
      //   }
      // ]
    };
  },
  props: ['top', 'height'],
  methods: {
    handler(val, name) {
      this[name].forEach(item => {
        if (name === 'status') {
          if (item.id === parseInt(val)) {
            console.log(item.name);
            this.status_id = item.name
          }
        } else {
          if (item.id === parseInt(val)) {
            console.log(item.name);
            this.project_category_id = item.name
          }
        }
      });
    },
    ...mapActions(['addProject']),
    onUserSubmit() {
     this.addProject({
       title: this.title,
       description: this.description,
       start_date: this.start_date,
       end_date: this.end_date,
       status_id: this.status_id,
       project_category_id: this.project_category_id
     })
    },
    getStatus() {
        this.$store.dispatch('getStatus')
    },
    getCategory() {
        this.$store.dispatch('getCategory')
    }
  },
  computed: {
       ...mapGetters({
      status: 'getStatus',
      project_categories: 'getCategory'
    })
  },
  validations: {
    titile: {
      required
    },
    description: {
      required
    },
    startDate: {
      required
    },
    endDate: {
      required
    },
    project_categories: {
      required
    },
    status: {
      required
    }
}
}

</script>
