<script>
    import TodoList from './TodoList.svelte'
    import {todos} from './stores.js'
</script>

<style>
    h1 {
        color: dodgerblue;
        text-align: center;
        font-size: 3em;
        font-weight: 200;
        user-select: none;
    }

    div {
        max-width: 42em;
        width: 100vw;
        margin: 1em auto;
        padding: 0 2em;
    }

    input {
        font-size: 1.4em;
        width: 100%;
        padding: .25em;
        margin: 1em 0;
        border-radius: 10px;
        border: lightblue 3px solid;
    }

    input:focus {
        outline: 0;
        border: dodgerblue 3px solid;
    }

    footer {
        font-size: smaller;
        padding: 3px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        color: aliceblue;
        background: dodgerblue;
        display: flex;
        justify-content: space-around;
    }

    a {
        color: aliceblue;
        margin: 0 10px;
    }
</style>

<h1>Todo</h1>

<div>
    <input
            type="text"
            placeholder="I want to ..."
            on:keydown="{event => event.key === 'Enter' && todos.add(event.target)}"
    >
    <TodoList title="todo" filter={t => !t.done}/>
    <TodoList title="done" filter={t => t.done}/>

</div>

<footer>
    <a href="https://github.com/LukeStorry/svelte-todo">Sourcecode</a>
    This app uses localStorage to save your todo-list between page refreshes.
    <a href="https://lkst.uk">by Luke Storry</a>
</footer>
