const db = require("../models");
const Buy = db.buys;


// Create and Save a new buy
exports.createBuy = (req, res) => {
  if(req.body.total_amount){
    return Buy.create({
      total_amount: req.body.total_amount,
    })
    .then((buy) => {
        console.log(">> Created buy: " + JSON.stringify(buy, null, 4));
        return res.send(buy);
    })
    .catch((err) => {
        console.log(">> Error while creating buy: ", err);
        res.send(err)
    });

  }else{
    res.send(">> Error while creating buy: ")
  }
};

exports.updateBuy = (total,buy) => {
    return buy.update({
      total_amount: total
    })
      .then((buy) => {
        console.log(">> Created buy: " + JSON.stringify(buy, null, 4));
        return buy;
      })
      .catch((err) => {
        console.log(">> Error while creating product: ", err);
      });
  };