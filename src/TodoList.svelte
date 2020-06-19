<script>
    export let title, filter;
    
    import {sendSlide, receiveSlide} from './transitions.js';
    import { flip } from 'svelte/animate';
    import {todos} from './stores.js'
</script>


<style>
    .todo-list {
        float: left;
        width: 50%;
        padding: 0 1em 0 0;
        box-sizing: border-box;
    }

    input:checked + label{
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

    label:hover .remove {
        opacity: 1;
    }
</style>

<div class='todo-list'>
    <h2>{title}</h2>
    {#each $todos.filter(filter) as todo (todo.id)}
        <label
                in:receiveSlide="{{key: todo.id}}"
                out:sendSlide="{{key: todo.id}}"
                animate:flip
        >
            <input type=checkbox checked={todo.done} on:click="{() => todos.check(todo)}">
            {todo.description}
            <button class="remove" on:click="{() => todos.remove(todo)}">remove</button>
        </label>
    {/each}
</div>


