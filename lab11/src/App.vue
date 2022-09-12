<template>
  <div id="app" v-bind:class="{ 'dark-theme': $store.state.darkTheme == '1' }">
    <header class="header">
      <div class="header__logo-block">
        <figure class="header__logo">
          <img src="./assets/logo.svg" alt="Logo">
        </figure>
      </div>
      <h1 class="header__text">Канбан доска или как там её</h1>
      <div class="header__switch-block">
        <span>Тёмная тема</span>
        <div @click="changeTheme()" class="header__switch-wrap">
          <div class="header__theme-switch"></div>
        </div>
      </div>
    </header>
    <main class="main">
      <div class="modal-open-button__wrap">
        <button id="openModal" class="modal-open-button" @click="$store.dispatch('openModal', {mode: 'createTodo', id: '0'})">
          Создать задачу
        </button>
      </div>
      
      <Modal
        :mode="$store.state.modalOpeningMode"
        v-if="$store.state.showModal"
        @close="$store.state.showModal = false"
        ref="modal"
      />
      <TodoList />
    </main>
    <footer class="footer">
      Васьковский Сергей Павлович, 201-322
    </footer>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";
import Modal from "@/components/Modal";
import store from "./store";

export default {
  name: "App",
  store: store,
  methods: {
    changeTheme() {
      this.$store.commit('changeTheme')
    }
  },
  components: { TodoList, Modal },
};
</script>

<style lang="scss">
@import "reset-css";

:root {
  --main-color-1: #15616d;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.dark-theme {
  background-color: #fefefe;
  filter: invert(95%);
  transition: 200ms;
}

* {
  transition: 200ms;
}

body {
  background-color: #e8e8e8;
  font-family: "Roboto", sans-serif;
}

#app {
  position: relative;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 5px 30px;
  background-color: var(--main-color-1);
  color: #fff;

  path {
    fill: #fff;
  }
}

.header__logo-block {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.header__guide-block {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 18px;
  margin-left: 10px;

  img {
    margin-right: 10px;
  }

  p {
    max-width: 35ch;
  }
}

.header__guide-block:hover {
  img {
    animation: pulse 3s infinite;
  }
}

.header__icon {
  width: 48px;
}

.header__text {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
}

.header__switch-block {
  display: flex;
  align-items: center;

  span {
    margin-right: 15px;
  }
}

.header__switch-wrap {
  border: 1px solid #fff;
  border-radius: 90px;
  padding: 2px;
  width: 40px;
  transition: 200ms;
  cursor: pointer;
}

.header__switch-wrap:active {
  transform: scale(0.9);
}

.header__theme-switch {
  border-radius: 90px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  transition: 200ms;
}

.dark-theme .header__theme-switch {
  transform: translate(20px, 0);
}

.modal-open-button__wrap {
  text-align: center;
}

.modal-open-button {
  padding: 7px 15px;
  border-radius: 5px;
  border: 1px solid var(--main-color-1);
  text-transform: uppercase;
  background-color: var(--main-color-1);
  color: #fff;
  transition: 200ms;
}

.modal-open-button:hover {
  color: var(--main-color-1);
  background-color: transparent;
  transition: 200ms;
  cursor: pointer;
}

.list-empty {
  text-align: center;
  font-size: 36px;
  margin-top: 100px;
}

.main {
  max-width: 1700px;
  margin: 50px auto 0 auto;
  padding-bottom: 200px;
  min-height: 100vh;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 70px;
  padding-left: calc((100% - 1700px) / 2);
  background-color: #222831;
  color: #fff;
  text-align: center;
}

.todo-list {
  margin-top: 50px;
  display: flex;
  flex-wrap: nowrap;
}

.todo-list__change-todo {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-right: 5px;
  border-radius: 4px;
  width: 23px;
  height: 23px;
  background-color: var(--main-color-1);

  img {
    width: 15px;
    height: 15px;
  }
}

.todo-list__change-todo:hover {
  background-color: #30475e;
  cursor: pointer;
}

.todo-list__change-todo:active {
  transform: scale(.9);
}

.todo-list__icons-wrap {
  display: flex;
}

.todo-list__list {
  width: 33%;
  min-height: 500px;
  border-right: 2px solid rgba(0, 0, 0, 0.2);
}

.todo-list__list:last-child {
  border-right: 0;
}

.todo-list__header {
  text-align: center;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 700;
}

.todo-list__date {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 5px;
}

.todo-list__date span {
  font-weight: 600;
}

.form-section {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  transition: 200ms;
}

.form-section .modal {
  opacity: 0;
  transform: scale(0.9);
}

.form-section_open {
  background-color: rgba(0, 0, 0, 0.2);
}

.form-section_open .modal {
  opacity: 1;
  transform: scale(1);
}

.dark-theme .form-section {
  background-color: transparent;
}

.dark-theme .modal {
  background-color: rgb(226, 222, 222);
}

.dark-theme .modal__input {
  background-color: rgb(226, 222, 222);
}

.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 100px 50px 100px;
  font-size: 19px;
  border-radius: 5px;
  background-color: #ffffff;
}

