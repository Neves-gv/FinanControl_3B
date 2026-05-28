import jwt from 'jsonwebtoken'

// Assinatura do servidor (ideal: usar variável de ambiente)
const SECRET_KEY = 'sua_chave_secreta'

export function autenticarToken(req, res, next) {
    const cabecalho = req.headers['authorization']

    // Extrair o token (formato: Bearer TOKEN)
    const token = cabecalho && cabecalho.split(' ')[1]

    // Se não houver token
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    // Verificar o token
    jwt.verify(token, SECRET_KEY, (error, usuario) => {
        if (error) {
            return res.status(403).json({ message: 'Token inválido ou expirado' })
        }

        // Salva o usuário no request
        req.usuario = usuario

        // Continua a execução
        next()
    })
}