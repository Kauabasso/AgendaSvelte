<script lang="ts">
  import MainCad from '../MainCad.svelte'; 
  import { goto } from '$app/navigation';
  import { currentUser } from '$lib/store';

  let usuario = '';
  let senha = '';

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (!usuario.trim() || !senha) {
      alert('Preencha todos os campos.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // não permite usuário duplicado
    if (users.some((u: any) => u.usuario === usuario)) {
      alert('Nome de usuário já existe.');
      return;
    }

    const newUser = { usuario, senha };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // ir para home
    currentUser.set(usuario);
    goto('/');
  }
</script>

<MainCad>
  <h1>Cadastro</h1>
  <p>Crie seu usuário e senha para acessar o melhor site de Agenda do MUNDO!!</p>

  <form on:submit={handleSubmit}>
    <label for="usuario">Insira o nome do seu usuário:</label>
    <input id="usuario" type="text" bind:value={usuario} name="usuario" required />

    <label for="senha">Insira a sua senha:</label>
    <input id="senha" type="password" bind:value={senha} name="senha" required />

    <button type="submit">Cadastrar-se</button>
  </form>

  <a class="voltar" href="/login">Voltar</a>
</MainCad>




<style>

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1 {
    margin-bottom: 10px;
    color: black;
  }

  p {
    font-size: 14px;
    color: black;
    margin-bottom: 20px;
    line-height: 1.4;
    word-break: break-word;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  label {
    align-self: flex-start;
    margin-top: 10px;
    font-weight: bold;
    color: #333;
  }

  input {
    padding: 8px;
    margin-top: 5px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: #4caf50;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  button:hover {
    background-color: #45a049;
    transform: scale(1.02);
  }

  .voltar {
    display: block;
    margin-top: 15px;
    text-align: center;
    color: black;
    text-decoration: none;
  }
  .voltar:hover {
    text-decoration: underline;
  }

</style>





