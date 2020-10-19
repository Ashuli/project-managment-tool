<template>
  <Snackbar :isOpen="!!component" :title="title" @onClose="handleModalClose">
    <component :is="component" @onClose="handleClose" v-bind="props" />
  </Snackbar>
</template>

<script>
import eventBus from '../../eventBus';

import Snackbar from './Snackbar.vue';

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      component: null,
      title: '',
      props: null,
      closeOnClick: true,
    };
  },
  created() {
    eventBus.$on('open', ({
      component,
      title = '',
      props = null,
      closeOnClick = true,
      duration = 0,
    }) => {
      this.component = component;
      this.title = title;
      this.props = props;
      this.closeOnClick = closeOnClick;
      if (duration) {
        setTimeout(() => {
          this.handleClose();
        }, duration);
      }
    });
    document.addEventListener('keyup', this.handleKeyup);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.handleKeyup);
  },
  methods: {
    handleModalClose(force = false) {
      if (!this.closeOnClick && !force) return;
      this.handleClose();
    },
    handleClose() {
      this.component = null;
    },
    handleKeyup(e) {
      if (e.keyCode === 27) this.handleClose();
    },
  },
};
</script>
