const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');

router
.route('/').get(inventoryController.index);

router
.put('/:id')(inventoryController.updateInventories);

module.exports = router;