const express = require('express');
const router = express.Router();
const SecretariaController = require('../controllers/SecretariaController');

router.post('/', SecretariaController.criar);
router.get('/', SecretariaController.listar);
router.get('/:id', SecretariaController.buscar);
router.put('/:id', SecretariaController.atualizar);
router.delete('/:id', SecretariaController.deletar);

module.exports = router;
