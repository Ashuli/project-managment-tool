<template>
  <div class="flex flex-col items-center mt-24 px-4">
    <div class="md:w-9/12 lg:w-9/12">
      <div class="items-center inline-flex py-2 px-4 my-1">
        Dashboard <Button class="ml-2" @click="openModal">Open modal</Button>
      </div>
    </div>
  </div>
</template>

<script>

import Button from '../components/shared/Button/Button.vue'
// import Lists from '../components/Lists/Lists.vue'
export default {
  name: 'Dashboard',
  components: {
    Button,
    // Lists
  }
}
</script>

<style lang="postcss" scoped>
.list {
  @apply flex flex-row rounded-sm bg-white flex-shrink-0;
  box-shadow: rgba(9, 30, 66, 0.05) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
}
.cost {
  @apply text-success;
}
.sep {
  @apply mt-5 border border-backgroundLightest;
}
.stats-wrap {
  margin-bottom: 5px;
}
.stats {
  @apply rounded-sm bg-white  transition-all duration-100 select-none;
  padding: 10px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 2px 0px;
  min-width: 180px;
}
.stats:hover {
  @apply bg-backgroundLight;
}
</style>
