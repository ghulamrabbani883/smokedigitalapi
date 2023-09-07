const pg = require("pg");
const { Client } = pg;

const getClient = async () => {
  const pgClient = new Client(
    "postgres://xwiywrwh:v_2XOHYJ9BxNxR2HbiSlWS4EGDwdJvMA@trumpet.db.elephantsql.com/xwiywrwh"
  );
  await pgClient
    .connect()
    .then(() => console.log("Connected"))
    .catch((err) => console.log(`Error in connecting ${err}`));
  return pgClient;
};
getClient();

module.exports = { getClient };
