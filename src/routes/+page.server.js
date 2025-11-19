// src/routes/todos/+page.server.js
import { db } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const [todos] = await db.query(`SELECT id, nome AS description, data AS date FROM eventos ORDER BY id DESC`);
    return { todos };
  } catch (error) {
    console.error('Erro ao carregar todos:', error);
    return { todos: [] };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request }) => {
    const form = await request.formData();

    
    const rawDescription = form.get('description');
    const rawDate = form.get('date');

    // converte para string de forma segura
    const description = rawDescription ? String(rawDescription).trim() : '';
    const date = rawDate ? String(rawDate).trim() : '';

    // validações
    if (description.length === 0) {
      return fail(400, { error: true, message: 'A descrição não pode ser vazia.' });
    }

    if (date.length === 0) {
      return fail(400, { error: true, message: 'A data não foi informada.' });
    }

    try {
      await db.execute('INSERT INTO eventos (nome, data) VALUES (?, ?)', [description, date]);
      return { success: true };
    } catch (error) {
      console.error('Erro ao inserir todo:', error);
      return fail(500, { error: true, message: 'Falha ao adicionar a tarefa ao banco de dados.' });
    }
  },

  delete: async ({ request }) => {
    const form = await request.formData();
    const id = form.get('id');

    if (!id) {
      return fail(400, { error: true, message: 'ID da tarefa não fornecido.' });
    }

    try {
      await db.execute('DELETE FROM eventos WHERE id = ?', [id]);
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar todo:', error);
      return fail(500, { error: true, message: 'Falha ao deletar a tarefa do banco de dados.' });
    }
  }
};
