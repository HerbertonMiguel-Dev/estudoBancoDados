// Importa o módulo express
const express = require('express');
// Cria um novo roteador
const router = express.Router();
// Importa o controller de gêneros do arquivo generosController.js
const generoController = require('../controllers/generosController');

// Define a rota para listar gêneros e mapeia para o método listarGeneros do controller
router.get('/listarGeneros', generoController.listarGeneros);

// Define a rota para adicionar um gênero e mapeia para o método cadastrarGenero do controller
router.post('/adicionarGenero', generoController.cadastrarGenero);

// Define a rota para atualizar um gênero e mapeia para o método atualizarGenero do controller
// O parâmetro :id na URL permite passar o ID do gênero a ser atualizado
router.put('/atualizarGenero/:id', generoController.atualizarGenero);

// Define a rota para excluir um gênero e mapeia para o método deletarGenero do controller
// O parâmetro :id na URL permite passar o ID do gênero a ser excluído
router.delete('/excluirGenero/:id', generoController.deletarGenero);

// Exporta o roteador para ser utilizado em outras partes do aplicativo
module.exports = router;
