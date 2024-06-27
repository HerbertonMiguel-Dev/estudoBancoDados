// Importa o módulo express
const express = require('express');
// Importa o módulo path para trabalhar com caminhos de arquivos e diretórios
const path = require('path');
// Cria uma instância do aplicativo express
const app = express();
// Define a porta em que o servidor irá rodar
const port = 3000;

// Importa as rotas de filmes e gêneros
const filmesRoutes = require('./routes/filmesRoutes');
const generosRoutes = require('./routes/generosRoutes');

// Define o diretório de arquivos estáticos
app.use(express.static('public'));
// Middleware para processar dados JSON no corpo da requisição
app.use(express.json());
// Middleware para processar dados URL-encoded no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Alterado para extended: true

// Define as rotas para filmes e gêneros
app.use('/filmes', filmesRoutes);
app.use('/generos', generosRoutes);

// Rota principal que serve o arquivo index.html
app.get('/', (req, res) => {
    // Envia o arquivo index.html localizado na pasta public/html
    res.sendFile(path.join(__dirname, 'public/html', 'index.html')); // Caminho corrigido
});

// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});
