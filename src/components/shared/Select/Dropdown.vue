<template>
  <div class="dropdown" :style="{ width: `${dropdownWidth}px` }">
    <input
      v-if="searchable"
      class="dropdownInput"
      type="text"
      ref="inputRef"
      placeholder="Search"
      @input="handleSearchValueChange"
      @keydown="handleInputKeyDown"
    />

    <div class="options" ref="optionsRef">
      <div
        class="option text-textDarkest"
        v-for="option in filteredOptions"
        :key="option.value"
        :data-select-option-value="option.value"
        :data-testid="`select-option:${option.label}`"
        @mouseenter="handleOptionMouseEnter"
        @click="selectOptionValue(option.value)"
      >
        <slot name="option" v-bind="option">{{ option.label }}</slot>
      </div>

      <div
        v-if="isOptionCreatable"
        class="option text-textDarkest"
        :data-create-option-label="{ searchValue }"
        @mouseenter="handleOptionMouseEnter"
        @click="createOption(searchValue)"
      >
        {{ `Create "${searchValue}"` }}
      </div>
    </div>

    <div v-if="filteredOptions.length === 0" class="optionsNoResults">
      No results
    </div>
  </div>
</template>
<script>
const activeOptionClass = 'select-option-is-active'

export default {
  name: 'Dropdown',
  props: {
    searchable: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Array, String, Number],
      default: undefined,
    },
    isValueEmpty: {
      type: Boolean,
      required: true,
    },
    dropdownWidth: {
      type: Number,
      default: undefined,
    },
    searchValue: {
      type: String,
      required: true,
    },
    deactivateDropdown: {
      type: Function,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    onCreate: {
      type: Function,
      default: undefined,
    },
    isMulti: {
      type: Boolean,
      required: true,
    },
    withClearValue: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    /* eslint-disable operator-linebreak */
    /* eslint-disable arrow-parens */
    /* eslint-disable implicit-arrow-linebreak */
    /* eslint-disable function-paren-newline */
    /* eslint-disable comma-dangle */
    isOptionCreatable() {
      return (
        this.onCreate &&
        this.searchValue &&
        !this.options.map(option => option.label).includes(this.searchValue)
      )
    },
    optionsFilteredBySearchValue() {
      return this.options.filter(option =>
        option.label
          .toString()
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      )
    },
    filteredOptions() {
      return this.optionsFilteredBySearchValue.filter(
        option => this.value !== option
      )
    },
  },
  mounted() {
    this.setFirstOptionAsActive()
  },
  methods: {
    handleSearchValueChange(event) {
      this.$emit('searchValueChange', event.target.value)
    },
    handleInputKeyDown(event) {
      if (event.keyCode === 27) {
        this.handleInputEscapeKeyDown(event)
      } else if (event.keyCode === 13) {
        this.handleInputEnterKeyDown(event)
      } else if (event.keyCode === 40 || event.keyCode === 38) {
        this.handleInputArrowUpOrDownKeyDown(event)
      }
    },
    async handleInputArrowUpOrDownKeyDown(event) {
      const $active = await this.getActiveOptionNode()
      const $options = this.$refs.optionsRef.value
      if (!$active || !$options) return

      const $optionsHeight = $options.getBoundingClientRect().height
      const $activeHeight = $active.getBoundingClientRect().height

      if (event.keyCode === 40) {
        if ($options.lastElementChild === $active) {
          $active.classList.remove(activeOptionClass)
          $options.firstElementChild.classList.add(activeOptionClass)
          $options.scrollTop = 0
        } else {
          $active.classList.remove(activeOptionClass)
          $active.nextElementSibling.classList.add(activeOptionClass)
          if ($active.offsetTop > $options.scrollTop + $optionsHeight / 1.4) {
            $options.scrollTop += $activeHeight
          }
        }
      } else if (event.keyCode === 38) {
        if ($options.firstElementChild === $active) {
          $active.classList.remove(activeOptionClass)
          $options.lastElementChild.classList.add(activeOptionClass)
          $options.scrollTop = $options.scrollHeight
        } else {
          $active.classList.remove(activeOptionClass)
          $active.previousElementSibling.classList.add(activeOptionClass)
          if ($active.offsetTop < $options.scrollTop + $optionsHeight / 2.4) {
            $options.scrollTop -= $activeHeight
          }
        }
      }
    },
    async getActiveOptionNode() {
      await this.$root.$nextTick()
      return this.$refs.optionsRef
        ? this.$refs.optionsRef.querySelector(`.${activeOptionClass}`)
        : null
    },
    async handleInputEnterKeyDown(event) {
      event.preventDefault()

      const $active = await this.getActiveOptionNode()
      if (!$active) return

      const optionValueToSelect = $active.getAttribute(
        'data-select-option-value'
      )
      const optionLabelToCreate = $active.getAttribute(
        'data-create-option-label'
      )

      if (optionValueToSelect) {
        this.selectOptionValue(optionValueToSelect)
      } else if (optionLabelToCreate) {
        this.createOption(optionLabelToCreate)
      }
    },
    handleInputEscapeKeyDown(event) {
      event.stopImmediatePropagation()
      this.deactivateDropdown()
    },
    createOption(newOptionLabel) {
      this.isCreatingOption = true
      this.onCreate(newOptionLabel, createdOptionValue => {
        this.isCreatingOption = false
        this.selectOptionValue(createdOptionValue)
      })
    },
    async handleOptionMouseEnter(event) {
      const $active = await this.getActiveOptionNode()
      if ($active) $active.classList.remove(activeOptionClass)
      event.currentTarget.classList.add(activeOptionClass)
    },
    async setFirstOptionAsActive() {
      const $active = await this.getActiveOptionNode()
      if (!this.$refs.optionsRef) return
      if ($active) $active.classList.remove(activeOptionClass)

      if (this.$refs.optionsRef.firstElementChild) {
        this.$refs.optionsRef.firstElementChild.classList.add(activeOptionClass)
      }
    },
    selectOptionValue(optionValue) {
      if (this.isMulti) {
        this.$emit('change', [...new Set([...this.value, optionValue])])
      } else {
        this.deactivateDropdown()
        this.$emit('change', optionValue)
      }
    },
  },
}
</script>
<style lang="scss">
.dropdown {
  z-index: 101;
  // position: absolute !important;
  //   top: calc(100% + 4px);
  left: -1px;
  border-radius: 0 0 4px 4px;
  background: #fff;
  // box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    // rgba(9, 30, 66, 0.31) 0px 0px 1px;
  width: 100%;
}

.dropdownInput {
  padding: 10px 14px 8px;
  width: 100%;
  border: none;
  color: #172b4d;
  background: none;
  &:focus {
    outline: none;
  }
}

.options {
  padding: 5px 0;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  // &::-webkit-scrollbar {
  //   width: 7px;
  // }
  // &::-webkit-scrollbar-track {
  //   background: none;
  // }
  // &::-webkit-scrollbar-thumb {
  //   // border-radius: 99px;
  //   background: #d1d1d1;
  // }
}

.option {
  padding: 8px 14px;
  word-break: break-word;
  cursor: pointer;
  &.select-option-is-active {
    background: #e8ecee;
  }
}

.optionsNoResults {
  padding: 0px 15px 10px;
  color: #8993a4;
}
</style>
