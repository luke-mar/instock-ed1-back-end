const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router.route("/").get(warehouseController.index);

// Create a new warehouse using POST
router.route('/').post(warehouseController.addWarehouse);

// Retrieve inventories from a particular warehouse using GET
router.route("/:id/inventories").get(warehouseController.warehouseInventories);

module.exports = router;
