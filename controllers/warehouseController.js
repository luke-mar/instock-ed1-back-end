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

// 
exports.addWarehouse = (req, res) => {
    if (!req.body.name || !req.body.manager || !req.body.address || !req.body.phone || !req.body.email) {
      return res.status(400).send('Please make sure to provide name, manager, address, phone and email fields in a request');
    }
  
    knex('warehouse')
      .insert(req.body)
      .then((data) => {
        const newWarehouseURL = `/warehouses/${data[0]}`;
        res.status(201).location(newWarehouseURL).send(newWarehouseURL);
      })
      .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
  };