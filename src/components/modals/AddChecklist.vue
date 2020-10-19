<template>
  <div id="top" @click='$emit("hide3", $event.target)' class="flex items-center w-full transition-all duration-500 ease-out z-20 bg-blur fixed overflow-hidden h-screen" :style="{top, height}">
    <div class="max-w-xs p-6 m-auto bg-white rounded shadow-lg md:w-full font-sans text-left">
      <div class="flex items-center justify-end">
        <div>
            <button @click="$emit('close', $event.target)" class="w-12">
              <icon id="btn" icon='times' />
            </button>
        </div>
      </div>
      <div class="mb-4">
        <label
          class="block mb-2 text-sm font-semibold text-gray-800"
          for="username"
          >{{checklist.Title}}</label
        >
        <input
          class="w-full p-2 px-3 text-sm text-gray-800 bg-gray-200 border rounded focus:bg-white"
          type="text"
          name="projectname"
          placeholder="Checklist"
        />
      </div>

      <div class="flex justify-end mt-8">
        <button
          class="px-4 py-2 mb-4 text-sm font-medium text-gray-800 bg-gray-300 rounded hover:bg-gray-200 focus:outline-none active:outline-none"
          type="submit"
          @click="handleClose"
        >
          Cancel
        </button>
        <button
          class="px-6 py-2 mb-4 ml-4 text-sm font-medium text-white bg-blue-800 rounded hover:bg-blue-700 focus:outline-none active:outline-none"
          type="submit"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['top', 'height'],
  data() {
    return {
      checklist: [
        {
          title: 'title'
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
