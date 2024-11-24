<script setup lang="ts">
import TaskCard from './TaskCard.vue';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

const props = defineProps<{ column: Column }>();
const emit = defineEmits(['drop', 'dragstart', 'dragend']);

const onDragStart = (event: DragEvent, task: Task) => {
  emit('dragstart', event, task);
};

const onDragEnd = () => {
  emit('dragend');
};

const onDrop = (event: DragEvent) => {
  emit('drop', event, props.column.id);
};
</script>
<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="mx-2">
      <v-card-title class="font-weight-bold">
        {{ column.title }}
      </v-card-title>
      <v-card-text>
        <div
          class="pa-6"
          @dragover.prevent
          @drop="onDrop"
        >
          <TaskCard
            v-for="task in column.tasks"
            :key="task.id"
            :task="task"
            @dragstart="onDragStart"
            @dragend="onDragEnd"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>


