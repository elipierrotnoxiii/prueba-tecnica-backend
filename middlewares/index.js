const { uuid } = require("uuidv4");
const createPayload = require("../helpers/createPayload");

const objValidate = [
  "description",
  "billed_hours",
  "billed_at",
  "billing_currency",
  "billed_amount",
  "needs_exchange",
  "exchange_currency"
];

exports.createId = (req, res, next) => {
  req.payload.id = uuid();
  next();
};

exports.validateCreateObj = async (req, res, next) => {
  const validateObject = objValidate.find(x => !Object.keys(req.body).includes(x));
  console.log("validateObject :>> ", validateObject);
  if (!validateObject) {
    const getCreatePayload = await createPayload(req.body);
    req.payload = getCreatePayload;

    next();
  } else {
    res.status(400).send({ message: `${validateObject} is required` });
  }
};
