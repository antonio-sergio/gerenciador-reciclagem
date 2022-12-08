module.exports = (sequelize, DataTypes) => {
    const Saleitem = sequelize.define("saleitem", {
      sale_id: {
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
  
    return Saleitem;
  };