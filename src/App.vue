<script setup>
  import { ref } from '@vue/reactivity'

  const newTask = ref({
    id: '',
    task: '',
  })
  const tasks = ref([])
  const isEdit = ref(false)

  const handleSubmit = () => {
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
    console.log(newValue)
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
</script>

<template>
  <div class="min-h-screen bg-primary-100 p-4">
    <div class="card">
      <form class="w-full bg-white shadow-md p-4" @submit.prevent="handleSubmit">
        <label for="task">tarea:</label>
        <input v-model="newTask.task" class="rounded-md w-full p-2 bg-primary-100" type="text" />
        <button class="btn btn-secondary" :class="{ '!bg-yellow-400': isEdit }">
          {{ !isEdit ? 'crear' : 'actualizar' }}
        </button>
      </form>
    </div>
    <div v-for="(item, index) in tasks" :key="index">
      <div class="bg-white flex mt-4 p-5 justify-between shadow">
        <p>
          {{ item.task }}
        </p>
        <div class="flex gap-2">
          <button class="bg-blue-500 w-5 h-5 flex items-center justify-center" @click="handleUpdateTask(item.id)">
            e
          </button>
          <button class="bg-red-500 w-5 h-5 flex items-center justify-center" @click="deleteTask(item.id)">x</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .btn {
    @apply transition-all duration-200 px-4 py-2 transform mt-3 w-full uppercase rounded-md;
    @apply active:(scale-110 -translate-y-1) hover:bg-yellow-600;
  }
  .btn-primary {
    @apply bg-green-600 text-white;
  }
  .btn-secondary {
    @apply bg-blue-600 text-white;
  }
</style>
