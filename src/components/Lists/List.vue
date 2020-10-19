<template>
  <div class="list items-center w-full my-1">
    <slot v-bind="{ ...entry }" />
  </div>
</template>
<script>
export default {
  props: {
    entry: {
      type: Object,
      default: {}
    },
  },
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
</style>