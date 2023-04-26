const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
    knex("warehouses")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving Warehouses ${err}`)
        );
};



exports.warehouseInventories = (req, res) => {
    knex("inventories")
        .where({ warehouse_id: req.params.id })
        .then((data) => {
            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                res.status(404).send(
                    `Error retrieving inventories for Warehouse ${req.params.id}`
                );
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error " });
        });
};
