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
    emit("submit-task", {
      id: crypto.randomUUID(),
      title: task.value.title,
      description: task.value.description,
    });
    task.value.title = ""; // clear the form
    task.value.description = "";
  }
};
</script>

<template>
  <v-form class="pl-2 pt-2" @submit.prevent="submitTask">
    <v-text-field class="w-25" v-model="task.title" placeholder="Enter task title" :rules="[rules.required]"/>
    <v-text-field class="w-25" v-model="task.description" placeholder="Enter task description"
                  :rules="[rules.required]"/>
    <v-btn type="submit" color="#381010">Add Task</v-btn>
  </v-form>
</template>

