module.exports = app => {
    const inventorys = require("../controllers/inventory.controller");
  
    var router = require("express").Router();
  
    // Create a new Inventory
    router.post("/", inventorys.createInventory);
  
    // Retrieve all Inventorys
    router.get("/", inventorys.findAll);
  
    // Retrieve a single Inventory with id
    router.get("/:id", inventorys.findOne);
  
    // Update a Inventory with id
    router.put("/:id", inventorys.update);
  
    // Delete a Inventory with id
    router.delete("/:id", inventorys.delete);
  
    // Delete all Inventorys
    router.delete("/", inventorys.deleteAll);
  
    app.use('/api/inventorys', router);
  };