const PaymentsModel = require("../models/Payments");

module.exports = {
  find: async query => {
    console.log("query :>> ", query);
    let _offset = 0;
    if (query && query !== "1") {
      _offset = Number(query) * 100;
    }

    try {
      const payments = await PaymentsModel.findAll({ limit: 100, offset: _offset });
      if (payments.length === 0) throw Error("not Found");
      payments.forEach(x => (x.exchange = JSON.parse(x.exchange)));

      return payments;
    } catch (error) {
      throw error;
    }
  },
  findById: async id => {
    try {
      const payment = await PaymentsModel.findOne({ where: { id } });

      payment.exchange = JSON.parse(payment.exchange);
      return payment;
    } catch (error) {
      throw error.message;
    }
  },
  create: async body => {
    try {
      const payment = await PaymentsModel.create(body);

      return payment;
    } catch (error) {
      throw error;
    }
  },
  update: async (body, id) => {
    try {
      const updatePayment = await PaymentsModel.update(body, { where: { id } });
      if (updatePayment[0] === 0) throw Error("not found");

      return { message: "payment sucessfully updated" };
    } catch (error) {
      throw error.message;
    }
  },
  erase: async id => {
    try {
      const deletePayment = await PaymentsModel.destroy({ where: { id } });
      if (deletePayment === 0) throw Error("not found");

      return { message: "payment sucessfully deleted" };
    } catch (error) {
      throw error.message;
    }
  }
};
