const { Sequelize } = require("sequelize");

const db = new Sequelize({
  host: "localhost",
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: "./config/registros.sqlite"
});

db.sync()
  .then(() => console.log("Conectado a la db!!!"))
  .catch(er => console.log(er.message));

module.exports = db;
