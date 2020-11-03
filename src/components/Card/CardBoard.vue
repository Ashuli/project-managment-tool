<template>
  <div
    class="p-3 rounded-md text-left font-sans cursor-pointer"
    style="width: 20rem; overflow: hidden"
  >
    <div
      @click="$router.push('/task/' + card.title)"
      class="p-4 bg-white rounded-md shadow flex flex-col justify-around"
    >
      <div class="w-full flex justify-between">
        <div class="flex mb-2" style="min-height: 1rem">
          <h2 class="font-bold text-gray-800 text-normal">{{ card.title }}</h2>
        </div>
        <div class="flex">
          <div class="relative py-1" @click.stop="updateProject">
            <Icon :size="22" name="edit" class="text-textLight"></Icon>
          </div>
          <div class="relative py-1" @click.stop="deleteProject">
            <Icon :size="22" name="trash" class="text-textLight"></Icon>
          </div>
        </div>
      </div>
      <div>
        <p class="text-sm font-normal text-gray-800">
          {{ card.description }}
        </p>
      </div>
      <div class="flex justify-between mt-3">
        <div class="flex items-center justify-between text-xs text-gray-500">
          <div>{{ card.start_date }}</div>
          <div class="mx-1 text-sm font-bold">-</div>
          <div>{{ card.end_date }}</div>
        </div>
        <div
          class="flex self-start items-center px-2 text-xs font-normal bg-green-200 rounded"
        >
          {{ card.project_category.name }}
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
          <span class="text-xs font-normal text-gray-700">{{
            card.status.name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../shared/Icon/Icon.vue";
// import eventBus from '../../eventBus'
export default {
  components: {
    Icon,
  },
  props: ['card'],
  methods: {
    updateProject() {
      this.$emit('updateProject', this.card)
    },
    deleteProject() {
      this.$emit('deleteProject', this.card)
    }
  }
}
</script>
<style>