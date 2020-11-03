<template>
  <div :style="getLetterStyle" class="letter">
    <span>
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: [String, Number],
      default: '',
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    size: {
        type: Number,
        default: 32
    },
    color: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
      avatarColors: [
        '#DA7657',
        '#6ADA57',
        '#5784DA',
        '#AA57DA',
        '#DA5757',
        '#DA5792',
        '#57DACA',
        '#57A5DA',
      ],
    }
  },
  computed: {
    getColorFromName() {
      return this.avatarColors[
        this.name.toString().toLocaleLowerCase().charCodeAt(0) % this.avatarColors.length
      ]
    },
    getLetterStyle() {
      return {
        background: this.color ? this.color : this.getColorFromName,
        fontSize: `${Math.round(this.size / 3)}px`,
        padding: `2px ${Math.round(this.size / 4)}px`,
        'border-radius': (this.size) + 'px',
        color: '#fff'
      }
    },
  },
}
</script>
