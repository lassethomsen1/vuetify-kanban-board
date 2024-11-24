<script setup lang="ts">
import {ref} from "vue";

const emit = defineEmits(["submit-task"]);

const task = ref({
  id: 0,
  title: "",
  description: "",
});

const rules = {
  required: (value: string) => !!value || 'Required.'
}

const submitTask = () => {
  if (task.value.title && task.value.description) { // both fields are required
    emit("submit-task", {...task.value});
    task.value.title = "";
    task.value.description = "";
  }

};
</script>

<template>
  <v-form class="pl-2 pb-2" @submit.prevent="submitTask">
    <v-text-field class="w-25" v-model="task.title" placeholder="Enter task title" :rules="[rules.required]"/>
    <v-text-field class="w-25" v-model="task.description" placeholder="Enter task description"
                  :rules="[rules.required]"/>
    <v-btn type="submit" color="primary">Add Task</v-btn>
  </v-form>
</template>

