module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "12345678dev",
    DB: "gerenciador-reciclagem",
    dialect: "mysql",
    timezone: "-03:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // dialectOptions:{useUTC:true},
  };