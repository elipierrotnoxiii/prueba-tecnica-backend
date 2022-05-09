const app = require("./app");
require("./config/db");
require("./models/Payments");

app.listen(3000, () => console.log("Servidor levantado"));
