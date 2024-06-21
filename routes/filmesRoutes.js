const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmesController');

router.get('/listarFilmes', filmeController.listarFilmes);
router.post('/adicionarFilme', filmeController.cadastrarFilme);
router.put('/atualizarFilme/:id', filmeController.atualizarFilme);
router.delete('/excluirFilme/:id', filmeController.deletarFilme);

module.exports = router;




