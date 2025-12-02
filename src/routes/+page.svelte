<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { currentUser } from '$lib/store';
  import { goto } from '$app/navigation';
  import Todos from '$lib/Todos.svelte';
  export let data: any;

  let user: string | null = null;
  const unsubscribe = currentUser.subscribe((u) => (user = u));

  let currentTime: Date = new Date();
  let intervalId: number | null = null;

  onMount(() => {
    if (!user) goto('/login');

    if (data?.currentDateTimeMs) {
      currentTime = new Date(Number(data.currentDateTimeMs));
    }

    intervalId = window.setInterval(() => {
      currentTime = new Date(currentTime.getTime() + 1000);
    }, 1000);
  });

  onDestroy(() => {
    if (intervalId !== null) clearInterval(intervalId);
    unsubscribe();
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

{#if currentTime}
  <div class="hora-container">
    <span class="data">{currentTime.toLocaleDateString("pt-BR")}</span>
    <span class="hora">
      {currentTime.toLocaleTimeString("pt-BR", { hour12: false })}
    </span>
  </div>
{/if}

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

  .hora-container {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    margin-top: 10px;
    color: white;
    font-family: "Orbitron", sans-serif;
    font-weight: 700;
  }

  .data {
    font-size: 22px;
    margin-bottom: 4px;
  }

  .hora {
    font-size: 26px;
  }

  .sair {
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
    font-weight: bold;
  }
</style>
