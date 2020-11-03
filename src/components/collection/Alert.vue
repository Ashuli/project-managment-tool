<template>
  <div :class="classes">
    <span :class="iconClasses">
        <Icon :name="icon" />
    </span>
    <span v-html="text"></span>
  </div>
</template>

<script>
import Icon from '@/components/shared/Icon/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      // eslint-disable-next-line no-bitwise
      value: 'error' | 'info' | 'success' | 'warning',
    },
    text: String,
  },
  computed: {
    color() {
      switch (this.type) {
        case 'error':
          return 'red';
        case 'success':
          return 'green';
        case 'warning':
          return 'orange';
        case 'info':
          return 'info';
        default:
          return 'gray';
      }
    },
    icon() {
      switch (this.type) {
        case 'error':
          return 'times';
        case 'success':
          return 'star';
        case 'info':
          return 'info';
        default:
          return '';
      }
    },
    classes() {
      const { color } = this;
      return [`text-${color} rounded relative flex`];
      // bg-red-100 px-4 py-3 rounded relative
    },
    iconClasses() {
      return ['flex rounded-full mr-2 items-center justify-center'];
    },
    iconClass() {
      const { icon } = this;
      return [`${icon}`];
    },
  },
};
</script>
<style scoped>
.bg-green {
    background: #4bc24b;
}
.bg-red {
    background: #f56565;
}
.bg-orange {
    background: #c05621;
}
.bg-gray {
    background: #ddd;
}
.text-teal {
    color: #4bc24b;
}
.text-green {
    color: green;
}
.text-red {
    color: #f56565;
}
.text-orange {
    color: #c05621;
}
.text-gray {
    color: #ddd;
}
/* .text-info {
    color: #222;
} */
.rounded-full {
    border-radius: 9999px!important;
}
.py-2 {
    padding-top: .5rem!important;
    padding-bottom: .5rem!important;
}
.px-2 {
    padding-left: .5rem!important;
    padding-right: .5rem!important;
}
.hw {
  height: 1.25rem;
  width: 1.25rem;
}
</style>
