const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "App is running" });
});

require("./app/routes/product.routes")(app);
require("./app/routes/inventory.routes")(app);
require("./app/routes/buy.routes")(app);
require("./app/routes/buyitem.routes")(app);
require("./app/routes/sale.routes")(app);
require("./app/routes/saleitem.routes")(app);
const controllerProduct = require("./app/controllers/product.controller");
const controllerInventory = require("./app/controllers/inventory.controller");
const controllerBuyItem = require("./app/controllers/buyitem.controller");
const controllerBuy = require("./app/controllers/buy.controller");
// const run = async () => {
//   const prod1 = await controllerProduct.create({
//     name: 'Papelão',
//     price: 0.3
//   });
//   const prod2 = await controllerProduct.create({
//     name: 'Plástico',
//     price: 1.5
//   });



//   const invent1 = await controllerInventory.createInventory(prod1.id, {
//     quantity: 10,
//   });
//   const invent2 = await controllerInventory.createInventory(prod2.id, {
//     quantity: 20,
//   });

//   const buy1 =await controllerBuy.createBuy({
//     total_amount: 0,
//     date_buy: '2022-12-05'
//   });
//   const buyitem  = await controllerBuyItem.createBuyItem(buy1.id, prod1.id, {
//     item_price: prod1.price,
//     quantity: 1
//   });

//   await controllerBuy.updateBuy(30, buy1);
// }

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   run();
// });

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});