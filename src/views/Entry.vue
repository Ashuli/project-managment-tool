<template>
  <div class="wrapper h-screen bg-gray-100">
    <div class="main-header">
      <Header :search='$route.path.includes("/p") || $route.path.includes("/task/")? true : false ' />
    </div>
    <div class="main-panel">
      <div class="content">
        <div class="container-fluid">
          <router-view :filterd='val' />
        </div>
      </div>
    </div>
    <Modals />
  </div>
</template>
<script>
import Modals from '../components/modals/Modals.vue';
import Header from '../components/Header.vue';
import eventBus from '../eventBus'

export default {
  data() {
    return {
      val: ''
    };
  },
  components: {
    Modals,
    Header
  },
  created() {
    eventBus.$on('value', (val) => {
      this.val = val
    })
  },
};
</script>
