require("dotenv").config({ path: "path-to-.env" });
const {
  DATABASE_URL,
  PORT_DATABASE,
  USER,
  PASSWORD_DATABASE,
  DATABASE,
  
} = process.env;

//  SERVER CONNECTION //
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: DATABASE_URL,
      port: PORT_DATABASE,
      user: USER,
      password: PASSWORD_DATABASE,
      database: DATABASE,
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`,
    },
  },
};
