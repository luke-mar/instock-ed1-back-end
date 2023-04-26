const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
    knex("inventories")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving Inventories: ${err}`)
        );
};

exports.singleInventories = (req, res) => {
    knex("inventories")
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
                .send(`Error retrieving inventories  ${req.params.id} ${err}`)
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
