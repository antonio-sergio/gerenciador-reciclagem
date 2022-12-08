const db = require("../models");
const SaleItem = db.saleitems;


// Create and Save a new SaleItem
exports.createSaleItem = (req, res) => {
  if(req.body.sale_id && req.body.product_id && req.body.quantity){
    return SaleItem.create({
      sale_id: req.body.sale_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    })
    .then((saleitem) => {
        console.log(">> Created SaleItem: " + JSON.stringify(saleitem, null, 4));
        return res.send(saleitem);
    })
    .catch((err) => {
        console.log(">> Error while creating saleitem: ", err);
        res.send(err)
    });

  }else{
    res.send(">> Error while creating saleitem: ")
  }
};