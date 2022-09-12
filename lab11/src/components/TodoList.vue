<template>
  <section class="todo-list">
    <ul class="todo-list__list">
      <h2 class="todo-list__header">Задачи</h2>
      <Todo
        v-bind:todo="todo"
        v-if="todo.status === 'backlog'" 
        v-for="todo in $store.state.todos"
        :key="todo"
      />
    </ul>
    <ul class="todo-list__list todo-list__list_in-progress">
      <h2 class="todo-list__header">В процессе</h2>
      <TodoInProgress
        v-bind:todo="todo"
        v-if="todo.status === 'inProgress'" 
        v-for="todo in $store.state.todos"
        :key="todo"
      />
    </ul>
    <ul class="todo-list__list todo-list__list_ready">
      <h2 class="todo-list__header">Завершены</h2>
      <TodoCompleted
        v-bind:todo="todo"
        v-if="todo.status === 'done'" 
        v-for="todo in $store.state.todos"
        :key="todo"
      />
    </ul>
  </section>
</template>

<script>
import Todo from "@/components/Todo";
import TodoInProgress from "@/components/TodoInProgress";
import TodoCompleted from '@/components/TodoCompleted';

export default {
  props: ["todos"],
  components: {
    Todo,
    TodoInProgress,
    TodoCompleted,
  },
};
</script>

<style>

</style>