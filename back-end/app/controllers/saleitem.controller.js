const db = require("../models");
const SaleItem = db.saleitems;


// Create and Save a new SaleItem
exports.createSaleItem = (req, res) => {
  const obj = {
    sale_id: req.body.sale_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity
  }
  if(obj){
    return SaleItem.create(obj)
    .then((saleitem) => {
        console.log(">> Created SaleItem: " + JSON.stringify(saleitem, null, 4));
        res.statusMessage = 'Created SaleItem';
        return res.send(saleitem).end();
    })
    .catch((err) => {
        console.log(">> Error while creating saleitem: ", err);
        res.send(err)
    });

  }else{
    res.send(">> Error while creating saleitem: ")
  }
};


// Retrieve all SaleItems from the database.
exports.findAll = (req, res) => {
  return SaleItem.findAll()
  .then((saleitems) => {
    res.statusMessage = 'Showing all SaleItems';
    res.send(saleitems).end();
  })
  .catch((err) => {
    console.log(">>Error while picking up the sale items");
    res.send(err)
  })
};

// Find a single SaleItem with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SaleItem.findByPk(id)
    .then(saleitem => {
      console.log(saleitem);
      saleitem ? res.send(saleitem) : res.status(400).send("SaleItem not found for the given id")
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SaleItem with id=" + id
      });
    });
};

// // Update a SaleItem by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  SaleItem.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SaleItem was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update SaleItem with id=${id}. Maybe SaleItem was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating SaleItem with id=" + id
      });
    });
};


// Delete a SaleItem with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SaleItem.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `SaleItem id ${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete SaleItem with id=${id}. Maybe SaleItem was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete SaleItem with id=" + id
      });
    });
};

// Delete all SaleItems from the database.
exports.deleteAll = (req, res) => {
  SaleItem.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} SaleItems were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all SaleItems."
      });
    });
};