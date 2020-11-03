<template>
  <transition>
    <div
      class="modal-backdrop"
      v-show="isOpen"
      :class="{ open: isOpen }"
      @click="$emit('onClose')"
    >
      <div
        class="modal-dialog center"
        :style="modalStyles"
        v-show="isOpen"
        :class="{ open: isOpen }"
        @click.stop
      >
        <button class="modal-close" @click="$emit('onClose', false)">
          <svg
            data-v-dacdebd6=""
            style="width: 24px; height: 24px; fill: currentcolor;"
          >
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#times"
            ></use>
          </svg>
        </button>
        <div class="modal-title" v-if="title">{{ title }}</div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    title: String,
    width: {
      type: Number,
      default: 480,
    },
    variant: {
      type: String,
      value: 'center' | 'aside', // eslint-disable-line no-bitwise
      default: 'center',
    },
  },
  data() {
    return {}
  },
  computed: {
    modalStyles() {
      return { '--width': `${this.width}px` }
    },
  },
}
</script>
<style lang="scss">
.modal-dialog {
  // display: inline-block;
  position: relative;
  // width: 100%;
  background: #fff;

  &.center {
    max-height: 100%;
    max-width: var(--width);
    border-radius: 3px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  }
  &.aside {
    min-height: 100vh;
    max-width: var(--width);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  }
}
</style>
