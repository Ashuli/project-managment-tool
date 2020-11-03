<template>
  <div>
    <!-- Creates -->
    <Modal
      v-if="isCreateStatusOpen"
      @close="isCreateStatusOpen = false"
      :width="480"
      :component="status"
    />
    <Modal
      v-if="isUpdateStatusOpen"
      @close="isUpdateStatusOpen = false"
      :width="480"
      :component="status"
    />
    <Modal
      v-if="isCreateTaskCategoryOpen"
      @close="isCreateTaskCategoryOpen = false"
      :width="480"
      :component="taskCategory"
    />
    <Modal
      v-if="isUpdateTaskCategoryOpen"
      @close="isUpdateTaskCategoryOpen = false"
      :width="480"
      :component="taskCategory"
    />
    <Modal
      v-if="isCreateProjectCategoryOpen"
      @close="isCreateProjectCategoryOpen = false"
      :width="480"
      :component="projectCategory"
    />
    <Modal
      v-if="isUpdateProjectCategoryOpen"
      @close="isUpdateProjectCategoryOpen = false"
      :width="480"
      :component="projectCategory"
    />
    <Modal
      v-if="isCreateRolesOpen"
      @close="isCreateRolesOpen = false"
      :width="480"
      :component="roles"
    />
    <Modal
      v-if="isCreateTaskOpen"
      @close="isCreateTaskOpen = false"
      :width="480"
      :component="task"
    />
    <Modal
      v-if="isUpdateTaskOpen"
      @close="isUpdateTaskOpen = false"
      :width="480"
      :component="task"
    />
    <Modal
      v-if="isUpdateRolesOpen"
      @close="isUpdateRolesOpen = false"
      :width="480"
      :component="roles"
    />
    <Modal
      v-if="isCreateProjectOpen"
      @close="isCreateProjectOpen = false"
      :width="480"
      :component="project"
    />
    <Modal
      v-if="isUpdateProjectOpen"
      @close="isUpdateProjectOpen = false"
      :width="480"
      :component="project"
    />
    <Modal
      v-if="isUpdateUserOpen"
      @close="isUpdateUserOpen = false"
      :width="480"
      :component="user"
    /> 
    <Modal
      v-if="isCreateDocumentTypeOpen"
      @close="isCreateDocumentTypeOpen = false"
      :width="480"
      :component="documentType"
    />
    <Modal
      v-if="isUpdateDocumentTypeOpen"
      @close="isUpdateDocumentTypeOpen = false"
      :width="480"
      :component="documentType"
    />
    <Modal
      v-if="isCreateUserOpen"
      @close="isCreateUserOpen = false"
      :width="480"
      :component="user"
    /> 
    <Modal
      v-if="isDeleteProjectOpen"
      @close="isDeleteProjectOpen = false"
      :width="480"
      :component="confirmModal"
      :componentProps="ProjectDeleteProps"
      @confirm="confirmProjectDelete"
    /> 
    <Modal
      v-if="isDeleteProjectCategoryOpen"
      @close="isDeleteProjectCategoryOpen = false"
      :width="480"
      :component="confirmModal"
      :componentProps="ProjectCategoryDeleteProps"
      @confirm="confirmProjectCategoryDelete"
    /> 
    <Modal
      v-if="isDeleteTaskCategoryOpen"
      @close="isDeleteTaskCategoryOpen = false"
      :width="480"
      :component="confirmModal"
      :componentProps="TaskCategoryDeleteProps"
      @confirm="confirmTaskCategoryDelete"
    /> 
    <Modal
      v-if="isDeleteStatusOpen"
      @close="isDeleteStatusOpen = false"
      :width="480"
      :component="confirmModal"
      :componentProps="StatusDeleteProps"
      @confirm="confirmStatusDelete"
    /> 
    <Modal
      v-if="isDeleteRolesOpen"
      @close="isDeleteRolesOpen = false"
      :width="480"
      :component="confirmModal"
      :componentProps="RolesDeleteProps"
      @confirm="confirmRolesDelete"
    /> 
    <Modal
      v-if="isDeleteDocumentTypeOpen"
      @close="isDeleteDocumentTypeOpen = false"
      :width="480"
      :component="confirmModal"
      :componentProps="DocumentTypeDeleteProps"
      @confirm="confirmDocumentTypeDelete"
    /> 
  </div>
</template>
<script>
import Modal from './Modal.vue'
import Confirm from './Confirm.vue'
import eventBus from '../../eventBus'
import Status from '../forms/Status.vue'
import TaskCategory from '../forms/TaskCategory.vue'
import ProjectCategory from '../forms/ProjectCategory.vue'
import Project from '../forms/AddProject.vue'
import Task from '../forms/AddTask.vue'
import User from '../forms/User.vue'
import Roles from '../forms/Roles.vue'
import DocumentType from '../forms/DocumentType.vue'

