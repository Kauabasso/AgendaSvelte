<script lang="ts">
  export let data: any;

  let showEditModal = false;
  let editId: number | null = null;
  let editDescription = "";
  let editDate = "";

  function formatDate(dateValue: any): string {
    if (!dateValue) return "";
    return new Date(dateValue).toLocaleDateString("pt-BR");
  }

  function openEdit(todo: any) {
    editId = todo.id;
    editDescription = todo.description;
    editDate = String(todo.date).split("T")[0];
    showEditModal = true;
  }
  function closeEdit() {
    showEditModal = false;
  }
</script>

<div class="centered">
  <h1>Adicione seus compromissos aqui!</h1>

  <form method="POST" action="?/create" class="form-add">
    <input name="description" placeholder="Compromisso" autocomplete="off" />
    <input type="date" name="date" />
    <button type="submit" class="marcar">Marcar</button>
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
          <td class="acoes">

            <!-- Editar -->
            <button type="button" class="editar" on:click={() => openEdit(todo)}>
              <span class="edit material-symbols-outlined">
edit
</span>
            </button>

            <!-- Deletar -->
            <form method="POST" action="?/delete">
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" class="delete"><span class="material-symbols-outlined">
delete
</span></button>
            </form>

          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>


{#if showEditModal}


<button
  type="button"
  class="overlay"
  on:click={closeEdit}
  aria-label="Fechar janela de edição"
></button>

<div
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="titulo-editar"
>
  <div
  class="modal-content"
  role="button"
  tabindex="0"
  on:click|stopPropagation
  on:keydown={(e) => {
    if (e.key === "Enter" || e.key === " ") e.stopPropagation();
  }}
>
  <h2 id="titulo-editar">Editar compromisso</h2>

  <form method="POST" action="?/update">
    <input type="hidden" name="id" value={editId} />

     <label for="edit-description">Compromisso:</label>
    <input id="edit-description" name="description" bind:value={editDescription} />

    <label for="edit-date">Data:</label>
    <input id="edit-date" type="date" name="date" bind:value={editDate} />

    <button type="submit" class="salvar">Salvar alterações</button>
    <button type="button" class="cancelar" on:click={closeEdit}>Cancelar</button>
  </form>
</div>

</div>
{/if}

<style>
  h1{
    color: white;
  }
h1, table, input, button {
   font-family: "Josefin Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-weight: bold;
}
.centered {
  max-width: 30em;
  margin: 0 auto;
  margin-top: -30px;
  box-sizing: border-box;
  font-family: "Roboto", Arial, sans-serif;
}


.form-add {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}


.centered input[name="description"],
.centered input[type="text"],
.centered input[type="date"],
.form-add input {
  width: 100%;
  outline: none;
  border: 3px solid #000;
  padding: 15px;
  font-size: 18px;
  background: #fff;
  color: #000;
  transform-style: preserve-3d;
  transform: translateZ(10px);
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  margin-top: 6px;
  border-radius: 6px;
  letter-spacing: -0.5px;
  box-shadow: 5px 5px 0 #000;
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;
}

.centered input[name="description"]::placeholder,
.centered input[type="text"]::placeholder {
  color: #666;
  font-weight: bold;
  text-transform: uppercase;
}


.centered input[name="description"]:hover,
.centered input[name="description"]:focus,
.centered input[type="text"]:hover,
.centered input[type="text"]:focus,
.centered input[type="date"]:hover,
.centered input[type="date"]:focus,
.form-add input:hover,
.form-add input:focus {
  background: #cccbcb;
  transform: translateZ(20px) translateX(-5px) translateY(-5px);
  box-shadow: 10px 10px 0 #000;
}


.centered input[type="date"] {
  color-scheme: light;
}


.marcar {
  margin-top: 6px;
  padding: 14px 18px;
  background: #e9b50b;
  color: #000;
  border: 3px solid #000;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transform-style: preserve-3d;
  transform: translateZ(20px);
  transition: all 260ms cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 5px 5px 0 #000;
  letter-spacing: -0.5px;
  border-radius: 6px;
  align-self: flex-start;
}

.marcar:hover,
.marcar:focus {
  transform: translateZ(10px) translateX(-5px) translateY(-5px);
  box-shadow: 10px 10px 0 #000;
  background: #f8c52b;
}


.tabela,
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: #fff;
  border: 4px solid #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 10px 10px 0 #000;
  transition: all 300ms ease;
  box-sizing: border-box;

  transform: none !important;
}

