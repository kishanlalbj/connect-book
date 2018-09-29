if (process.env.MODE === "prod") {
  module.exports = require("./keys-prod");
} else {
  module.exports = require("./keys-dev");
}
