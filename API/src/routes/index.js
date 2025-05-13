const express = require('express');
const router = express.Router();
const secretariaRoutes = require('./secretaria.routes');

router.get('/', (req, res) => res.send('API rodando'));
router.use('/secretarias', secretariaRoutes); // rota da secretaria

module.exports = router;
