import Vue from 'vue'
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
Vue.directive('clickOutside', {
  bind: (el, binding, vnode) => {
    el.clickOutsideEvent = event => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
    document.body.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        el.clickOutsideEvent(e)
      }
    })
  },
  unbind: el => {
    document.body.removeEventListener('click', el.clickOutsideEvent)
    document.body.removeEventListener('keydown', el.clickOutsideEvent)
  },
})
