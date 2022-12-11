module.exports = app => {
    const buys = require("../controllers/buy.controller");
  
    var router = require("express").Router();
  
    // Create a new Buy
    router.post("/", buys.createBuy);
  
    // Retrieve all Buys
    router.get("/", buys.findAll);;
  
    // Retrieve a single Buy with id
    router.get("/:id", buys.findOne);
  
    // Update a Buys with id
    router.put("/:id", buys.update);
  
    // Delete a Buys with id
    router.delete("/:id", buys.delete);
  
    // Delete all Buys
    router.delete("/", buys.deleteAll);
  
    app.use('/api/buys', router);
  };