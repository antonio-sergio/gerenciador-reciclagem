module.exports = app => {
    const sales = require("../controllers/sale.controller");
  
    var router = require("express").Router();
  
    // Create a new sale
    router.post("/", sales.createSale);
  
    // Retrieve all Sales
    router.get("/", sales.findAll);;
  
    // Retrieve a single Sale with id
    router.get("/:id", sales.findOne);
  
    // Update a Sale with id
    router.put("/:id", sales.update);
  
    // Delete a Sale with id
    router.delete("/:id", sales.delete);
  
    // Delete all Sales
    router.delete("/", sales.deleteAll);
  
    app.use('/api/sales', router);
  };