.modal__close {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid var(--main-color-1);
  border-radius: 5px;
  color: var(--main-color-1);
  background-color: transparent;
  font-size: 16px;
  text-align: center;
  transition: 200ms;
}

.modal__close:hover {
  color: #fff;
  background-color: var(--main-color-1);
  transition: 200ms;
  cursor: pointer;
}

.modal__close:active {
  transform: scale(.9);
}

.modal__title {
  position: absolute;
  font-size: 22px;
  top: 20px;
}

.modal__input {
  margin: 5px 0 25px 0;
  border: 0;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  padding: 10px;
  max-width: 300px;
  width: 100%;
  transition: 200ms;
  font-size: 17px;
  text-align: center;
}

.modal__input:focus {
  background-color: rgba(21, 97, 109, 0.1);
  outline: 0;
  transition: 200ms;
}

.modal__submit {
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  text-transform: uppercase;
  background-color: var(--main-color-1);
  color: #fff;
  font-size: 17px;
  transition: 200ms;
  max-width: 300px;
  width: 100%;
  cursor: pointer;
}

.modal__submit:hover {
  background-color: #30475e;
  transition: 200ms;
}

.modal__submit:focus {
  outline: 0;
}

.modal__submit:active {
  box-shadow: 0px 7px 14px 0px rgba(34, 60, 80, 0.2);
  transform: translate(0, 1px);
  transition: 200ms;
}

.todo-list__item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 20px auto;
  padding: 20px 10px;
  padding-bottom: 80px;
  border-radius: 4px;
  background-color: #fff;
  max-width: 300px;
  min-height: 250px;
  text-align: left;
  font-size: 18px;
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
}

.todo-list__name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  word-wrap: break-word;
}

.todo-list__priority {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  width: 23px;
  height: 23px;
  color: #fff;
}

.todo-list__priority_1 {
  background-color: red;
}

.todo-list__priority_2 {
  background-color: blue;
}

.todo-list__priority_3 {
  background-color: green;
}

.todo-list__employee {
  margin: 10px 0;
}

.todo-list__employee > span {
  font-weight: 700;
}

.todo-list__buttons-block {
  position: absolute;
  bottom: 0;
  left: 5px;
  width: calc(100% - 10px);
}

.todo-list__button {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 4px;
  border: 0;
  margin: 5px 0;
  color: #fff;
  text-transform: uppercase;
  transition: 200ms;
  cursor: pointer;
}

.todo-list__button:focus {
  outline: 0;
}

.todo-list__button:active {
  transform: translate(0, 1px);
  box-shadow: 0px 7px 14px 0px rgba(34, 60, 80, 0.2);
}

.todo-list__button:hover {
  background-color: #30475e;
  transition: 200ms;
}

.todo-list__button_promote {
  background-color: var(--main-color-1);
}
.todo-list__button_remove {
  background-color: #222831;
}

@media screen and (max-width: 970px) {
  .modal__input {
    margin: 10px 20px;
  }
}

@media screen and (max-width: 970px) {
  .todo-list {
    flex-wrap: wrap;
  }

  .todo-list__list {
    margin-bottom: 100px;
    border-right: 0;
    width: 100%;
  }
}

@media screen and (max-width: 970px) {
  .footer {
    text-align: center;
  }
}
</style>