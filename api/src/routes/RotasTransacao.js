import { Router } from "express";
import { BD } from "../../db.js";

import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

//Listar Transações
router.get('/transacoes', async (req, res) => { 
    try {
        const comando = `SELECT t.id_transacao, t.valor, t.descricao, TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome AS nome_categoria,
        t.id_categoria,
        s.nome AS nome_subcategoria,
        t.id_subcategoria
        FROM TRANSACOES t
        LEFT JOIN CATEGORIAS c ON t.id_categoria = c.id_categoria
        LEFT JOIN SUBCATEGORIAS s ON t.id_subcategoria = s.id_subcategoria`;
        const transacoes = await BD.query(comando);

        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações', error.message);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
//Listar Transações po tipo
router.get('/transacoes/tipo/:tipo', async (req, res) => {
    try {
        const { tipo } = req.params;
        if (tipo !== 'E' && tipo !== 'S') {
            return res.status(400).json({ message: "Tipo inválido. Use E para Entrada ou S para Saída." });
        }
        const comando = `SELECT t.id_transacao, t.valor, t.descricao, TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome AS nome_categoria,
        t.id_categoria,
        s.nome AS nome_subcategoria,
        t.id_subcategoria
        FROM TRANSACOES t
        LEFT JOIN CATEGORIAS c ON t.id_categoria = c.id_categoria
        LEFT JOIN SUBCATEGORIAS s ON t.id_subcategoria = s.id_subcategoria WHERE t.tipo = $1`;
        const transacoes = await BD.query(comando, [tipo]);

        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações por tipo', error.message);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});
//Listar Transações por categoria
router.get('/transacoes/categoria/:id_categoria', async (req, res) => {
    try {
        const { id_categoria } = req.params;
        const comando = `SELECT t.id_transacao, t.valor, t.descricao, TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome AS nome_categoria,
        t.id_categoria,
        s.nome AS nome_subcategoria,
        t.id_subcategoria
        FROM TRANSACOES t
        LEFT JOIN CATEGORIAS c ON t.id_categoria = c.id_categoria
        LEFT JOIN SUBCATEGORIAS s ON t.id_subcategoria = s.id_subcategoria WHERE t.id_categoria = $1`;
        const transacoes = await BD.query(comando, [id_categoria]);

        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações por categoria', error.message);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
//Listar Transações subcategoria
router.get('/transacoes/subcategoria/:id_subcategoria', async (req, res) => {
    try {
        const { id_subcategoria } = req.params;
        const comando = `SELECT t.id_transacao, t.valor, t.descricao, TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome AS nome_categoria,
        t.id_categoria,
        s.nome AS nome_subcategoria,
        t.id_subcategoria
        FROM TRANSACOES t
        LEFT JOIN CATEGORIAS c ON t.id_categoria = c.id_categoria
        LEFT JOIN SUBCATEGORIAS s ON t.id_subcategoria = s.id_subcategoria WHERE t.id_subcategoria = $1`;
        const transacoes = await BD.query(comando, [id_subcategoria]);

        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações por subcategoria', error.message);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
// CADASTRAR Transações
router.post('/transacoes', async (req, res) => {
    try {
        const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;

        const comando = `
            INSERT INTO TRANSACOES 
            (valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria) 
            VALUES ($1, $2, CURRENT_DATE, TO_DATE($3, 'DD/MM/YYYY'), TO_DATE($4, 'DD/MM/YYYY'), $5, $6, $7)
            RETURNING *`;

        const resultado = await BD.query(comando, [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria]);

        return res.status(201).json({ message: "Transação cadastrada com sucesso!" });
    } catch (error) {
        console.error('Erro ao criar transação', error.message);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
//Atualizar
router.put('/transacoes/:id_transacao', async (req, res) => {
    try {
        const { id_transacao } = req.params;
        const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;

        const comando = `
            UPDATE TRANSACOES 
            SET valor = $1, 
                descricao = $2, 
                data_vencimento = TO_DATE($3, 'DD/MM/YYYY'), 
                data_pagamento = TO_DATE($4, 'DD/MM/YYYY'), 
                tipo = $5,
                id_subcategoria = $6,
                id_categoria = $7
            WHERE id_transacao = $8 
            RETURNING *`;

        const resultado = await BD.query(comando, [
            valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_transacao
        ]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }

        return res.status(200).json({ message: "Transação atualizada com sucesso!" });
    } catch (error) {
        console.error('Erro ao atualizar transação', error.message);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
//Deletar
router.delete('/transacoes/:id_transacao', async (req, res) => {
    try {
        const { id_transacao } = req.params;

        const comando = `DELETE FROM TRANSACOES WHERE id_transacao = $1 RETURNING *`;

        const resultado = await BD.query(comando, [id_transacao]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }

        return res.status(200).json({ message: 'Transação removida com sucesso!' });

    } catch (error) {
        console.error('Erro ao deletar transação:', error.message);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
//Listar Transações periodo
router.get('/transacoes/periodo', async (req, res) => {
    const { inicio, fim } = req.query;
    if (!inicio || !fim) {
        return res.status(400).json({ message: 'Informe as datas de inicio e fim. Ex: ?inicio=01/01/2024&fim=31/01/2024' });
    }
    try {
        const comando = `SELECT t.id_transacao, t.valor, t.descricao, TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome AS nome_categoria,
        t.id_categoria,
        s.nome AS nome_subcategoria,
        t.id_subcategoria
        FROM TRANSACOES t
        LEFT JOIN CATEGORIAS c ON t.id_categoria = c.id_categoria
        LEFT JOIN SUBCATEGORIAS s ON t.id_subcategoria = s.id_subcategoria 
        WHERE t.data_registro BETWEEN TO_DATE($1, 'DD/MM/YYYY') AND TO_DATE($2, 'DD/MM/YYYY') 
        ORDER BY t.data_registro DESC`;

        const transacoes = await BD.query(comando, [inicio, fim]);

        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações por período', error.message);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
//Todas as transações
router.get('/transacoes/total', autenticarToken, async (req, res) => {
    const { tipo } = req.query;
    if (!tipo || (tipo !== 'E' && tipo !== 'S')) {
        return res.status(400).json({ message: "Parâmetro 'tipo' inválido ou ausente" });
    }
    try {
        const comando = `
            SELECT SUM(valor) as total
            FROM transacoes 
            WHERE tipo = $1
        `;
        const resultado = await BD.query(comando, [tipo.toUpperCase()]);

        return res.status(200).json({
            total: parseFloat(resultado.rows[0].total) || 0
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});
export default router;