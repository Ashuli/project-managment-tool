<template>
  <div
    :class="$route.path.includes('task') ? 'flex-col' : 'flex'"
    class="text-left font-sans w-full cursor-pointer"
    @click='handler(status, card.title)'
  >
    <div
      :key="card.id"
      :style="{
        width,
        boxShadow: '-4px 0 0 ' + card.color,
        borderTopLeftRadius: '0.25rem 10px',
        borderBottomLeftRadius: '0.25rem 10px',
      }"
      class="rounded-l"
      :class="$route.path == '/boards' ? 'ml-5' : 'mb-4'"
    >
      <!-- @click="$router.push('/task/' + card.id + '/' + card.title)" -->
      <a
        :style="{ borderColor: card.color }"
        class="block p-4 bg-white rounded-md shadow"
      >
        <div v-if="card.title" class="flex justify-between mb-2">
          <h2 class="font-bold text-gray-800 text-normal">{{ card.title }}</h2>
        </div>
        <div class="flex">
          <p class="text-sm font-normal text-gray-800">
            {{ card.description }}
          </p>
          <img
            v-if="card.title == undefined"
            class="w-6 h-6 ml-3 rounded-full"
            :src="card.img"
            alt=""
          />
        </div>
        <div class="flex justify-between mt-3">
          <div class="flex items-center justify-between text-xs text-gray-500">
            <div>{{ card.start_date }}</div>
            <div class="mx-1 text-sm font-bold">-</div>
            <div>{{ card.end_date }}</div>
          </div>
          <div
            class="flex items-center px-2 text-xs font-normal bg-green-200 rounded"
          >
            {{ card.category.name }}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  data() {
    return {
      clicked: ''
    };
  },
  props: ['card', 'width', 'status'],
  methods: {
    handler(stat, title) {
      // console.log(stat, title);
      this.$emit('update-task', stat, title);
    }
  }
};
</script>
