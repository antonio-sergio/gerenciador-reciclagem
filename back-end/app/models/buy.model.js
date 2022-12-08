module.exports = (sequelize, DataTypes) => {
    const Buy = sequelize.define("buy", {
      total_amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
    });
  
    return Buy;
  };