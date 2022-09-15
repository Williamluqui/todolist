require('dotenv').config()
const {HOST,PORT_DATABASE,USER,PASSWORD_DATABASE,DATABASE,
    CLIENT_DATABASE} = process.env

//  SERVER CONNECTION // 
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : HOST || '127.0.0.1',
      port : PORT_DATABASE || 8080,
      user : USER || 'root',
      password : PASSWORD_DATABASE || "123456",
      database : DATABASE || 'database_name'
  },
  migrations:{
    directory: `${__dirname }/src/database/migrations`,
    }
}
};
