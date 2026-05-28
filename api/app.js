import express from 'express';
import {BD, testarConexao} from './db.js';
import rotasUsuarios from './src/routes/RotasUsuarios.js';
import rotasCategorias from './src/routes/RotasCategorias.js';
import rotasSubcategorias from './src/routes/RotasSubcategoria.js';
import rotasTransacao from './src/routes/RotasTransacao.js';
import rotasDashbord from './src/routes/RotasDashbord.js'

// usando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.use(cors())


app.get('/', async(req, res) =>{
    await testarConexao();
    // res.status(200).json("Api Funcionando");
    res.redirect('/swagger')
})

//Utilizando rotas
app.use(rotasUsuarios);
app.use(rotasCategorias);
app.use(rotasSubcategorias);
app.use(rotasTransacao);
app.use(rotasDashbord);

const porta = 3000;
app.listen(porta, () =>{
    console.log(`http://localhost:${porta}`);
});
