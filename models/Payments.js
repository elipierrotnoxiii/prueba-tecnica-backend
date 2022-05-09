const Sequelize = require("sequelize");
const db = require("../config/db");

const PaymentSchema = db.define("payments", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  object: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  billed_hours: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  billed_at: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billing_currency: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  billed_amount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  currency: {
    type: Sequelize.STRING,
    allowNull: false
  },
  needs_exchange: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  exchange_currency: {
    type: Sequelize.STRING
  },
  exchange: {
    type: Sequelize.STRING
  }
});

module.exports = PaymentSchema;
