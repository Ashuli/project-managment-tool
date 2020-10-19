<template>
  <div class="p-3 bg-gray-100 rounded-md text-left font-sans flex-wrap" style="width: 20rem; overflow: hidden;">
    <div @click="$router.push('/task/' + card.title)" href="" class="p-4 bg-white rounded-md shadow flex flex-col justify-around" style="min-height: 7rem;">
      <div class="flex justify-between mb-2" style='min-height: 3rem'>
        <h2 class="font-bold text-gray-800 text-normal">{{card.title}}</h2>
        <!-- <img
          class="w-6 h-6 ml-3 rounded-full"
          :src='card.img'
          alt=""
        /> -->
        <div
          class="flex self-start items-center px-2 text-xs font-normal bg-green-200 rounded"
        >
          {{card.project_category.name}}
        </div>
      </div>
      <div>
        <p class="text-sm font-normal text-gray-800">
          {{card.description}}
        </p>
      </div>
      <div class="flex justify-between mt-3">
        <div class="flex items-center justify-between text-xs text-gray-500">
          <div>{{card.start_date}}</div>
          <div class="mx-1 text-sm font-bold">-</div>
          <div>{{card.end_date}}</div>
        </div>
        <div class="flex items-center justify-between">
          <span>
            <svg
              class="w-2 h-2 mr-1 text-green-600"
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <circle cx="4" cy="4" r="3"></circle>
            </svg>
          </span>
          <span class="text-xs font-normal text-gray-700">{{card.status.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card']
}
</script>