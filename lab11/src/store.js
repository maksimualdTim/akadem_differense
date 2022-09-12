import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        darkTheme: localStorage.darkTheme || '0',
        todosCounter: 0,
        todos: [],
        id: '',
        modalOpening: false,
        showModal: false,
        modalOpeningMode: '',
    },
    getters: {
        darkTheme(state) {
            return state.darkTheme;
        },
        todosCounter(state) {
            return state.todosCounter;
        }
    },
    mutations: {
        idChange(state, id) {
            state.id = id;
        },
        addTodo(state, newTodo) {
            state.todos.push(newTodo);
        },
        removeTodo(state, id) {
            for (let i = 0; i < state.todos.length; i++) {
                if (state.todos[i].id == id) {
                    state.todos.splice(i, 1);
                    break;
                }
            }
        },
        changeTodo(state, obj) {

            for (let i = 0; i < state.todos.length; i++) {

                if (state.todos[i].id == obj.id) {
                    state.todos[i].name = obj.name;
                    state.todos[i].priority = obj.priority;
                    state.todos[i].status = obj.status;
                    break;
                }
            }
        },
        modalOpeningModeChange(state, mode) {
            state.modalOpeningMode = mode;
        },
        modalOpeningSwitch(state, bool) {
            state.modalOpening = bool;
        },
        showModalSwitch(state, bool) {
            state.showModal = bool;
        },
        changeTheme(state) {

            /* Здесь такая кривая конструкция поскольку 
            localStorage может хранить только строки */

            if (state.darkTheme == '1') {
                state.darkTheme = '0';
                localStorage.darkTheme = '0';
            } else {
                state.darkTheme = '1';
                localStorage.darkTheme = '1';
            }
        },
        increaseTodosCounter(state) {
            state.todosCounter++;
        }
    },
    actions: {
        openModal(state, obj) {
            state.commit('showModalSwitch', true);
            state.commit('modalOpeningSwitch', false);
            state.commit('modalOpeningModeChange', obj.mode);
            state.commit('idChange', obj.id);

            setTimeout(() => {
                state.commit('modalOpeningSwitch', true);
            }, 1);
        },
        closeModal(state) {
            state.commit('modalOpeningSwitch', false);
            setTimeout(() => {
                state.commit('showModalSwitch', false);
            }, 200);
        }
    }
});

export default store;