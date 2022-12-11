const db = require("../models");
// const Product = db.products;
const Inventory = db.inventorys;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, products, totalPages, currentPage };
};

// Create and Save a new Inventory
exports.createInventory = (req, res) => {
  const obj = {
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  }
  if(obj){
    return Inventory.create(obj)
    .then((inventory) => {
        console.log(">> Created Inventory: " + JSON.stringify(inventory, null, 4));
        res.statusMessage = 'Created inventory';
        return res.send(inventory);
    })
    .catch((err) => {
        console.log(">> Error while creating inventory: ", err);
        res.send(err).end();
    });

  }else{
    res.send(">> Error while creating inventory: ")
  }
};



// Retrieve all Inventory from the database.
exports.findAll = (req, res) => {
  return Inventory.findAll()
  .then((inventory) => {
    res.statusMessage = 'Showing all Inventorys';
    res.send(inventory).end();
  })
  .catch((err) => {
    console.log(">>Error while picking up the Inventorys");
    res.send(err)
  })
};

// Find a single Inventory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Inventory.findByPk(id)
    .then(inventory => {
      console.log(inventory);
      inventory ? res.send(inventory) : res.status(400).send("Inventory not found for the given id")
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Inventory with id=" + id
      });
    });
};

// Update a Inventory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Inventory.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Inventory was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Inventory with id=${id}. Maybe Inventory was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Inventory with id=" + id
      });
    });
};

// Delete a Inventory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Inventory.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Inventory id ${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete Inventory with id=${id}. Maybe Inventory was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Inventory with id=" + id
      });
    });
};

// Delete all Inventorys from the database.
exports.deleteAll = (req, res) => {
  Inventory.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Inventorys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Inventorys."
      });
    });
};

