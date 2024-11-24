<template>
  <v-app>
    <v-main>
      <KanbanBoard />
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import KanbanBoard from './components/KanbanBoard.vue';

export default defineComponent({
  name: 'App',
  components: {
    KanbanBoard,
  },
});
</script>
