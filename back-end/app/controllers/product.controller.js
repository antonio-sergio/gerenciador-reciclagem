const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

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

// Create and Save a new Product
exports.create = (req, res ) => {
  const obj = {
    name: req.body.name,
    price: req.body.price
  }
  if(obj){
    return Product.create(obj)
    .then((product) => {
        console.log(">> Created product: " + JSON.stringify(product, null, 4));
        res.statusMessage = 'Created product';
        res.send(product).end();
    })
    .catch((err) => {
        console.log(">> Error while creating product: ", err);
        res.send(err)
    });

  }else{
    res.send(">> Error while creating product: ")
  }
};



// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  return Product.findAll()
  .then((products) => {
    console.log(">>success in getting the products"+ JSON.stringify(products, null, 4));
    return res.send(products);
  })
  .catch((err) => {
    console.log(">>Error while picking up the products");
    res.send(err)
  })
};

// Find a single Produto with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Product.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Produto with id=" + id
//       });
//     });
// };

// // Update a Produto by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   Product.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Produto was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Product with id=${id}. Maybe Produto was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Product with id=" + id
//       });
//     });
// };

// // Delete a Produto with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Product.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Product was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Product with id=${id}. Maybe Produto was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Product with id=" + id
//       });
//     });
// };

// // Delete all Products from the database.
// exports.deleteAll = (req, res) => {
//   Product.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Products were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Products."
//       });
//     });
// };

