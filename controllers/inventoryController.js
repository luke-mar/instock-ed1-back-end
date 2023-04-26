const knex = require("knex")(require("../knexfile"));
const uuid = require("uuid");

exports.index = (_req, res) => {
    knex("inventories")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving Inventories: ${err}`)
        );
};

exports.updateInventories = (req, res) => {
    if (
        !req.body.warehouse_id ||
        !req.body.item_name ||
        !req.body.description ||
        !req.body.category ||
        !req.body.status ||
        !req.body.quantity
    ) {
        return res
            .status(400)
            .send(
                "Please make sure all fields are filled: warehouse id, item name, description, category, status, and quantity"
            );
    }

    if (isNaN(req.body.quantity)) {
        return res.status(400).send(`Inventory must be a number`);
    }

    knex("inventories")
        .update(req.body)
        .where({ id: req.params.id })
        .then(() => {
            res.status(200).send(
                `Inventories with id: ${req.params.id} has been updated`
            );
        })
        .catch((err) =>
            res
                .status(400)
                .send(`Error updating inventories ${req.params.id} ${err}`)
        );
};


let emptyObject = {};
exports.singleInventory = (req, res) => {
  knex('inventories')
    .where({ id: req.params.id })
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        return res.status(404).send(emptyObject);
      }

      // Knex returns an array of records, so we need to send response with a single object only
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`)
    );
};

exports.addInventory = (req, res) => {
    const id = uuid.v4 ();
    console.log (req.body);
    if (
        !req.body.warehouse_id || 
        !req.body.item_name || 
        !req.body.description || 
        !req.body.category || 
        !req.body.status ||
        !req.body.quantity 
        ) {
        return res.status(400).send('Please make sure to provide warehouse ID, item name, description, category, status, and quantity fields in a request.');
    }

    knex('inventories')
        .insert({...req.body, id})
        .then((data) => {
            const newInventoryURL = `/inventories/${data[0]}`;
            res.status(201).location(newInventoryURL).send(newInventoryURL);
        })
        .catch((err) => res.status(400).send(`Error creating Inventory: ${err}`));
};