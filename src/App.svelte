<script>
    import TodoList from './TodoList.svelte'
    let uid = 1;
    let todos = [
        {id: uid++, done: false, description: 'write some more todos'},
        {id: uid++, done: true, description: 'add a todo item'},
        {id: uid++, done: false, description: 'drink more water'},
        {id: uid++, done: true, description: 'write some great code'},
        {id: uid++, done: false, description: 'fix bugs'},
    ];

    const add = input => {
        const todo = {
            id: uid++,
            done: false,
            description: input.value
        };

        todos = [todo, ...todos];
        input.value = '';
    }

    const remove = todo => {
        console.log(remove, todo)
        todos = todos.filter(t => t !== todo);
    }
    
    const check = todo => {
        todo.done = !todo.done;
        remove(todo);
        todos = todos.concat(todo);
    };
</script>

<style>
    .input-todo {
        font-size: 1.4em;
        width: 100%;
        margin: 2em 0 1em 0;
    }

    .container {
        max-width: 36em;
        margin: 0 auto;
    }

</style>

<h1>Svelte-Todo</h1>

<div class='container'>
    <input
            class="input-todo"
            type="text"
            placeholder="add here"
            on:keydown="{event => event.key === 'Enter' && add(event.target)}"
    >
    <TodoList title="todo" todos={todos.filter(t => !t.done)} {remove} {check}/>
    <TodoList title="done" todos={todos.filter(t => t.done)} {remove}{check}/>
    
</div>

