import express from 'express';
import { BD, testarConexao } from './db.js';
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
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.use(cors())

// Adicione:
app.get('/swagger', (req, res) => {
    res.send(`<!DOCTYPE html>
<html><head>
  <title>API FinaControl</title>
  <meta charset="utf-8"/>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head><body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      spec: ${JSON.stringify(documentacao)},
      dom_id: '#swagger-ui'})
  </script>
</body></html>`);
});

app.get('/', async (req, res) => {
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
app.listen(porta, () => {
    console.log(`http://localhost:${porta}`);
});
