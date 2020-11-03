<template>
  <Modal :isOpen="!!component" :title="title" @onClose="handleModalClose" :width="width">
    <component :is="component" @onClose="handleClose" v-bind="props" />
  </Modal>
</template>

<script>
import eventBus from '../../eventBus'

import Modal from './Modal2.vue'

export default {
  props: {
    width: {
      type: Number,
      default: 480,
    },
  },
  data() {
    return {
      component: null,
      title: '',
      props: null,
      closeOnClick: true,
    }
  },
  created() {
    /* eslint-disable object-curly-newline */
    /* eslint-disable comma-dangle */
    eventBus.$on(
      'openModalRoot',
      ({ component, title = '', props = null, closeOnClick = true }) => {
        this.component = component
        this.title = title
        this.props = props
        this.closeOnClick = closeOnClick
      }
    )
    document.addEventListener('keyup', this.handleKeyup)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.handleKeyup)
  },
  methods: {
    handleModalClose(force = false) {
      if (!this.closeOnClick && !force) return
      this.handleClose()
    },
    handleClose(msg) {
      this.component = null
      this.$emit('closeModal', msg)
    },
    handleKeyup(e) {
      if (e.keyCode === 27) this.handleClose()
    },
  },
  components: { Modal },
}
</script>
