<template>
  <form @submit.prevent="onSubmit" class="modal">
      <button class="modal__close" type="button" @click="$store.dispatch('closeModal')">
        X
      </button>
      <label class="modal__title" for="name-input">Новая задача</label>
      <input
        placeholder="Описание задачи"
        type="text"
        class="modal__input"
        id="name-input"
        v-model="name"
        required
      />

      <label for="todo-priority" hidden></label>
      <select v-model="priority" class="modal__input" name="todo-priority" id="priority-select" required>
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <button type="submit" class="modal__submit">Добавить</button>
    </form>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      if (this.name.trim() && this.priority.trim()) {
        let newTodo = {
          name: this.name,
          priority: this.priority,
          status: "backlog",
        };

        this.$store.commit("increaseTodosCounter");
        newTodo.id = this.$store.state.todosCounter;

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

        newTodo.creationDate = today.toLocaleDateString('ru', options)

        this.$store.commit('addTodo', newTodo)
        this.name = "";
        this.$store.commit('modalOpeningSwitch', false)
        setTimeout(() => {
          this.$store.dispatch('closeModal')
        }, 10);
      }
    },
  }
}
</script>

<style>

</style>