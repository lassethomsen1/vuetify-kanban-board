<script setup lang="ts">
import {ref} from 'vue';
import TaskColumn from './TaskColumn.vue';
import AddTask from "@/components/AddTask.vue";

interface Task {
  id: number | string; // string for UUID, number for hardcoded IDs
  title: string;
  description: string;
}

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

const draggedTask = ref<Task | null>(null);
const columns = ref<Column[]>([
  {
    id: 1,
    title: 'To Do',
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description for Task 1'
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description for Task 2'
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description for Task 3'
      }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    tasks: [
      {
        id: 4,
        title: 'Task 4',
        description: 'Description for Task 4'
      }
    ]
  },
  {
    id: 3,
    title: 'Done',
    tasks: [
      {
        id: 5,
        title: 'Task 5',
        description: 'Description for Task 5'
      },
      {
        id: 6,
        title: 'Task 6',
        description: 'Description for Task 6'
      }
    ]
  }
])

const handleDragStart = (event: DragEvent, task: Task): void => {
  draggedTask.value = task
  event.dataTransfer?.setData('text/plain', String(task.id))
  event.dataTransfer!.effectAllowed = 'move'
}

const handleDragEnd = () => {
  draggedTask.value = null;
};

const handleDrop = (event: DragEvent, columnId: number) => {
  const sourceColumn = columns.value.find(col =>
    col.tasks.some(task => task.id === draggedTask.value!.id)
  );
  const destinationColumn = columns.value.find(col => col.id === columnId);

  if (sourceColumn && destinationColumn && draggedTask.value) {
    sourceColumn.tasks = sourceColumn.tasks.filter(
      task => task.id !== draggedTask.value!.id
    );
    destinationColumn.tasks.push(draggedTask.value);
    handleDragEnd();
  }
};

const addTask = (task: Task) => {
  columns.value[0].tasks.push(task);
}
</script>
<template>
  <v-container>
    <AddTask @submit-task="addTask"/>
    <v-row>
      <TaskColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
        @drop="handleDrop"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
      />
    </v-row>
  </v-container>
</template>