export default {
  components: {
    Modal,
  },
  data() {
    return {
      confirmModal: Confirm,
      isCreateStatusOpen: false,
      isCreateTaskCategoryOpen: false,
      isCreateProjectCategoryOpen: false,
      isCreateRolesOpen: false,
      isCreateProjectOpen: false,
      isCreateUserOpen: false,
      isCreateTaskOpen: false,
      isUpdateUserOpen: false,
      isCreateDocumentTypeOpen: false,
      isUpdateStatusOpen: false,
      isUpdateTaskCategoryOpen: false,
      isUpdateProjectCategoryOpen: false,
      isUpdateRolesOpen: false,
      isUpdateProjectOpen: false,
      isUpdateTaskOpen: false,
      isUpdateDocumentTypeOpen: false,
      isDeleteProjectOpen: false,
      isDeleteProjectCategoryOpen: false,
      isDeleteTaskCategoryOpen: false,
      isDeleteStatusOpen: false,
      isDeleteRolesOpen: false,
      isDeleteDocumentTypeOpen: false,
      // isDeleteUserOpen: false,

      status: Status,
      taskCategory: TaskCategory,
      projectCategory: ProjectCategory,
      roles: Roles,
      user: User,
      project: Project,
      task: Task,
      documentType: DocumentType,
    
      cb: null,
      key: '',
      ProjectDeleteProps: {
        title: 'Are you sure you want to delete this project category?',
        message: "Once you delete, can't be undone.",
        confirmText: 'Delete',
        variant: 'primary'
        },
      ProjectCategoryDeleteProps: {
        title: 'Are you sure you want to delete this project category?',
        message: "Once you delete, can't be undone.",
        confirmText: 'Delete',
        variant: 'primary'
      },
      TaskCategoryDeleteProps: {
        title: 'Are you sure you want to delete this task category?',
        message: "Once you delete, can't be undone.",
        confirmText: 'Delete',
        variant: 'primary'
      },
      StatusDeleteProps: {
        title: 'Are you sure you want to delete this status?',
        message: "Once you delete, can't be undone.",
        confirmText: 'Delete',
        variant: 'primary'
      },
      RolesDeleteProps: {
        title: 'Are you sure you want to delete this role?',
        message: "Once you delete, can't be undone.",
        confirmText: 'Delete',
        variant: 'primary'
      },
      DocumentTypeDeleteProps: {
        title: 'Are you sure you want to delete this document type?',
        message: "Once you delete, can't be undone.",
        confirmText: 'Delete',
        variant: 'primary'
      },
    }
  },
  methods: {
    confirmProjectDelete() {
      eventBus.$emit('confirm-delete-project')
    },
    confirmProjectCategoryDelete() {
      eventBus.$emit('confirm-delete-project-category')
    },
    confirmTaskCategoryDelete() {
      eventBus.$emit('confirm-delete-task-category')
    },
    confirmStatusDelete() {
      eventBus.$emit('confirm-delete-status')
    },
    confirmRolesDelete() {
      eventBus.$emit('confirm-delete-roles')
    },
    confirmDocumentTypeDelete() {
      eventBus.$emit('confirm-delete-document-type')
    },
    callUpdate(update) {
      this[this.key] = false
      if (update === 'refetch') {
        this.cb()
      }
    }
  },
  created() {
    // eventBus.$on('toggle-task-create', cb => {
    //   this.isTaskCreateOpen = true
    //   this.key = 'isTaskCreateOpen'
    //   this.cb = cb
    // })
    eventBus.$on('toggle-create-status', (cb) => {
      this.isCreateStatusOpen = true
      this.key = 'isCreateStatusOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-status-update', (cb) => {
      this.isUpdateStatusOpen = true
      this.key = 'isUpdateStatusOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-create-task-category', (cb) => {
      this.isCreateTaskCategoryOpen = true
      this.key = 'isCreateTaskCategoryOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-task-category-update', (cb) => {
      this.isUpdateTaskCategoryOpen = true
      this.key = 'isUpdateTaskCategoryOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-create-project-category', (cb) => {
      this.isCreateProjectCategoryOpen = true
      this.key = 'isCreateProjectCategoryOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-project-category-update', (cb) => {
      this.isUpdateProjectCategoryOpen = true
      this.key = 'isUpdateProjectCategoryOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-create-roles', (cb) => {
      this.isCreateRolesOpen = true
      this.key = 'isCreateRolesOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-roles-update', (cb) => {
      this.isUpdateRolesOpen = true
      this.key = 'isUpdateRolesOpen'
      this.cb = cb
    })
    
    eventBus.$on('toggle-create-project', (cb) => {
      this.isCreateProjectOpen = true
      this.key = 'isCreateProjectOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-project-update', (cb) => {
      this.isUpdateProjectOpen = true
      this.key = 'isUpdateProjectOpen'
      this.cb = cb
    })
    eventBus.$on('toggle-create-document-type', (cb) => {
      this.isCreateDocumentTypeOpen = true
      this.key = 'isCreateDocumentTypeOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-document-type-update', (cb) => {
      this.isUpdateDocumentTypeOpen = true
      this.key = 'isUpdateDocumentTypeOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-delete-project', (isOpen) => {
      this.isDeleteProjectOpen = isOpen
    })

    eventBus.$on('toggle-create-user', (cb) => {
      this.isCreateUserOpen = true
      this.key = 'isCreateUserOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-project-category-delete', (isOpen) => {
      this.isDeleteProjectCategoryOpen = isOpen
    })

    eventBus.$on('toggle-task-category-delete', (isOpen) => {
      this.isDeleteTaskCategoryOpen = isOpen
    })

    eventBus.$on('toggle-status-delete', (isOpen) => {
      this.isDeleteStatusOpen = isOpen
    })

    eventBus.$on('toggle-roles-delete', (isOpen) => {
      this.isDeleteRolesOpen = isOpen
    })

    eventBus.$on('toggle-document-type-delete', (isOpen) => {
      this.isDeleteDocumentTypeOpen = isOpen
    })

    eventBus.$on('toggle-create-user', (cb) => {
      this.isCreateUserOpen = true
      this.key = 'isCreateUserOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-user-update', (cb) => {
      this.isUpdateUserOpen = true
      this.key = 'isUpdateUserOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-create-task', (cb) => {
      this.isCreateTaskOpen = true
      this.key = 'isCreateTaskOpen'
      this.cb = cb
    })

    eventBus.$on('toggle-task-update', (cb) => {
      this.isUpdateTaskOpen = true
      this.key = 'isUpdateTaskOpen'
      this.cb = cb
    })
  },
}
</script>
