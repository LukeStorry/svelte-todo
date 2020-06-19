<script>
    import TodoList from './TodoList.svelte'
    import {todos} from './stores.js'
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
            on:keydown="{event => event.key === 'Enter' && todos.add(event.target)}"
    >
    <TodoList title="todo" filter={t => !t.done}/>
    <TodoList title="done" filter={t => t.done}/>
    
</div>

