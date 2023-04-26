const knex = require("knex")(require("../knexfile"));
const uuid = require("uuid");

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
    const id = uuid.v4 ();
    console.log (req.body);
    if (
        !req.body.warehouse_name || 
        !req.body.address || 
        !req.body.city || 
        !req.body.country || 
        !req.body.contact_name || 
        !req.body.contact_position || 
        !req.body.contact_phone || 
        !req.body.contact_email
        ) {
        return res.status(400).send('Please make sure to provide name, manager, address, phone and email fields in a request');
    }

    knex('warehouses')
        .insert({...req.body, id})
        .then((data) => {
            const newWarehouseURL = `/warehouses/${data[0]}`;
            res.status(201).location(newWarehouseURL).send(newWarehouseURL);
        })
        .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};

