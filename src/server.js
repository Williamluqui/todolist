require('dotenv').config()
const express = require("express");
const app = express();

const port = process.env.PORT;
const {COOKIE_PARSE_KEY} = process.env;
const {SECRET_SESION} = process.env;
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");



// Cookie parser
app.use(cookieParser(COOKIE_PARSE_KEY))



// Session
app.use(session({
  secret: SECRET_SESION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// COOKIE

// Flash

app.use(flash());

// BODY PARSER
app.use(bodyParser.json());
//  PARSE APPLICATION/X-WWW-FORM
app.use(bodyParser.urlencoded({ extended: true }));

// VIEW ENGINE
app.set("view engine", "ejs");

// STATIC CCS
app.use(express.static( "./src/public"));


app.use("/", router);
app.set('port', process.env.PORT || 3000);

app.listen(port || 3000,(err)  => {
    console.log(`Server is running on port: ${port}!`); 
})