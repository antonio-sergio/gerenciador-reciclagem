const db = require("../models");
const Sale = db.sales;


// Create and Save a new Sale
exports.createSale = (req, res) => {
  const obj = {
    total_amount: req.body.total_amount,
  }
  if (obj) {
    return Sale.create(obj)
      .then((sale) => {
        console.log(">> Created sale: " + JSON.stringify(sale, null, 4));
        res.statusMessage = 'Created sale';
        return res.send(sale).end();
      })
      .catch((err) => {
        console.log(">> Error while creating sale: ", err);
        res.send(err)
      });

  } else {
    res.send(">> Error while creating sale: ")
  }
};


// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
  return Sale.findAll()
  .then((sales) => {
    res.statusMessage = 'Showing all sales';
    res.send(sales).end();
  })
  .catch((err) => {
    console.log(">>Error while picking up the sales");
    res.send(err)
  })
};

// Find a single Sale with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sale.findByPk(id)
    .then(sale => {
      console.log(sale);
      sale ? res.send(sale).end() : res.status(400).send("Sale not found for the given id").end()
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sale with id=" + id
      });
    });
};

// // Update a Sale by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Sale.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sale with id=${id}. Maybe Sale was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sale with id=" + id
      });
    });
};

// Delete a Sale with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sale.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Sale id ${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete Sale with id=${id}. Maybe Sale was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sale with id=" + id
      });
    });
};

// Delete all Sales from the database.
exports.deleteAll = (req, res) => {
  Sale.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Sales were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sales."
      });
    });
};
