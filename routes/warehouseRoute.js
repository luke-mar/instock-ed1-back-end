const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router.route("/").get(warehouseController.index);

router.route("/:id/inventories").get(warehouseController.warehouseInventories);

module.exports = router;
