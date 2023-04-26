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

exports.singleWarehouse = (req, res) => {
    knex("warehouses")
        .where({ id: req.params.id })
        .then((data) => {
            // If record is not found, respond with 404
            if (!data.length) {
                return res
                    .status(404)
                    .send(`Record with id: ${req.params.id} is not found`);
            }
            // Knex returns an array of records, so we need to send response with a single object only
            res.status(200).json(data[0]);
        })
        .catch((err) =>
            res
                .status(400)
                .send(`Error retrieving warehouse ${req.params.id} ${err}`)
        );
};

  exports.updateWarehouse = (req, res) => {
    knex('warehouses')
      .update(req.body)
      .where({ id: req.params.id })
      .then((count) => {
        //Check if received data count is 1 or 0 (empty). If 0 (empty), return "Not Found" message.
        if (count===0) {
          return res.status(404).send(`Record with id: ${req.params.id} is not found`);
        }
        //Validation checks for data. Check for empty fields.
        if (!req.body.warehouse_name || !req.body.address || !req.body.city || !req.body.country || !req.body.contact_name || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email) {
          return res.status(400).send(`Please fill out all fields!`);
        }
        //Ensure the phone number field contains numbers and is 10 digits in length.
        if (!req.body.contact_phone.match(/^[0-9]+$/) || req.body.contact_phone.length !== 10) {
          return res.status(400).send(`Please enter a valid phone number with area code.`);
        }
        //Ensure the email address contains the at symbol and a period for the domain portion.
        if (!req.body.contact_email.includes("@") || !req.body.contact_email.includes(".")) {
          return res.status(400).send(`Please enter a valid email address.`);
        }
        //Send success message if the update is successful.
        res.status(200).send(`Warehouse with id: ${req.params.id} has been updated`);
      })
      .catch((err) => {
        res.status(400).send(`Error updating Warehouse!!!! ${req.params.id} ${err}`)}
      );
  };


let emptyArray = [];
exports.warehouseInventories = (req, res) => {
    knex("inventories")
        .where({ warehouse_id: req.params.id })
        .then((data) => {
            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                res.status(404).send(emptyArray);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error " });
        });
};

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

