<template>
  <div id="top" @click='$emit("hide2", $event.target)' class="flex items-center w-full transition-all duration-500 ease-out z-20 bg-blur fixed overflow-hidden h-screen" :style="{top, height}">
    <div  class="max-w-md p-8 m-auto bg-white rounded shadow-lg md:w-full font-sans text-left">
      <div class="flex items-center justify-end mb-4">
        <div>
            <button @click="$emit('close', $event.target)" class="w-12">
              <icon id="btn" icon='times' />
            </button>
        </div>
      </div>
      <div class="mb-4">
        <input
          class="w-full p-2 px-3 text-sm text-gray-800 bg-gray-200 border rounded focus:bg-white"
          type="text"
          name="projectname"
          placeholder="Search employees"
        />
      </div>
      <div class="flex mb-4">
        <div class="flex overflow-hidden">
          <h2 class="text-sm font-semibold text-gray-800 uppercase">
            Board Members
          </h2>
        </div>
      </div>
      <div class="flex mb-4 cursor-pointer">
        <div class="flex overflow-hidden">
          <img
            class="object-cover w-6 h-6 rounded-full"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
            alt=""
          />
        </div>

        <div class="w-full ml-4">
          <p class="text-sm text-gray-800">{{members.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['top', 'height'],
  data() {
    return {
      members: [
        {
          name: 'name'
        }
      ]
    }
  }
}
</script>
