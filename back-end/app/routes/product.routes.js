module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", products.createProduct);
  
    // Retrieve all Products
    router.get("/", products.findAll);;

    // Retrieve a single Product with id
    router.get("/:id", products.findOne);

    //Retrieve product with name
    router.get("/:name", products.findByName)
    // Update a Product with id
    router.put("/:id", products.update);;
  
    // Delete a Product with id
    router.delete("/:id", products.delete);
  
    // Delete all Products
    router.delete("/", products.deleteAll);
  
    app.use('/api/products', router);
  };