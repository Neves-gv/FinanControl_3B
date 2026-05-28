import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';
import { autenticarToken } from "../middlewares/autenticacao.js";

import jst from 'jsonwebtoken';
const router = Router();

// ================= LISTAR USUÁRIOS =================
router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM usuarios WHERE ativo = true ORDER BY id_usuario`;
        const usuarios = await BD.query(query);
        return res.status(200).json(usuarios.rows);
    } catch (error) {
        console.error('Erro ao listar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuarios' })
    }
});

// ================= CADASTRAR USUÁRIO =================
router.post('/usuarios', async (req, res) => {
    const { nome, email, senha, tipo_usuario } = req.body;
    try {
        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        const comando = `INSERT INTO USUARIOS(nome, email, senha, tipo_usuario) VALUES($1, $2, $3, $4)`;
        const valores = [nome, email, senhaCriptografada, tipo_usuario];

        await BD.query(comando, valores);
        return res.status(201).json("Usuário cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar usuarios' })
    }
});

// ================= ATUALIZAR USUÁRIO  =================
router.put('/usuarios/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const { nome, email, senha, tipo_usuario } = req.body;
    try {
        const verificarUsuario = await BD.query(
            `SELECT * FROM USUARIOS WHERE id_usuario = $1 AND ativo = true`,
            [id_usuario]
        );
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const comando = `UPDATE USUARIOS SET nome = $1, email = $2, senha = $3, tipo_usuario = $4 WHERE id_usuario = $5`;
        const valores = [nome, email, senhaCriptografada, tipo_usuario, id_usuario];
        await BD.query(comando, valores);

        return res.status(200).json('Usuario foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' })
    }
});

// ================= PATCH =================
router.patch('/usuarios/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const { nome, email, senha, tipo_usuario } = req.body;

    try {
        const verificarUsuario = await BD.query(`SELECT * FROM USUARIOS WHERE id_usuario = $1 AND ativo = true`, [id_usuario]);
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) { campos.push(`nome = $${contador}`); valores.push(nome); contador++; }
        if (email !== undefined) { campos.push(`email = $${contador}`); valores.push(email); contador++; }
        if (senha !== undefined) {
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            campos.push(`senha = $${contador}`);
            valores.push(senhaCriptografada);
            contador++;
        }
        if (tipo_usuario !== undefined) { campos.push(`tipo_usuario = $${contador}`); valores.push(tipo_usuario); contador++; }

        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }

        valores.push(id_usuario);
        const comando = `UPDATE USUARIOS SET ${campos.join(', ')} WHERE id_usuario = $${contador}`;
        await BD.query(comando, valores);

        return res.status(200).json('Usuário atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar usuario', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
});

// ================= DELETE =================
router.delete('/usuarios/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const comando = `UPDATE USUARIOS SET ativo = false WHERE id_usuario = $1`;
        await BD.query(comando, [id_usuario]);
        return res.status(200).json({ message: "Usuario removido com sucesso" });
    } catch (error) {
        console.error('Erro ao remover usuario', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
});

// ================= LOGIN =================
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const comando = 'SELECT id_usuario, nome, email, senha FROM USUARIOS WHERE email = $1 AND ativo = true';
        const resultado = await BD.query(comando, [email]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ message: 'Email incorreto' });
        }

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }


        const SECRET_KEY = 'sua_chave_secreta';
        //Gerando token para retornar e ser usado
        const token = jst.sign(
            { id_usuario: usuario.id_usuario, email: usuario.email },
            SECRET_KEY,
            // {expiresIn: '15m'}//tempo para expirar o token
        )


        return res.status(200).json({
            message: 'Login realizado',
            token: token,
            usuario: { id_usuario: usuario.id_usuario, nome: usuario.nome }
        });
    } catch (error) {
        console.error('Erro ao realizar login', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
});

export default router;