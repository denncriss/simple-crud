<script setup>
  import { ref } from '@vue/reactivity'

  const newTask = ref({
    id: '',
    task: '',
  })
  const tasks = ref([])
  const isEdit = ref(false)

  const handleSubmit = () => {
    if (newTask.value.task === '') {
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
      task: newTask.value.task,
    }
    tasks.value = [...tasks.value, newValue]
    newTask.value.task = ''
  }
  const deleteTask = (id) => {
    const newList = tasks.value.filter((item) => item.id !== id)
    tasks.value = newList
  }
  const handleUpdateTask = (id) => {
    isEdit.value = true
    const task = tasks.value.find((item) => item.id === id)
    newTask.value = { ...task }
  }
  const updateTask = () => {
    tasks.value.forEach((el) => {
      if (el.id === newTask.value.id) {
        el.task = newTask.value.task
      }
    })
    newTask.value.task = ''
    isEdit.value = false
  }

  const cancelEditBtn = () => {
    isEdit.value = false
    newTask.value.task = ''
  }
</script>

<template>
  <div class="min-h-screen bg-primary-100 p-4">
    <div class="w-full md:w-1/2 mx-auto">
      <div class="card">
        <form class="w-full bg-white shadow-md p-4" @submit.prevent="handleSubmit">
          <label for="task">tarea:</label>
          <input
            v-model.trim="newTask.task"
            placeholder="ingresa tu tarea"
            class="rounded-md w-full p-2 bg-primary-100"
            type="text" />
          <div class="mt-4 flex flex-col md:flex-row gap-4">
            <button class="btn btn-secondary" :class="{ 'btn-primary': isEdit }">
              {{ !isEdit ? 'crear' : 'actualizar' }}
            </button>
            <button v-if="isEdit" class="btn btn-accent" @click="cancelEditBtn">cancelar</button>
          </div>
        </form>
      </div>
      <template v-if="tasks.length > 0">
        <div v-for="(item, index) in tasks" :key="index">
          <div class="bg-white flex mt-4 p-5 justify-between shadow">
            <p>
              {{ item.task }}
            </p>
            <div class="flex gap-2">
              <button class="bg-blue-500 w-5 h-5 flex items-center justify-center" @click="handleUpdateTask(item.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>

              <button class="bg-red-500 w-5 h-5 flex items-center justify-center" @click="deleteTask(item.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 text-white"
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
          class="h-10 w-10 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <p class="w-full">no hay tareas</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .btn {
    @apply transition-all duration-200 px-4 py-2 transform  w-full uppercase rounded-md;
    @apply active:( -translate-y-1);
  }
  .btn-primary {
    @apply !bg-green-600 text-white;
    @apply hover:!bg-green-400;
  }
  .btn-secondary {
    @apply bg-blue-600 text-white;
    @apply hover:bg-blue-400;
  }
  .btn-accent {
    @apply bg-gray-600 text-white;
    @apply hover:bg-gray-400;
  }
</style>
