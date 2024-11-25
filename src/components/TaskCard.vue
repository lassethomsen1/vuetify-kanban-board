<script setup lang="ts">

import type { Task } from '@/types/types';

const props = defineProps<{ task: Task }>();
const emit = defineEmits(['dragstart', 'dragend']);

const onDragStart = (event: DragEvent) => {
  emit('dragstart', event, props.task);
};

const onDragEnd = () => {
  emit('dragend');
};
</script>
<template>
  <v-card
    :class="['mb-3']"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    elevation="2"
  >
    <v-card-item>
      <v-card-title>{{ task.title }}</v-card-title>
      <v-card-subtitle>{{ task.description }}</v-card-subtitle>
    </v-card-item>
  </v-card>
</template>


