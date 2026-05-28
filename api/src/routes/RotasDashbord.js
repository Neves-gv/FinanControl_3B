import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";


const router = Router();
const SECRET_KEY = 'sua_chave_secreta';

//Endpoints do Dashbord

router.get('/dashboard', autenticarToken, async (req, res) => {
    try {
        // Grafico de Pizza por categoria
        const selecaocategoria = `SELECT c.nome, SUM(t.valor) as total FROM transacoes t
        INNER JOIN categorias c ON t.id_categoria = c.id_categoria
        WHERE t.tipo = 'S'
        GROUP BY c.nome ORDER BY total DESC
        `
        //5 maiores despesas
        const selecaoMaioresGastos = `
        SELECT
        descricao, valor, TO_CHAR(data_registro, 'DD/MM/YYYY') as data_registro
        FROM transacoes
        WHERE tipo = 'S'
        ORDER BY valor DESC
        LIMIT 5
        `
        //card resumo mes
        const selecaoResumoMes = `
         SELECT
           SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) as entradas,
           SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) as saidas,
           SUM(CASE WHEN tipo = 'E' THEN valor ELSE -valor END) as saldo
         FROM transacoes
         WHERE DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)
        `
        // Evolução mensal
        const SelecaoEvolucaoMensal = `
        SELECT
          TO_CHAR(data_registro, 'MM/YYYY') as mes,
          SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) as entradas,
          SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) as saidas
        FROM transacoes
        GROUP BY DATE_TRUNC('month', data_registro), TO_CHAR(data_registro, 'MM/YYYY')
        ORDER BY DATE_TRUNC('month', data_registro) ASC
        `
        // consuta com as 5 utimas transações
        const selecao5Consutautimas = `
       SELECT
        descricao, valor, TO_CHAR(data_registro, 'DD/MM/YYYY') as data
        FROM transacoes
        ORDER BY data DESC
        LIMIT 5
        `

        const resCategoria = await BD.query(selecaocategoria);
        const resMaioresGastos = await BD.query(selecaoMaioresGastos);
        const resResumoMes = await BD.query(selecaoResumoMes);
        const resEvolucaoMensal = await BD.query(SelecaoEvolucaoMensal);
        const res5Consutautimas = await BD.query(selecao5Consutautimas);


        const dadosDashbord = {
            resumoCategoria: resCategoria.rows,
            resumoMaioresGastos: resMaioresGastos.rows,
            resumoMes: resResumoMes.rows[0] || { entradas: 0, saidas: 0, saldo: 0 },
            resumoEvolucaoMensal: resEvolucaoMensal.rows,
            resumo5Consutautimas: res5Consutautimas.rows

        }

        return res.status(200).json(dadosDashbord)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;