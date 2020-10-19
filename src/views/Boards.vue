<template>
  <div class="h-screen overflow-hidden">
    <nav-bar @value='(val) => value = val' />
    <add-project @add='add' @hide='hide' :top="top" :height='height' />
    <div style="border-bottom: 2px solid #edf2f7; border-top: 2px solid #edf2f7;" class="flex-shrink-0 bg-white border-b-2 border-gray-200">
      <nav-pro @add-project='addProject' />
    </div>
    <div class="h-full w-full flex-wrap content-start pt-3 justify-start flex-1 min-w-0 flex bg-gray-100">
      <card-board v-for="card in searchProject()" :key='card.title' width='20rem' :card='card' />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/shared/NavBar/NavBar.vue'
import CardBoard from '@/components/shared/Card/CardBoard.vue'
import NavPro from '@/components/NavPro.vue'
import AddProject from '@/components/modals/AddProject.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'Boards',
  components: {
    NavBar,
    CardBoard,
    NavPro,
    AddProject
  },
  data() {
    return {
      value: '',
      top: '-100%',
      height: 0,
      // cards: [
      //   {
      //     id: 1,
      //     title: 'Contract Generator',
      //     img: '/img/7.jpg',
      //     description: 'Add job category tods tasks and boards ',
      //     startDate: 'Sep 14',
      //     endDate: ' Sep 30',
      //     project_catagories: 'Category',
      //     status: true
      //   },
      //   {
      //     id: 2,
      //     title: 'Project Management',
      //     img: '/img/7.jpg',
      //     description: 'Add job category tods tasks and boards ',
      //     startDate: 'Sep 14',
      //     endDate: ' Sep 20',
      //     project_catagories: 'Category',
      //     status: true
      //   },
      //   {
      //     id: 3,
      //     title: 'Testing',
      //     img: '/img/7.jpg',
      //     description: 'Add job category tods tasks and boards ',
      //     startDate: 'Sep 14',
      //     endDate: ' Sep 20',
      //     project_catagories: 'Category',
      //     status: true
      //   }
      // ]
    }
  },
  inject: ['searchProject'],
  computed: {
    getKeyword() {
      return this.value;
    },
    ...mapGetters({
      cards: 'getProjects'
    })
  },
  methods: {
    addProject() {
      this.top = '0';
      this.height = '100%';
      return false;
    },
    hide(el) {
      console.log(el.id);
      if (el.id === 'top' || el.id === 'btn') {
          this.top = '-100%';
          this.height = 0;
        }
    },
    add(project) {
        this.cards.push(project)
    }
  },
  created() {
    this.$store.dispatch('getProjects')
  }
}
</script>
