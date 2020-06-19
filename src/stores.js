import {writable} from 'svelte/store';

function createTodosList() {
    let uid = 1;
    let placeholderTodos = [
        {id: uid++, done: false, description: 'write some more todos'},
        {id: uid++, done: true, description: 'add a todo item'},
        {id: uid++, done: false, description: 'drink more water'}
    ];

    const {subscribe, update} = writable(placeholderTodos);

    const add = input => {
        const todo = {
            id: uid++,
            done: false,
            description: input.value
        };

        update(todos => [todo, ...todos]);
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
