if (process.env.NODE_ENV === "prod") {
  console.log("USING PROD");
  module.exports = require("./keys-prod");
} else {
  console.log("USING DEV");
  module.exports = require("./keys-dev");
}
