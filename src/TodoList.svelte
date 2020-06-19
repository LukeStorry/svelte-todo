<script>
    export let title, filter;
    
    import {sendSlide, receiveSlide} from './transitions.js';
    import { flip } from 'svelte/animate';
    import {todos} from './stores.js'
</script>


<style>
    div {
        float: left;
        width: 50%;
        padding: 0 0.5em 3em 0.5em;
        box-sizing: border-box;
    }
    
    h2 {
        font-size: 2em;
        font-weight: 200;
        user-select: none;
    }

    label {
        display: block;
        padding: 0.5em;
        margin: 0.5em auto;
        border-radius: 10px;
        background-color: dodgerblue;
        user-select: none;
        color: white;
    }

    .checked {
        background-color: lightblue;
    }

    button {
        opacity: 0;
        transition: opacity 0.2s;
        float: right;
        box-sizing: border-box;
        padding: 0.2em;
        border: none;
        border-radius: 5px;
        color: lightcoral;
        background-color: white;
    }

    button:hover {
        opacity: 0.5;
    }
    
    button:focus {
        outline: 0;
        opacity: 0.9;
        color: red;
    }
</style>

<div>
    <h2>{title}</h2>
    {#each $todos.filter(filter) as todo (todo.id)}
        <label
                class:checked={todo.done}
                in:receiveSlide="{{key: todo.id}}"
                out:sendSlide="{{key: todo.id}}"
                animate:flip
        >
            <input type=checkbox checked={todo.done} on:click="{() => todos.check(todo)}">
            {todo.text}
            <button on:click="{() => todos.remove(todo)}">remove</button>
        </label>
    {/each}
</div>


