<template>
  <div id='top' @click='$emit("hide", $event.target)' class="w-full transition-all duration-500 ease-out z-20 bg-blur fixed overflow-scroll" :style="{top, height}">
    <div id='top' class="flex h-screen bg-transparent">
      <div class="max-w-2xl p-8 m-auto bg-white rounded shadow-lg md:w-full font-sans text-left">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div class="ml-6">
              <h3 class="block text-lg font-semibold text-gray-800">
                {{title}}
              </h3>
              <p class="text-sm text-gray-600">in listing <u>{{status}}</u></p>
            </div>
          </div>
          <div>
            <button id='btn' @click.exact.self="$emit('hide', $event.target)" class="w-12">
              <icon icon='times' />
            </button>
          </div>
        </div>
        <div class="flex justify-between">
          <!-- w-4/6 mr-8 -->
          <div>
            <div class="flex mt-6 mb-4">
              <svg
                class="w-6 h-6 text-gray-700"
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
              <div class="w-full ml-6">
                <label
                  class="mb-2 text-sm font-medium text-gray-800"
                  for="username"
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
                    v-model="startDate"
                    class="w-full p-2 px-3 pl-10 pr-4 text-sm text-gray-800 bg-gray-200 border rounded focus:bg-white"
                    type="date"
                    name="enddate"
                    placeholder="End Date"
                  />
                </div>
              </div>
              <div class="w-full ml-6">
                <label
                  class="mb-2 text-sm font-medium text-gray-800"
                  for="username"
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
                    v-model="endDate"
                    class="w-full p-2 px-3 pl-10 pr-4 text-sm text-gray-800 bg-gray-200 border rounded focus:bg-white"
                    type="date"
                    name="enddate"
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>
            <div class="flex mt-6 mb-4">
              <svg
                class="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <div class="w-full ml-6">
                <label class="text-sm font-medium text-gray-800" for="username"
                  >Description</label
                >
                <textarea
                  v-model="description"
                  class="w-full p-2 px-3 mt-2 text-sm text-gray-800 bg-gray-200 border rounded resize focus:bg-white"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
            <div class="flex mt-6 mb-2">
              <svg
                class="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <div class="w-full ml-6">
                <label class="text-sm font-medium text-gray-800" for="username"
                  >Activity</label
                >
              </div>
            </div>
            <div class="flex mb-4">
              <div class="flex items-center overflow-hidden">
                <img
                  class="object-cover w-6 h-6 mr-6 rounded-full"
                  :src='usrImg'
                  alt=""
                />
              </div>
              <div class="w-full">
                <input
                  class="w-full p-2 px-3 mt-2 text-sm text-gray-800 bg-white border-2 border-gray-200 rounded focus:bg-white"
                  type="text"
                  name="comment"
                  placeholder="Write comment ..."
                  v-model="comment"
                />
              </div>
            </div>
            <div v-for="comment in comments" :key="comment.img" class="flex mb-4">
              <div class="flex overflow-hidden">
                <img
                  class="object-cover w-6 h-6 mr-6 rounded-full"
                  :src='comment.img'
                  alt=""
                />
              </div>
              <div>
                <div v-for="feadback in comment.feadbacks" :key="feadback" class="w-full">
                <p class="text-sm text-gray-800">
                  <b>{{comment.username}}</b>&nbsp;{{feadback}}
                </p>
                <!-- <small class="text-gray-500">{{ date }}, {{time}}</small> -->
              </div>
              </div>
            </div>
          </div>
          <!-- w-2/6 ml-8 mt-20 -->
          <div class="mt-12">
            <div>
              <button
                class="flex items-center w-32 h-8 px-2 py-1 text-sm font-normal text-gray-800 bg-gray-200 rounded hover:bg-gray-100"
                @click="$emit('add-members')"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Members
              </button>
            </div>
            <div class="mt-2">
              <button
                class="flex items-center w-32 h-8 px-2 py-1 text-sm font-normal text-gray-800 bg-gray-200 rounded hover:bg-gray-100"
              >
                <svg class="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Labels</span>
              </button>
            </div>
            <div class="mt-2">
              <button
                class="flex items-center w-32 h-8 px-2 py-1 text-sm font-normal text-gray-800 bg-gray-200 rounded hover:bg-gray-100"
                @click="$emit('add-checklist')"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Checklist
              </button>
            </div>
            <div class="mt-2">
              <button
                class="flex items-center w-32 h-8 px-2 py-1 text-sm font-normal text-gray-800 bg-gray-200 rounded hover:bg-gray-100"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <span>Attachement</span>
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-8">
          <button
            id='btn'
            @click="$emit('hide', $event.target)"
            class="px-4 py-2 mb-4 text-sm font-medium text-gray-800 bg-gray-300 rounded hover:bg-gray-200 focus:outline-none active:outline-none"
            type="submit"
          >
            Cancel
          </button>
          <button
            @click="addTask"
            class="px-6 py-2 mb-4 ml-4 text-sm font-medium text-white bg-blue-800 rounded hover:bg-blue-700 focus:outline-none active:outline-none"
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      time: '',
      id: 2,
      startDate: '',
      endDate: '',
      description: '',
      usrImg: 'img/7.jpg',
      comment: '',
      comments: [
        {
          feadbacks: [
            'This task is moved to backlg',
            'Add job category tods tasks and boards'
          ],
          img: '/img/7.jpg',
          username: 'Mark',
        }
      ]
    };
  },
  methods: {
    addTask() {
      this.$emit('addTask', { 
                id: this.id++,
                description: 'Add job category tods tasks and boards',
                img: '/img/7.jpg',
                startDate: 'Sep 14',
                endDate: 'Sep 19',
                category: 'New Feature',
                status: false,
                color: '#f56565'
            })
    }
  },
  props: ['top', 'height', 'title', 'status']
}

</script>
<style scoped>
  
</style>
