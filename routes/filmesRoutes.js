// Importa o módulo express
const express = require('express');
// Cria um novo roteador
const router = express.Router();
// Importa o controller de filmes do arquivo filmesController.js
const filmeController = require('../controllers/filmesController');

// Define a rota para listar filmes e mapeia para o método listarFilmes do controller
router.get('/listarFilmes', filmeController.listarFilmes);

// Define a rota para adicionar um filme e mapeia para o método cadastrarFilme do controller
router.post('/adicionarFilme', filmeController.cadastrarFilme);

// Define a rota para atualizar um filme e mapeia para o método atualizarFilme do controller
// O parâmetro :id na URL permite passar o ID do filme a ser atualizado
router.put('/atualizarFilme/:id', filmeController.atualizarFilme);

// Define a rota para excluir um filme e mapeia para o método deletarFilme do controller
// O parâmetro :id na URL permite passar o ID do filme a ser excluído
router.delete('/excluirFilme/:id', filmeController.deletarFilme);

// Exporta o roteador para ser utilizado em outras partes do aplicativo
module.exports = router;
