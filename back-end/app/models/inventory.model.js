module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("inventory", {
      product_id: {
        type: DataTypes.TINYINT,
        allowNull: false
      },
      quantity: {
        type: DataTypes.TINYINT,
        allowNull: false
      }
    });
  
    return Inventory;
  };