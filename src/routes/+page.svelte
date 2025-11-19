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
<div class="bem-vindo">
  <h1>Bem vindo a sua Agenda, {user}!</h1>
</div>
<Todos {data} />

  <button class="sair" on:click={logout}>Sair</button>

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
  

  font-family: "Josefin Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;

}

  .bem-vindo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #7ae47e;
    color: white;
    border: 6px solid black;
  }

  .sair{
    position: absolute;
    top: 20px;
    right: 20px;
    color: white; 
    border:none; 
    cursor:pointer;
    height: 50px;
    background-color: #7ae47e;
    font-size: 25px;
    font-family: "Josefin Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-weight: bold;

  }

</style>
