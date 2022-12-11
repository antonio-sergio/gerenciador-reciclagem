const db = require("../models");
const BuyItem = db.buyitems;


// Create and Save a new BuyItem
exports.createBuyItem = (req, res) => {
  const obj = {
    buy_id: req.body.buy_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  }
  if(obj){
    return BuyItem.create(obj)
    .then((buyitem) => {
        console.log(">> Created buyitem: " + JSON.stringify(buyitem, null, 4));
        res.statusMessage = 'Created BuyItem';
        return res.send(buyitem).end();
    })
    .catch((err) => {
        console.log(">> Error while creating buyitem: ", err);
        res.send(err)
    });

  }else{
    res.send(">> Error while creating buyitem: ")
  }
};

// Retrieve all BuyItems from the database.
exports.findAll = (req, res) => {
  return BuyItem.findAll()
  .then((buyitems) => {
    res.statusMessage = 'Showing all BuyItems';
    res.send(buyitems).end();
  })
  .catch((err) => {
    console.log(">>Error while picking up the buy items");
    res.send(err)
  })
};

// Find a single BuyItem with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BuyItem.findByPk(id)
    .then(buyitem => {
      console.log(buyitem);
      buyitem ? res.send(buyitem) : res.status(400).send("BuyItem not found for the given id")
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving BuyItem with id=" + id
      });
    });
};

// // Update a BuyItem by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  BuyItem.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "BuyItem was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update BuyItem with id=${id}. Maybe BuyItem was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating BuyItem with id=" + id
      });
    });
};


// Delete a BuyItem with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BuyItem.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `BuyItem id ${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete BuyItem with id=${id}. Maybe BuyItem was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete BuyItem with id=" + id
      });
    });
};

// Delete all BuyItems from the database.
exports.deleteAll = (req, res) => {
  BuyItem.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} BuyItems were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all BuyItems."
      });
    });
};