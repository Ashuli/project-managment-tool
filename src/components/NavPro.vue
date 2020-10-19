<template>
  <div class="flex px-6 items-center justify-end py-2  font-sans">
    <div class="flex items-center">
      <button @click="$emit('add-project')"
        class="flex items-center px-2 py-1 text-sm font-normal text-gray-200 bg-gray-800 rounded hover:bg-gray-700"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path fill="fff" d="M0 oh24v24H0z" />
          <path
            d="M12 7v10m5-5H7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        Add new project
      </button>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
