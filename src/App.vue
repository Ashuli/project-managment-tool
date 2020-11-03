<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style src="./styles/styles.css"></style>
<style src="./styles/notification.css"></style>
<style src='./styles/quill.css'></style>

<script>
export default {
  provide: {
    searchTask() {
      if (this.filterd === '') {
        return this.tasks
      } else {
        return this.tasks.filter(task => {
          if (task.title.toLowerCase().includes(this.filterd.toLowerCase()) || 
            task.description.toLowerCase().includes(this.filterd.toLowerCase()) ||
            task.category.name.toLowerCase().includes(this.filterd.toLowerCase()) ||
            task.start_date.toLowerCase().includes(this.filterd.toLowerCase()) ||
            task.end_date.toLowerCase().includes(this.filterd.toLowerCase())) {
            return task;
          }
        });
      }
    },
    searchProject() {
      if (this.getKeyword === '') {
        return this.projects
      } else {
        return this.projects.filter(project => {
          if (project.title.toLowerCase().includes(this.getKeyword.toLowerCase()) || 
            project.description.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            project.status.name.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            project.project_category.name.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            project.start_date.toLowerCase().includes(this.getKeyword.toLowerCase()) ||
            project.end_date.toLowerCase().includes(this.getKeyword.toLowerCase())) {
            return project;
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
