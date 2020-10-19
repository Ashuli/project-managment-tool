<template>
  <div class="flex px-6 items-center justify-between py-3 border-b border-gray-200">
    <div class="flex items-center">
      <h3 class="text-lg font-semibold text-gray-900 leading-tight font-sans">
        {{$route.params.title}}
      </h3>
      <div class="flex overflow-hidden ml-6">
        <img
          v-for="img in imgs"
          :key="img"
          class="inline-block h-6 w-6 rounded-full text-white shadow-solid"
          :src="img"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgs: [
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      ]
    };
  }
};
</script>