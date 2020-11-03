<template>
  <div>
    <div v-show="mode == 'write'" class="ql">
      <div ref="editorRef"></div>
    </div>
    <div v-if="mode == 'read'" class="ql-snow">
      <div
        @click="enableWriteMode"
        class="content ql-editor"
        v-html="initialValue ? initialValue : 'Add a description'"
      />
    </div>
  </div>
</template>
<script>
import Quill from 'quill'
import { quillConfig } from './editor'

export default {
  props: {
    placeholder: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    defaultValue: {
      type: String,
      default: undefined,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      initialValue: this.value || this.defaultValue,
      editorRef: null,
      quill: null,
    }
  },
  watch: {
    mode: function(from) {
      if (from == 'write') {
        this.quill.setText('')
        this.insertValue(this.quill, this.value)
        this.initialValue = this.value
      }
    },
  },
  methods: {
    initQuill() {
      return new Quill(this.editorRef, {
        placeholder: this.placeholder,
        ...quillConfig,
      })
    },
    enableWriteMode() {
      this.$emit('changeMode', 'write')
    },
    insertValue(quill, value) {
      this.quill.clipboard.dangerouslyPasteHTML(0, value)
      this.quill.blur()
    },
    getHTMLValue() {
      return this.editorRef.querySelector('.ql-editor').innerHTML
    },
    handleContentsChange() {
      this.$emit('input', this.getHTMLValue())
    },
  },
  destroyed() {},
  mounted() {
    this.editorRef = this.$refs.editorRef
    this.quill = this.initQuill()
    this.insertValue(this.quill, this.initialValue)
    this.quill.on('text-change', this.handleContentsChange)
    return () => {
      this.quill.off('text-change', this.handleContentsChange)
      // eslint-disable-next-line
      this.quill = null
    }
  },
}
</script>

<style lang="scss">
.ql {
  .ql-toolbar {
    border-radius: 4px 4px 0px 0px !important;
    border: 1px solid #dfe1e6 !important;
    border-bottom: none !important;
  }
  .ql-container.ql-snow {
    color: #172b4d;
    font-size: 15px;
    border-radius: 0px 0px 4px 4px;
    border: 1px solid #dfe1e6;
    border-top: none;
  }
}
.ql-editor {
  // min-height: 110px;
  font-family: 'CircularStd', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif, 'CircularStd';

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
  }
  img,
  video {
    display: inline-block;
  }
}
.content {
  padding: 0 !important;
  font-size: 15px;
}
</style>
