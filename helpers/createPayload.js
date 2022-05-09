const axios = require("axios");

const formatDate = input => {
  const datePart = input.match(/\d+/g);
  const year = datePart[0];
  const month = datePart[1];
  const day = datePart[2];

  return day + "-" + month + "-" + year;
};

const getIndicator = async date => {
  const parseDate = formatDate(date);
  console.log("parseDate :>> ", parseDate);
  try {
    const { data } = await axios.get(`https://mindicador.cl/api/uf/${parseDate}`);
    return data;
  } catch (error) {
    throw error;
  }
};

const createPayload = async body => {
  const { needs_exchange, billed_at, billed_hours, billed_amount, description, exchange_currency } =
    body;

  const payloadObject = {
    object: "payment",
    description,
    billed_hours,
    billed_at,
    billing_currency: exchange_currency,
    billed_amount,
    currency: exchange_currency,
    needs_exchange
  };

  if (!needs_exchange) {
    const exchange = {
      original_amount: billed_amount,
      currency: exchange_currency,
      exchange_rate: null
    };
    payloadObject.exchange = exchange;
    payloadObject.amount = null;
  } else {
    const { serie } = await getIndicator(billed_at);
    payloadObject.amount = parseInt(serie[0].valor * billed_amount);
    const exchange = {
      original_amount: billed_amount,
      currency: exchange_currency,
      exchange_rate: serie[0].valor
    };
    payloadObject.exchange = exchange;
  }

  return payloadObject;
};

module.exports = createPayload;
