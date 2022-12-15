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
exports.createProduct = (req, res ) => {
  const obj = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
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
    res.statusMessage = 'Showing all products';
    res.send(products).end();
  })
  .catch((err) => {
    console.log(">>Error while picking up the products");
    res.send(err)
  })
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('id', id);
  Product.findByPk(id)
    .then(product => {
      console.log(product);
      id ? res.send(product) : res.status(400).send("Product not found for the given id")
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

exports.findByName = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  console.log('condição',condition);
  
  Product.findAll({ where: condition })
  .then(data => {
      console.log('chamou'), data;
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
}
// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Product id ${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    });
};

