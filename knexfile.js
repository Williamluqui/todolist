require('dotenv').config({path: 'path-to-.env'})
const {HOST,PORT_DATABASE,USER,PASSWORD_DATABASE,DATABASE,
    CLIENT_DATABASE} = process.env

//  SERVER CONNECTION // 
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : HOST ,
      port : PORT_DATABASE ,
      user : USER ,
      password : PASSWORD_DATABASE ,
      database : DATABASE 
  },
  migrations:{
    directory: `${__dirname }/src/database/migrations`,
    }
}
};
