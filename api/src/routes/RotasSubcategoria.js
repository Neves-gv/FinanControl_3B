import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//  LISTAR SUBCATEGORIAS
router.get('/subcategorias', async (req, res) => {
    try {
        const comando = `SELECT * FROM SUBCATEGORIAS WHERE ativo = '1'`;
        const subcategorias = await BD.query(comando);

        return res.status(200).json(subcategorias.rows);
    } catch (error) {
        console.error('Erro ao listar subcategorias', error.message);
        return res.status(500).json({ error: 'Erro ao listar subcategorias' });
    }
});

// LISTAR SUBCATEGORIAS POR CATEGORIA
router.get('/subcategorias/categoria/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    try {
        const comando = `SELECT * FROM SUBCATEGORIAS WHERE id_categoria = $1 AND ativo = '1'`;
        const subcategorias = await BD.query(comando, [id_categoria]);

        return res.status(200).json(subcategorias.rows);
    } catch (error) {
        console.error('Erro ao listar subcategorias por categoria', error.message);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// CADASTRAR SUBCATEGORIA
router.post('/subcategorias', async (req, res) => {
    const { nome, id_categoria } = req.body;
    try {
        // Verifica se a categoria existe
        const verificaCat = await BD.query(`SELECT id_categoria FROM CATEGORIAS WHERE id_categoria = $1 AND ativo = '1'`, [id_categoria]);
        if (verificaCat.rows.length === 0) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }

        const comando = `
            INSERT INTO SUBCATEGORIAS (nome, id_categoria, ativo) 
            VALUES ($1, $2, '1') RETURNING *
        `;
        const valores = [nome, id_categoria];
        const resultado = await BD.query(comando, valores);
        return res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar subcategoria', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar subcategoria' });
    }
});

//  ATUALIZAR SUBCATEGORIA
router.put('/subcategorias/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params;
    const { nome, id_categoria } = req.body;

    try {
        const verificar = await BD.query(
            `SELECT * FROM SUBCATEGORIAS WHERE id_subcategoria = $1 AND ativo = '1'`,
            [id_subcategoria]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Subcategoria não encontrada' });
        }

        const comando = `
            UPDATE SUBCATEGORIAS 
            SET nome = $1, id_categoria = $2
            WHERE id_subcategoria = $3
        `;
        const valores = [nome, id_categoria, id_subcategoria];

        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Subcategoria atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar subcategoria', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar subcategoria' });
    }
});

// ATUALIZAR PARCIALMENTE SUBCATEGORIA (PATCH)
router.patch('/subcategorias/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params;
    const { nome, id_categoria } = req.body;

    try {
        const verificar = await BD.query(
            `SELECT * FROM SUBCATEGORIAS WHERE id_subcategoria = $1 AND ativo = '1'`,
            [id_subcategoria]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Subcategoria não encontrada' });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) { campos.push(`nome = $${contador}`); valores.push(nome); contador++; }
        if (id_categoria !== undefined) { campos.push(`id_categoria = $${contador}`); valores.push(id_categoria); contador++; }

        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" });
        }

        valores.push(id_subcategoria);
        const comando = `UPDATE SUBCATEGORIAS SET ${campos.join(', ')} WHERE id_subcategoria = $${contador}`;
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Subcategoria atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar parcialmente subcategoria', error.message);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

//  DELETAR SUBCATEGORIA
router.delete('/subcategorias/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params;

    try {
        const comando = `
            UPDATE SUBCATEGORIAS 
            SET ativo = '0' 
            WHERE id_subcategoria = $1
        `;
        await BD.query(comando, [id_subcategoria]);

        return res.status(200).json({ message: "Subcategoria removida com sucesso!" });
    } catch (error) {
        console.error('Erro ao remover subcategoria', error.message);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
});

export default router;