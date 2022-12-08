const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./product.model.js")(sequelize, Sequelize);
db.inventorys = require("./inventory.model")(sequelize, Sequelize);
db.buys = require("./buy.model")(sequelize, Sequelize);
db.buyitems = require("./buyitem.model")(sequelize, Sequelize);
db.sales = require("./sale.model")(sequelize, Sequelize);
db.saleitems = require("./saleitem.model")(sequelize, Sequelize);

// db.inventorys.hasMany(db.products, {as: "products"});
// db.products.belongsTo(db.inventorys, {
//   foreignkey: "id"
// })

module.exports = db