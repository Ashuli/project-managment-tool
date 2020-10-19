<template>
  <button
    type="button"
    v-bind="$attrs"
    v-on="$listeners"
    :class="[variant, { iconOnly: !$slots.default }, { isActive }]"
    class="button inline-flex items-center justify-center h-8 align-middle
    leading-none whitespace-no-wrap rounded-sm transition-all pl-2
    duration-100 appearance-none cursor-pointer select-none px-3"
    :disabled="disabled"
    :style="getButtonStyles"
  >
  <!-- disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none -->
    <!-- <Icon
      v-if="isWorking"
      :size="iconSize"
      name="spin"
      class="spinner"
    />
    <Icon v-if="!isWorking && icon" :size="iconSize" :name="icon" /> -->

    <div v-if="$slots.default" :class="{ 'pl-2': isWorking || icon }">
      <slot />
    </div>
  </button>
</template>

<script>
import { buttonVariants, tuneColor } from '@/utils'
// import Icon from '../Icon/Icon.vue'

export default {
  components: {
  },
  props: {
    className: {
      type: String,
      default: undefined,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconSize: {
      type: Number,
      default: 18,
    },
    disabled: {
      tpye: Boolean,
      default: false,
    },
    isWorking: {
      tpye: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getButtonStyles() {
      const color = buttonVariants[this.variant]
      return {
        '--bg-variant': color,
        '--bg-variant-dark': tuneColor.darken(color, 0.1),
        '--bg-variant-light': tuneColor.lighten(color, 0.15),
        '--primary': buttonVariants.primary,
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
/* .secondary {
  @apply font-normal;
} */
</style>
<style lang="postcss" scoped>
.button {
  @apply inline-flex items-center justify-center h-8 align-middle leading-none whitespace-no-wrap rounded-sm transition-all duration-100 appearance-none cursor-pointer select-none px-3;
  font-size: 14.5px;
  &.iconOnly {
    @apply px-2;
  }
}

.secondary,
.empty {
  @apply text-textDark font-normal;
}
.secondary:not(:disabled):hover,
.empty:not(:disabled):hover {
  @apply bg-backgroundLight;
}
.secondary:not(:disabled):active,
.empty:not(:disabled):active {
  @apply bg-backgroundLightPrimary;
  color: var(--primary);
}

.button:disabled {
  @apply opacity-50 cursor-default pointer-events-none;
}

.withPadding {
  @apply pl-2;
}

.isActive {
  @apply text-primary;
}
</style>

<style lang="scss" scoped>
.primary,
.success,
.danger,
.info,
.warning {
  color: white;
  font-weight: 500;
  background: var(--bg-variant);
  &:not(:disabled) {
    &:hover {
      background: var(--bg-variant-light);
    }
    &:active {
      background: var(--bg-variant-dark);
    }
    &.active {
      background: var(--bg-variant-dark) !important;
    }
  }
  &:focus,
  &:active {
    outline: none;
    box-shadow: 0 0 0 2px var(--bg-variant);
  }
}

.secondary {
  background: var(--bg-variant);
}
.empty {
  background: #fff; // #fff
  outline: none;
  &:focus,
  &:active {
    outline: none;
  }
}
.transparent {
  background: #e2e8f0; // #fff
  outline: none;
  &:focus,
  &:active {
    outline: none;
  }
}
</style>
