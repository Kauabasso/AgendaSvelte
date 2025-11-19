<script lang="ts">
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/store';
  import { goto } from '$app/navigation';
  import Todos from '$lib/Todos.svelte';
   export let data;
  

  let user: string | null = null;

  const unsubscribe = currentUser.subscribe((u) => (user = u));

  onMount(() => {
    if (!user) goto('/login');
  });

  function logout() {
    currentUser.set(null);
    goto('/login');
  }
</script>

{#if user}
  <h1>Bem vindo a sua Agenda, {user}!</h1>
  <Todos {data} />

  <button on:click={logout}>Sair</button>

{/if}

<style>
  h1 { 
    font-size: 2rem; 
    margin-bottom: 1rem; 
  }

:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(90deg,rgba(35, 106, 117, 1) 18%,rgba(87, 199, 133, 1) 67%, rgba(175, 237, 83, 1) 95%);
}

  
  button { 
    padding: 8px 12px; 
    border-radius: 6px; 
    background:#4caf50; 
    color:white; 
    border:none; 
    cursor:pointer;
    }
</style>
