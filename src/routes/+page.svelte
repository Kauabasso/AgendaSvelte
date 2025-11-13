<script lang="ts">
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/store';
  import { goto } from '$app/navigation';

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
  
  <button on:click={logout}>Sair</button>

{/if}

<style>
  h1 { 
    font-size: 2rem; 
    margin-bottom: 1rem; 
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
