<template>
  <div class="px-10 py-8">
    <div class="pb-4 text-base font-medium leading-normal text-textDarkest font-sans">
      {{ title }}
    </div>
    <p class="pb-4 whitespace-pre-wrap text-base font-sans">{{ message }}</p>
    <div class="flex pt-3 justify-end">
      <Button @click="handleClose" class="mr-2" variant="empty">Cancel</Button>
      <Button
        :isWorking="isWorking"
        @click="handleConfirmed"
        class="mr-2"
        :variant="variant"
        >{{ confirmText }}</Button>
    </div>
  </div>
</template>
<script>
import Button from '../shared/Button/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: undefined,
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    variant: {
      type: String,
      default: 'primary',
    },
  },
  data() {
    return {
      isWorking: false,
    }
  },
  methods: {
    handleConfirmed() {
      if (this.isWorking) return
      this.isWorking = true
      this.$emit('confirm')
    },
    handleClose() {
      this.$emit('close')
    }
  },
  destroyed() {
    this.isWorking = false
  },
}
</script>