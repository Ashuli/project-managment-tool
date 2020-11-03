<template>
  <div ref="rootRef" class="scrollOverlay" >
    <div :class="['clickableOverlay', variant]">
      <div ref="modalRef" :style="modalStyles" :class="['modal', variant]">
        <component
          @close="handleClose"
          @confirm="$emit('confirm')"
          v-bind="componentProps"
          :is="component"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { useOutsideClick } from '../../hooks/useOutsideClick';
// const ModalVariant = 'center' | 'aside'

export default {
  props: {
    variant: {
      type: String,
      default: 'center',
    },
    width: {
      type: Number,
      default: 600
    },
    component: {
      type: [Object, String],
      required: true
    },
    componentProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
      return {}
  },
  computed: {
      modalStyles() {
          return { '--width': `${this.width}px` };
      }
  },
  methods: {
    handleClose(type) {
      this.$emit('close', type)
    },
    handleModalClose(e) {
        this.$emit('close', e)
    },
    handleConfirm() {
        this.$emit('confirm')
    }
  },
  destroyed() {
      document.body.style.overflow = 'visible'
  },
  mounted() {
      useOutsideClick(this.$refs.rootRef, this.$refs.modalRef, this.handleModalClose)
      document.body.style.overflow = 'hidden'
  }
}
</script>

<style lang="scss">
.scrollOverlay {
  z-index: 10001;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.clickableOverlay {
  min-height: 100%;
  background: rgba(9, 30, 66, 0.54);
  overflow-y: auto;
  &.center {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
  }
}

.modal {
  display: inline-block;
  position: relative;
  width: 100%;
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
    float: right; // Added(Customized) later
  }
}
</style>
