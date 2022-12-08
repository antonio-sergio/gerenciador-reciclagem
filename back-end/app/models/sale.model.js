module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define("sale", {
      total_amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
    });
  
    return Sale;
  };