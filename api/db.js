import { Pool } from 'pg';

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'bd_finan_control_3b',
    port: 5432,
});

// const BD = new Pool({
//     connectionString: "postgres://postgres.hxhlxctvvjszeqvqwhie:jEUcJ9YcwUdoqhGq@aws-1-us-east-1.pooler.supabase.com:5432/postgres",
//     ssl: {
//         rejectUnauthorized: false // O Supabase requer SSL
//     }
// });

const testarConexao = async () => {
    try {
        const cliente = await BD.connect();
        console.log('Conexão com PostgreSQL realizada com sucesso ✅');
        cliente.release();
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error.message);
    }
};

export { BD, testarConexao };