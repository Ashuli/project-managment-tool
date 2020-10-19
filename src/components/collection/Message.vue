<template>
  <div
    class="alert py-2 rounded"
    v-if="message"
    :class="{ 'text-success': success, 'text-primary': !success }"
    role="alert"
    v-html="text"
  ></div>
</template>
<script>
export default {
  props: {
    success: {
      type: Boolean,
      default: false
    },
    message: {
      type: [Object, Array, String]
    }
  },
  data() {
    return {
      text: ''
    }
  },
  watch: {
    message: function(msg) {
      if (typeof msg === 'object') {
        msg.forEach(item => {
          this.text += item.message + ' <br/>'
        })
      } else {
        this.text = msg
      }
    }
  },
};
</script>

<style lang="scss" scoped>

</style>