const express = require("express");
const router = express.Router();
const { createId, validateCreateObj } = require("../middlewares");
const {
  getAllPayments,
  getPaymentsById,
  createPayment,
  updatePayment,
  deletePayment
} = require("../controllers/paymentsControllers");

module.exports = () => {
  // GET Routes

  router.get("/payments", getAllPayments);

  router.get("/payments/:id", getPaymentsById);

  // POST Routes

  router.post("/payments", validateCreateObj, createId, createPayment);

  // PUT Routes
  router.put("/payments/:id", validateCreateObj, updatePayment);

  router.delete("/payments/:id", deletePayment);

  return router;
};
