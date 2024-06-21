// const express = require('express');
// const router = express.Router();
// const generosController = require('../controllers/generosController');

// router.get('/listarGeneros', generosController.getAll);
// router.get('/buscarGenero/:id', generosController.getById);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const generosController = require('../controllers/generosController');

// router.get('/listarGeneros', generosController.getAll);
// router.get('/buscarGenero/:name', generosController.searchByName);

// module.exports = router;


const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generosController');

router.get('/listarGeneros', generoController.listarGeneros);
router.post('/adicionarGenero', generoController.cadastrarGenero);
router.put('/atualizarGenero/:id', generoController.atualizarGenero);
router.delete('/excluirGenero/:id', generoController.deletarGenero);

module.exports = router;

