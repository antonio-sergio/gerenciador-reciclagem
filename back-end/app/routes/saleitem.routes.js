module.exports = app => {
    const saleItems = require("../controllers/saleitem.controller");
  
    var router = require("express").Router();
  
    // Create a new SaleItem
    router.post("/", saleItems.createSaleItem);
  
    // Retrieve all SaleItems
    router.get("/", saleItems.findAll);
  
    // Retrieve a single SaleItem with id
    router.get("/:id", saleItems.findOne);
  
    // Update a SaleItem with id
    router.put("/:id", saleItems.update);
  
    // Delete a SaleItem with id
    router.delete("/:id", saleItems.delete);
  
    // Create a new SaleItems
    router.delete("/", saleItems.deleteAll);
  
    app.use('/api/saleitems', router);
  };