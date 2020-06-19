<script>
    import {crossfade, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';

    const [send, receive] = crossfade({
        duration: d => d * 2,
        fallback: scale
    });

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
        todos = todos.filter(t => t !== todo);
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

    .todo-list {
        float: left;
        width: 50%;
        padding: 0 1em 0 0;
        box-sizing: border-box;
    }

    h1, h2 {
        text-align: center;
        font-size: 2em;
        font-weight: 200;
        user-select: none;
    }

    label {
        top: 0;
        left: 0;
        display: block;
        font-size: 1em;
        line-height: 1;
        padding: 0.5em;
        margin: 0 auto 0.5em auto;
        border-radius: 2px;
        background-color: #eee;
        user-select: none;
    }

    input {
        margin: 0;
        padding: 0.4em;
        border: 1px solid #ccc;
    }

    .right label {
        background-color: rgb(180, 240, 100);
    }

    button {
        float: right;
        height: 1em;
        box-sizing: border-box;
        padding: 0 0.5em;
        line-height: 1;
        background-color: transparent;
        border: none;
        color: rgb(170, 30, 30);
        opacity: 0;
        transition: opacity 0.2s;
    }

    label:hover button {
        opacity: 1;
    }
</style>

<h1>Svelte-Todo</h1>

<div class='container'>
    <input
            class="input-todo"
            type="text"
            placeholder="Add a new Todo item here"
            on:keydown="{event => event.key === 'Enter' && add(event.target)}"
    >

    <div class='todo-list'>
        <h2>todo</h2>
        {#each todos.filter(t => !t.done) as todo (todo.id)}
            <label
                    in:receive="{{key: todo.id}}"
                    out:send="{{key: todo.id}}"
                    animate:flip
            >
                <input type=checkbox bind:checked={todo.done}>
                {todo.description}
                <button on:click="{() => remove(todo)}">remove</button>
            </label>
        {/each}
    </div>

    <div class='todo-list'>
        <h2>done</h2>
        {#each todos.filter(t => t.done) as todo (todo.id)}
            <label
                    in:receive="{{key: todo.id}}"
                    out:send="{{key: todo.id}}"
                    animate:flip
            >
                <input type=checkbox bind:checked={todo.done}>
                {todo.description}
                <button on:click="{() => remove(todo)}">remove</button>
            </label>
        {/each}
    </div>
</div>

