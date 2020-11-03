<template>
  <div
    class="flex fixed mt-14 top-0 w-full px-6 items-center py-2 font-sans bg-white border-b-2 border-gray-200"
  >
    <router-link to="/p" class="flex items-center justify-start ml-4">
      <div class="px-4 py-2 mr-2 bg-gray-200 rounded">
        <span class="font-semibold text-gray-700 text-normal">Boards</span>
      </div>
    </router-link>
    <div class="flex justify-end w-20 relative mr-6 dropdown ml-auto z-0">
      <button
        class="inline-flex items-center px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded"
      >
        <svg
          class="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span class="ml-2">Setting</span>
      </button>
      <div class="absolute right-0 hidden bg-white dropdown-menu -mr-10 font-normal text-sm">
        <ul
          class="mt-1 text-gray-700 bg-gray-200 rounded shadow text-left cursor-pointer"
        >
          <li class="">
            <a
              class="block px-6 py-2 whitespace-no-wrap hover:bg-gray-300 hover:rounded-t"
              @click="handleProjectCategory"
              >Project categories</a
            >
          </li>
          <li class="">
            <a
              class="block px-6 py-2 whitespace-no-wrap hover:bg-gray-300 hover:rounded-t"
              @click="handleTaskCategory"
              >Task categories</a
            >
          </li>
          <li class="">
            <a
              class="block px-6 py-2 whitespace-no-wrap hover:bg-gray-300 hover:rounded-t"
              @click="handleDocumentType"
              >Document types</a
            >
          </li>
          <li class="">
            <a
              class="block px-6 py-2 whitespace-no-wrap hover:bg-gray-300"
              @click="handleUsers"
              >Users</a
            >
          </li>
          <li class="">
            <a
              class="block px-6 py-2 whitespace-no-wrap hover:bg-gray-300"
              @click="handleRoles"
              >Roles</a
            >
          </li>
          <li class="">
            <a
              class="block px-6 py-2 whitespace-no-wrap hover:bg-gray-300 hover:rounded-b"
              @click="handleStatus"
              >Status</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleStatus() {
      this.$router.push('/p/status')
    },
    handleTaskCategory() {
      this.$router.push('/p/task-category')
    },
    handleProjectCategory() {
      this.$router.push('/p/project-category')
    },
    handleDocumentType() {
      this.$router.push('/p/document-type')
    },
    handleRoles() {
      this.$router.push('/p/roles')
    },
    handleUsers() {
      this.$router.push('/p/users')
    }
  }
}

</script>
<style>
.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 2.5rem;
}
</style>
