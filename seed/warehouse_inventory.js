const inventoryData = require ("../seeds/02_inventories");
const warehouseData = require ("../seeds/01_warehouses");

// isaac: this file was created based on the cda, i changed the file names 
// so they could match this project.
// I ran knex seed:run

exports.seed = function (knex) {
  return knex('warehouses')
    .del()
    .then(function () {
      return knex('warehouses').insert(warehouseData);
    })
    .then(() => {
      return knex('inventories').del();
    })
    .then(() => {
      return knex('inventories').insert(inventoryData);
    });
};