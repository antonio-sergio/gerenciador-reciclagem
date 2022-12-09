const db = require("../models");
const BuyItem = db.buyitems;


// Create and Save a new BuyItem
exports.createBuyItem = (req, res) => {
  const obj = {
    buy_id: req.body.buy_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  }
  if(obj){
    return BuyItem.create(obj)
    .then((buyitem) => {
        console.log(">> Created buyitem: " + JSON.stringify(buyitem, null, 4));
        return res.send(buyitem);
    })
    .catch((err) => {
        console.log(">> Error while creating buyitem: ", err);
        res.send(err)
    });

  }else{
    res.send(">> Error while creating buyitem: ")
  }
};


