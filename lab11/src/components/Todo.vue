<template>
  <li class="todo-list__item">
    <div class="todo-list__name">
      Задача №{{ todo.id }}
      
      <div class="todo-list__icons-wrap">
        <span @click="$store.dispatch('openModal', {mode: 'changeTodo', id: todo.id})" class="todo-list__change-todo">
        <img src="../assets/pencil.svg" alt="">
      </span>
      <span
        v-bind:class="{
          'todo-list__priority': true,
          'todo-list__priority_1': todo.priority === '1',
          'todo-list__priority_2': todo.priority === '2',
          'todo-list__priority_3': todo.priority === '3',
        }"
        >{{ todo.priority }}</span>
      </div>
    </div>

    <div class="todo-list__description">
      {{ todo.name }}
    </div>

    <div class="todo-list__date">
      <span>Создано:</span> {{ todo.creationDate }}
    </div>

    <div class="todo-list__buttons-block">
      <button
        v-on:click="onPromote"
        class="todo-list__button todo-list__button_promote"
      >
        В работу
      </button>
      <button
        v-on:click="$store.commit('removeTodo', todo.id)"
        class="todo-list__button todo-list__button_remove"
      >
        Удалить
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["todo"],
  methods: {
    onPromote: function () {
      this.todo.status = "inProgress";

      let timeElapsed = Date.now();
      let today = new Date(timeElapsed);

      let options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };

      this.todo.date = today.toLocaleDateString("ru", options);
    },
  },
};
</script>

<style>
</style>