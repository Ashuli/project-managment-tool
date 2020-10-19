<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  provide: {
    searchTask() {
      if (this.getKeyword === '') {
        return this.tasks
      } else {
        return this.tasks.filter(task => {
          if (task.title.toLowerCase().includes(this.getKeyword.toLowerCase()) || 
            task.description.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            task.category.name.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            task.startDate.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            task.endDate.toLowerCase().includes(this.getKeyword.toLowerCase())) {
            return task;
          }
        });
      }
    },
    searchProject() {
      if (this.getKeyword === '') {
        return this.cards
      } else {
        return this.cards.filter(card => {
          if (card.title.toLowerCase().includes(this.getKeyword.toLowerCase()) || 
            // card.description.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            card.status.name.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            card.project_category.name.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            card.start_date.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            card.end_date.toLowerCase().includes(this.getKeyword.toLowerCase())) {
            return card;
          }
        });
      }
    },
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
