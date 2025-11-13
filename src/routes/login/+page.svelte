<script lang="ts">
  import MainCad from '../MainCad.svelte'; 
  import { goto } from '$app/navigation';
  import { currentUser } from '$lib/store';

  let usuario = '';
  let senha = '';

  function handleLogin(e: Event) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u: any) => u.usuario === usuario && u.senha === senha);

    if (!user) {
      alert('Usuário ou senha incorretos.');
      return;
    }

    // ir para home
    currentUser.set(user.usuario);
    goto('/');
  }
</script>

<MainCad>
  <h1>Login</h1>
  <p>Insira seu usuário e senha para acessar o melhor site de Agenda do MUNDO!!</p>

  <form on:submit={handleLogin}>
    <label for="usuario">Usuário:</label>
    <input id="usuario" type="text" bind:value={usuario} required />

    <label for="senha">Senha:</label>
    <input id="senha" type="password" bind:value={senha} required />
    <a class="cadastro-link" href="/cadastro">Não tem uma conta? Cadastre-se aqui</a>

    <button type="submit">Entrar</button>
  </form>
</MainCad>




<style>

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }



:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(90deg,rgba(35, 106, 117, 1) 18%,rgba(87, 199, 133, 1) 67%, rgba(175, 237, 83, 1) 95%);
}

  
   .cadastro-link {
    color: black;
    text-decoration: none;
  }
  .cadastro-link:hover {
    text-decoration: underline;
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

</style>
