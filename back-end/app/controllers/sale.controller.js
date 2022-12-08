const db = require("../models");
const Sale = db.sales;


// Create and Save a new Sale
exports.createSale = (req, res) => {
  if(req.body.total_amount){
    return Sale.create({
      total_amount: req.body.total_amount,
    })
    .then((sale) => {
        console.log(">> Created sale: " + JSON.stringify(sale, null, 4));
        return res.send(sale);
    })
    .catch((err) => {
        console.log(">> Error while creating sale: ", err);
        res.send(err)
    });

  }else{
    res.send(">> Error while creating sale: ")
  }
};