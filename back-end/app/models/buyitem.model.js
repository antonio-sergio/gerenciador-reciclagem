module.exports = (sequelize, DataTypes) => {
    const Buyitem = sequelize.define("buyitem", {
      buy_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_id: {
        type: DataTypes.TINYINT,
        allowNull: false      },
      quantity: {
        type: DataTypes.TINYINT,
        allowNull: false
      }
    });
  
    return Buyitem;
  };