module.exports = app => {
    const inventorys = require("../controllers/inventory.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", inventorys.createInventory);
  
    // Retrieve all Tutorials
    // router.get("/", products.findAll);;
  
    // Retrieve all published Tutorials
  
    // Retrieve a single Tutorial with id
    // router.get("/:id", products.findOne);
  
    // Update a Tutorial with id
    // router.put("/:id", products.update);;
  
    // Delete a Tutorial with id
    // router.delete("/:id", products.delete);
  
    // Create a new Tutorial
    // router.delete("/", products.deleteAll);
  
    app.use('/api/inventory', router);
  };