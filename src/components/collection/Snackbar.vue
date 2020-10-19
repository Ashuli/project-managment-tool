<template>
  <transition name="fade">
    <div class="snackbar modal-backdrop"
      v-show="isOpen"
      :class="{ open: isOpen }"
      @click="$emit('onClose')">
    <div class="modal-dialog" v-show="isOpen" :class="{open: isOpen}" @click.stop>
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
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter .modal-dialog, .fade-leave-to .modal-dialog {
  transform: translateY(-20%);
}

.snackbar.modal-backdrop {
    background: rgba(250, 250, 250, 0.8);
    position: fixed;
    top: initial;
    bottom: 2rem;
    left: 2rem;
    width: 24rem;
    height: initial;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    opacity: 1;
}

.snackbar .modal-dialog {
  width: 30rem;
  background: rgb(255, 255, 255);
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;
  transition: 0.5s;
  position: relative;
  margin: 0;
}

.snackbar .modal-close {
  background: none;
  border: none;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  outline: none;
  height: 1.2rem;
  width: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.snackbar .modal-close svg {
  fill: rgb(150, 150, 150);
}

.snackbar .modal-close svg:hover {
  fill: rgb(100, 100, 100);
}

.snackbar .modal-title {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: rgb(100, 100, 100);
}

.snackbar .modal-body {
  color: rgb(180, 180, 180);
  padding: 0;
}
</style>
