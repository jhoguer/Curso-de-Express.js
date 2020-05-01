const express = require('express');
const actions = require('../actions');
const router = express.Router();

router.get('/', actions.productsRouter);

module.exports = router;