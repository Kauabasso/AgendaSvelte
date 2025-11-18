// src/routes/todos/+page.server.js

import { db } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Função para carregar os dados (todos) para o componente +page.svelte
    try {
        const [todos] = await db.query('SELECT id, nome AS description FROM eventos ORDER BY id DESC');
        return {
            todos: todos
        };
    } catch (error) {
        console.error("Erro ao carregar todos:", error);
        return {
            todos: [] // Retorna uma lista vazia em caso de falha
        };
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    // adicionar uma nova tarefa 
    create: async ({ request }) => {
        const data = await request.formData();
        const description = data.get('description');
        
   
        if (!description || typeof description !== 'string' || description.trim().length === 0) {
            return fail(400, { 
                error: true, 
                message: "A descrição não pode ser vazia." 
            });
        }
        
        // Insere no banco de dados
        try {
            
            const date = new Date().toISOString().slice(0, 10); 
            await db.execute(
                'INSERT INTO eventos (nome, data) VALUES (?, ?)',
                [description, date]
            );
            return { success: true };

        } catch (error) {
            console.error("Erro ao inserir todo:", error);
            return fail(500, { 
                error: true, 
                message: "Falha ao adicionar a tarefa ao banco de dados." 
            });
        }
    },

    // deletar uma tarefa 
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');

        if (!id) {
            return fail(400, { 
                error: true, 
                message: "ID da tarefa não fornecido." 
            });
        }
        
        try {
            await db.execute('DELETE FROM eventos WHERE id = ?', [id]);
            return { success: true };
        } catch (error) {
            console.error("Erro ao deletar todo:", error);
            return fail(500, { 
                error: true, 
                message: "Falha ao deletar a tarefa do banco de dados." 
            });
        }
    }
};