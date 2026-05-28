import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//  LISTAR CATEGORIAS
router.get('/categorias', async (req, res) => {
    try {
        const comando = `SELECT * FROM CATEGORIAS WHERE ativo = '1'`;
        const categorias = await BD.query(comando);

        return res.status(200).json(categorias.rows);
    } catch (error) {
        console.error('Erro ao listar categorias', error.message);
        return res.status(500).json({ error: 'Erro ao listar categorias' });
    }
});

// CADASTRAR CATEGORIA
router.post('/categorias', async (req, res) => {
    const { nome, descricao, cor, icone, tipo } = req.body;
    try {
        const comando = `
            INSERT INTO CATEGORIAS (nome, descricao, cor, icone, tipo, ativo) 
            VALUES ($1, $2, $3, $4, $5, '1') RETURNING *
        `;
        const valores = [nome, descricao, cor, icone, tipo];
        const resultado = await BD.query(comando, valores);
        return res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar categoria', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar categoria' });
    }
});

//  ATUALIZAR CATEGORIA
router.put('/categorias/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    const { nome, descricao, cor, icone, tipo } = req.body;

    try {
        const verificar = await BD.query(
            `SELECT * FROM CATEGORIAS WHERE id_categoria = $1 AND ativo = '1'`,
            [id_categoria]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        const comando = `
            UPDATE CATEGORIAS 
            SET nome = $1, descricao = $2, cor = $3, icone = $4, tipo = $5
            WHERE id_categoria = $6
        `;
        const valores = [nome, descricao, cor, icone, tipo, id_categoria];
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar categoria', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
});

// ATUALIZAR PARCIALMENTE CATEGORIA (PATCH)
router.patch('/categorias/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    const { nome, descricao, cor, icone, tipo } = req.body;

    try {
        const verificar = await BD.query(
            `SELECT * FROM CATEGORIAS WHERE id_categoria = $1 AND ativo = '1'`,
            [id_categoria]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) { campos.push(`nome = $${contador}`); valores.push(nome); contador++; }
        if (descricao !== undefined) { campos.push(`descricao = $${contador}`); valores.push(descricao); contador++; }
        if (cor !== undefined) { campos.push(`cor = $${contador}`); valores.push(cor); contador++; }
        if (icone !== undefined) { campos.push(`icone = $${contador}`); valores.push(icone); contador++; }
        if (tipo !== undefined) { campos.push(`tipo = $${contador}`); valores.push(tipo); contador++; }

        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" });
        }

        valores.push(id_categoria);
        const comando = `UPDATE CATEGORIAS SET ${campos.join(', ')} WHERE id_categoria = $${contador}`;
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar parcialmente categoria', error.message);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

//  DELETAR 
router.delete('/categorias/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;

    try {
        const comando = `
            UPDATE CATEGORIAS 
            SET ativo = '0' 
            WHERE id_categoria = $1
        `;
        await BD.query(comando, [id_categoria]);

        return res.status(200).json({ message: "Categoria removida com sucesso!" });
    } catch (error) {
        console.error('Erro ao remover categoria', error.message);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
});

export default router;