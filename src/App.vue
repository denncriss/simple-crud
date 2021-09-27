<script setup>
  import { ref } from '@vue/reactivity'

  const isEdit = ref(false)
  const newTask = ref({ id: null, name: null })
  const tasks = ref([])

  const handleSubmit = () => {
    if (newTask.value.name === '' || !newTask.value.name) {
      isEdit.value = false
      return
    }
    if (isEdit.value) {
      updateTask()
      return
    }
    createTask()
  }
  const createTask = () => {
    const newValue = {
      id: new Date(),
      name: newTask.value.name,
    }
    tasks.value = [newValue, ...tasks.value]
    newTask.value = {}
  }
  const deleteTask = (id) => {
    const newLists = tasks.value.filter((item) => item.id !== id)
    tasks.value = newLists
  }
  const updateTask = () => {
    for (const task of tasks.value) {
      if (task.id === newTask.value.id) {
        task.name = newTask.value.name
        break
      }
    }
    isEdit.value = false
    resetForm()
  }

  const updateTaskBtn = (task) => {
    isEdit.value = true
    newTask.value = { ...task }
  }
  const cancelEditBtn = () => {
    isEdit.value = false
    resetForm()
  }

  const resetForm = () => {
    newTask.value = { id: null, name: null }
  }
</script>

<template>
  <div class="min-h-screen bg-hex-d3dee2 p-4">
    <div class="w-full md:w-1/2 mx-auto">
      <div class="card">
        <h2 class="text-center w-full uppercase font-semibold mb-3 text-lg">simple crud</h2>
        <form class="w-full bg-white shadow-md p-4" @submit.prevent="handleSubmit">
          <label class="block mb-1" for="task">tarea:</label>
          <input
            v-model.trim="newTask.name"
            placeholder="ingresa tu tarea"
            class="
              rounded-md
              w-full
              p-1.5
              bg-hex-e3f1fa
              border-2 border-transparent
              focus:(border-gray-500/20
              outline-none
              bg-hex-e3effa/50)
            "
            type="text" />
          <div class="mt-4 flex flex-col md:flex-row">
            <button class="btn btn-secondary" :class="{ 'btn-primary': isEdit }">
              {{ !isEdit ? 'crear' : 'actualizar' }}
            </button>
            <button v-if="isEdit" class="btn btn-accent mt-3 md:(mt-0 ml-4)" @click="cancelEditBtn">cancelar</button>
          </div>
        </form>
      </div>
      <template v-if="tasks.length > 0">
        <div v-for="task in tasks" :key="task.id">
          <div class="bg-white flex mt-4 p-5 justify-between shadow">
            <p>
              {{ task.name }}
            </p>
            <div class="flex">
              <button class="bg-blue-500 btn-icon mr-2" @click="updateTaskBtn(task)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>

              <button :disabled="isEdit" class="bg-red-500 btn-icon" @click="deleteTask(task.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </template>
      <div
        v-else
        class="bg-white flex mt-4 p-5 justify-between shadow text-center flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <p class="w-full text-gray-400 font-semibold">no hay tareas</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .btn {
    @apply transition-all duration-200 px-4 py-2 transform  w-full uppercase rounded-md;
    @apply active:( -translate-y-1) focus:outline-none;
  }
  .btn-primary {
    @apply !bg-green-600 text-white;
    @apply hover:!bg-green-400;
  }
  .btn-secondary {
    @apply bg-hex-3e69c5 text-white;
    @apply hover:bg-hex-78a7e0;
  }
  .btn-accent {
    @apply bg-gray-600 text-white;
    @apply hover:bg-gray-400;
  }
  .btn-icon {
    @apply w-8 h-8 flex items-center justify-center rounded-md;
  }
</style>
