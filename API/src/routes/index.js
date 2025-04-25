const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('API rodando'));

module.exports = router;
