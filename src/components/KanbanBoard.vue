<script setup lang="ts">
import {ref} from 'vue';
import TaskColumn from './TaskColumn.vue';
import AddTask from "@/components/AddTask.vue";

interface Task {
  id: string; // string for UUID
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
        id: "47470ff2-9bad-4da1-b59d-a7c565a04106",
        title: 'Task 1',
        description: 'Description for Task 1'
      },
      {
        id: "804a3a1b-99ef-479c-b3df-e9dccd923ba1",
        title: 'Task 2',
        description: 'Description for Task 2'
      },
      {
        id: "85655854-0fe6-4cbf-aa33-12d82755f372",
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
        id: "06fc840e-6815-4006-8d23-24756d804fc8",
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
        id: "b7531d61-b1e6-4099-a2bf-821824831cb5",
        title: 'Task 5',
        description: 'Description for Task 5'
      },
      {
        id: "8f817ddf-b013-4192-af3b-083473c7cc26",
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
    <AddTask @submit-task="addTask"/>
  </v-container>
</template>
