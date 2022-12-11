module.exports = app => {
    const buyItems = require("../controllers/buyitem.controller");
  
    var router = require("express").Router();
  
    // Create a new buyItems
    router.post("/", buyItems.createBuyItem);
  
    // Retrieve all BuyItems
    router.get("/", buyItems.findAll);
  
    // Retrieve a single BuyItem with id
    router.get("/:id", buyItems.findOne);
  
    // Update a BuyItem with id
    router.put("/:id", buyItems.update);;
  
    // Delete a BuyItem with id
    router.delete("/:id", buyItems.delete);
  
    // Delete all BuyItems
    router.delete("/", buyItems.deleteAll);
  
    app.use('/api/buyitems', router);
  };