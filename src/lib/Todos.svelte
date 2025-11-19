<script lang="ts">
  export let data: any;

  function formatDate(dateString: string | null): string {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
</script>


<div class="centered">
  <h1>Adicione seus compromissos aqui!</h1>

  <form method="POST" action="?/create">
    <input name="description" placeholder="Compromisso" autocomplete="off" />
    <input type="date" name="date" />
    <button type="submit">Marcar</button>
  </form>

  <table class="tabela">
    <thead>
      <tr>
        <th>Compromisso</th>
        <th>Data</th>
        <th>Ação</th>
      </tr>
    </thead>

    <tbody>
      {#each data.todos as todo (todo.id)}
        <tr>
          <td>{todo.description}</td>
         <td>{formatDate(todo.date)}</td>
          <td>
            <form method="POST" action="?/delete">
              <input type="hidden" name="id" value={todo.id} />
              <button aria-label="Deletar">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>


<style>
  .centered {
    max-width: 25em;
    margin: 0 auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    background: white;
    border-radius: 8px;
    overflow: hidden;
  }

  thead {
    background: #ddd;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }

  tr:hover {
    background: #f5f5f5;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    opacity: 0.6;
    transition: 0.2s;
  }
  
  button:hover {
    opacity: 1;
  }

  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
  }
</style>


