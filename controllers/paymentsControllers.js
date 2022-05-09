const { create, find, findById, update, erase } = require("../helpers/paymentsCrud");

exports.getAllPayments = async (req, res) => {
  let page = "";
  req.query.page ? (page = req.query.page) : (page = null);
  try {
    const getPayments = await find(page);

    res.status(200).send(getPayments);
  } catch (error) {
    res.status(404).send(error.errors);
  }
};

exports.getPaymentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await findById(id);

    res.status(200).send(payment);
  } catch (error) {
    res.status(404).send(error.errors);
  }
};

exports.createPayment = async (req, res) => {
  req.payload.exchange = JSON.stringify(req.payload.exchange);
  try {
    const createPayment = await create(req.payload);
    createPayment.exchange = JSON.parse(createPayment.exchange);
    res.status(201).send(createPayment);
  } catch (error) {
    res.status(404).send(error.errors[0].message);
  }
};

exports.updatePayment = async (req, res) => {
  req.payload.exchange = JSON.stringify(req.payload.exchange);
  try {
    const { id } = req.params;
    const updatePayment = await update(req.payload, id);

    res.status(200).send(updatePayment);
  } catch (error) {
    console.log("error :>> ", error);
    if (error == "not found") {
      res.status(404).send(error);
    } else {
      res.status(400).send(error.errors);
    }
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePayment = await erase(id);
    console.log("deletePayment :>> ", deletePayment);

    res.send(deletePayment);
  } catch (error) {
    console.log("error :>> ", error);
    if (error === "not found") {
      res.status(404).send(error);
    } else {
      res.status(400).send(error);
    }
  }
};
