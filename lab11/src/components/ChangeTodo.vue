<template>
  <form @submit.prevent="onSubmit" class="modal">
      <button class="modal__close" type="button" @click="$store.dispatch('closeModal')">
        X
      </button>
      <label class="modal__title" for="name-input">Изменение задачи</label>
      <input
        placeholder="Введите новое описание задачи"
        type="text"
        class="modal__input"
        id="name-input"
        v-model="name"
        required
      />

      <label for="priority-select">Приоритет</label>
      <select v-model="priority" class="modal__input" name="todo-priority" id="priority-select" required>
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <label for="status-select">Статус</label>
      <select v-model="status" class="modal__input" name="todo-status" id="status-select" required>
        <option value="backlog" selected>В ожидании</option>
        <option value="inProgress">В процессе</option>
        <option value="done">Завершены</option>
      </select>

      <button type="submit" class="modal__submit">Изменить</button>
    </form>
</template>

<script>
export default {
    props: ['id'],
    methods: {
        onSubmit() {
            if (this.name.trim()) {
                let changedTodoData = {
                    name: this.name,
                    priority: this.priority,
                    status: this.status,
                    id: this.id,
                }

                console.log(this.id)

                this.$store.commit('changeTodo', changedTodoData);
                this.$store.dispatch('closeModal');
            }
        }
    },
    mounted: function() {
        console.log(this.id);
    }
}
</script>

<style>

</style>