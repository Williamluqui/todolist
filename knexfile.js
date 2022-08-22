require('dotenv').config()
const {HOST,PORT_DATABASE,USER,PASSWORD_DATABASE,DATABASE,
    CLIENT_DATABASE} = process.env

//  SERVER CONNECTION // 
module.exports = {
  development: {
    client: CLIENT_DATABASE || 'mysql2',
    connection: {
      host : HOST || '127.0.0.1',
      port : PORT_DATABASE || 3000,
      user : USER || 'user_host',
      password : PASSWORD_DATABASE,
      database : DATABASE || 'database_name'
  },
  migrations:{
   
    directory: `${__dirname }/src/database/migrations`,
    }

}

};
