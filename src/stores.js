import {writable} from 'svelte/store';

function createTodosList() {
    let placeholderTodos = [
        {id: 1, done: false, text: 'write some more todos'},
        {id: 2, done: true, text: 'add a todo item'},
        {id: 3, done: false, text: 'drink more water'}
    ];

    let storedTodos = localStorage.getItem("todos");
    let startingTodos = placeholderTodos
    if (storedTodos) {
        try {
            startingTodos = JSON.parse(storedTodos)
        } catch (e) {
            console.log("Error parsing stored todos:", storedTodos, e)
        }
    }

    const {subscribe, update} = writable(startingTodos);
    subscribe(todos => localStorage.setItem("todos", JSON.stringify(todos)))

    const add = input => {
        update(todos =>
            [{
                id: Math.max(...todos.map(t => t.id)) + 1,
                done: false,
                text: input.value
            }, ...todos]);
        input.value = '';
    }

    const remove = todo =>
        update(todos => todos.filter(t => t !== todo))

    const check = todo =>
        update(todos => {
            todos.find(t => t === todo).done = !todo.done;
            return todos
        })

    return {subscribe, add, remove, check};
}

export const todos = createTodosList();
