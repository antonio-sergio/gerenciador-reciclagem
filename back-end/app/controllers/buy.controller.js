const db = require("../models");
const Buy = db.buys;


// Create and Save a new buy
exports.createBuy = (req, res) => {
  const obj = {
    total_amount: req.body.total_amount,
  }
  if(obj){
    return Buy.create(obj)
    .then((buy) => {
        console.log(">> Created buy: " + JSON.stringify(buy, null, 4));
        res.statusMessage = 'Created buy';
        return res.send(buy).end();
    })
    .catch((err) => {
        console.log(">> Error while creating buy: ", err);
        res.send(err)
    });

  }else{
    res.send(">> Error while creating buy: ")
  }
};

// Retrieve all Buys from the database.
exports.findAll = (req, res) => {
  return Buy.findAll()
  .then((buys) => {
    res.statusMessage = 'Showing all buys';
    res.send(buys).end();
  })
  .catch((err) => {
    console.log(">>Error while picking up the buys");
    res.send(err)
  })
};

// Find a single Buy with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Buy.findByPk(id)
    .then(buy => {
      console.log(buy);
      buy ? res.send(buy).end() : res.status(400).send("Buy not found for the given id").end()
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Buy with id=" + id
      });
    });
};

// // Update a Buy by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Buy.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Buy was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Buy with id=${id}. Maybe Buy was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Buy with id=" + id
      });
    });
};

// Delete a Buy with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Buy.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Buy ${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete Buy with id=${id}. Maybe Buy was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Buy with id=" + id
      });
    });
};

// Delete all Buys from the database.
exports.deleteAll = (req, res) => {
  Buy.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Buys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Buys."
      });
    });
};