.tabela:hover,
table:hover {
  transform: scale(1.015);
  box-shadow: 18px 18px 0 #000;
}




.tabela thead,
table thead {
  background: #e9b50b;
  color: #000;
  font-weight: bold;
  border-bottom: 3px solid #000;
}

.tabela th,
.tabela td,
table th,
table td {
  padding: 12px;
  text-align: left;
  vertical-align: middle;
}

.tabela tr:hover,
table tr:hover {
  background: #e7e5e5;
}

.acoes {
  display: flex;
  gap: 10px;
  align-items: center;
  height: 100%;
}


.editar,
.delete {
  padding: 6px !important;
  height: 36px;       
  width: 36px;         
  min-width: unset;    
  display: flex;
  align-items: center;
  justify-content: center;
}


.delete {
  background: #ff6b6b;
  color: #000;
  border: 3px solid black;
  border-radius: 5px;
  cursor: pointer;
}

.editar:hover,
.delete:hover,
.editar:focus,
.delete:focus {
  transform: translateY(-3px);
  box-shadow: 4px 4px 0 #000;
}


.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}


.overlay {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}


.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 4px solid #000;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
  width: 380px;
  max-width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 8px 8px 0 #000;
  animation: popIn 180ms cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
}


.modal:focus {
  outline: none;
}


.modal input[type="text"],
.modal input[type="date"],
.modal input,
.modal textarea {
  width: 100%;
  padding: 12px;
  border: 3px solid #000;
  font-size: 16px;
  background: #fff;
  box-sizing: border-box;
}


.salvar,
.cancelar {
  padding: 10px 12px;
  border: 3px solid #000;
  cursor: pointer;
  font-weight: bold;
  border-radius: 6px;
}

.salvar {
  background: #4caf50;
  color: #fff;
}

.cancelar {
  background: #bbb;
  color: #000;
}

.modal .buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}



.input__container {
  position: relative;
  background: #f0f0f0;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  border: 4px solid #000;
  max-width: 350px;
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
  transform: rotateX(10deg) rotateY(-10deg);
  perspective: 1000px;
  box-shadow: 10px 10px 0 #000;
  box-sizing: border-box;
}

.input__container:hover {
  transform: rotateX(5deg) rotateY(1deg) scale(1.05);
  box-shadow: 25px 25px 0 -5px #e9b50b, 25px 25px 0 0 #000;
}

.shadow__input {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
  transform: translateZ(-50px);
  background: linear-gradient(
    45deg,
    rgba(255, 107, 107, 0.4) 0%,
    rgba(255, 107, 107, 0.1) 100%
  );
  filter: blur(20px);
}

.input__button__shadow {
  cursor: pointer;
  border: 3px solid #000;
  background: #e9b50b;
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  transform: translateZ(20px);
  position: relative;
  z-index: 3;
  font-weight: bold;
  text-transform: uppercase;
}

.input__button__shadow:hover {
  background: #e9b50b;
  transform: translateZ(10px) translateX(-5px) translateY(-5px);
  box-shadow: 5px 5px 0 0 #000;
}

.input__button__shadow svg {
  fill: #000;
  width: 25px;
  height: 25px;
}

.input__search {
  width: 100%;
  outline: none;
  border: 3px solid #000;
  padding: 15px;
  font-size: 18px;
  background: #fff;
  color: #000;
  transform: translateZ(10px);
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 3;
  letter-spacing: -0.5px;
  box-sizing: border-box;
}

.input__search::placeholder {
  color: #666;
  font-weight: bold;
  text-transform: uppercase;
}

.input__search:hover,
.input__search:focus {
  background: #f0f0f0;
  transform: translateZ(20px) translateX(-5px) translateY(-5px);
  box-shadow: 5px 5px 0 0 #000;
}

.input__container::before {
  content: "USERNAME";
  position: absolute;
  top: -15px;
  left: 20px;
  background: #e9b50b;
  color: #000;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 14px;
  transform: translateZ(50px);
  z-index: 4;
  border: 2px solid #000;
}


.editar {
  border: 3px solid #000;
  cursor: pointer;
  padding: 8px;
  min-width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 160ms ease, box-shadow 160ms ease;
  border-radius: 6px;
  background: #ffd54f;
}

.material-symbols-outlined {
  font-size: 22px;
  line-height: 1;
}

</style>
