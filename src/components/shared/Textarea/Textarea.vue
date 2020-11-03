<template>
  <textarea
    @input="handleInput"
    @keydown="$emit('keydown', $event)"
    @blur="$emit('blur', $event)"
    :value="value"
    v-bind="$attrs"
    ref="elementRef"
    rows="1"
    class="textarea"
  />
</template>
<script>
export default {
  props: {
    value: {
      default: undefined,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
  },
  mounted() {},
}
</script>

<style lang="postcss" scoped>
.textarea {
  border: 1px solid #ddd;
  background: #F4F5F7;
}
.textarea:hover:not(:focus) {
  background: #F4F5F7;
}
.textarea:focus {
  @apply bg-white;
  border: 1px solid #1b1f3c;
  box-shadow: 0 0 0 1px #1b1f3c;
}
</style>
<style lang="scss" scoped>
.textarea {
  padding: 7px 7px 8px;
  line-height: 1.28;
  resize: vertical;
  box-shadow: transparent 0px 0px 0px 1px;
  transition: background 0.1s ease 0s;
  overflow: auto;
  overflow-y: hidden;
  width: 100%;
  border-radius: 3px;
  appearance: none;
  outline: none;
}
</style>
