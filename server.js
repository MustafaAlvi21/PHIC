if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require ('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();


/*  ---------------------------------------------  */
/*                      Routers                    */
/*  ---------------------------------------------  */

const homeRouter = require('./routes/home')
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
// const req_donation = require('./routes/req_donation')
// const blood_request = require('./routes/blood_request')
// const donor = require('./routes/donor')
// const accepter = require('./routes/accepter')
// const bloodStock = require('./routes/bloodStock')
// const  admin_viewDonor = require('./routes/admin.viewDonor')
// const  admin_viewAccepter = require('./routes/admin.viewAccepter')
const VERIFICATION = require('./routes/accountVerification')
const forget = require('./routes/forgetpassword')
const newPassword = require('./routes/forgetpassword')


/*  ---------------------------------------------  */
/*            App Use And Set Methods              */
/*  ---------------------------------------------  */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') );
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static ('public') );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( ('/'), homeRouter );
app.use( ('/signup'), signupRouter );
app.use( ('/login'), loginRouter );
app.use( ('/'), logoutRouter );
// app.use( ('/help-section'), req_donation );
// app.use( ('/help-section'), blood_request );
// app.use( ('/donor'), donor );
// app.use( ('/accepters'), accepter );
// app.use( ('/blood_stock'), bloodStock );
// app.use( ('/c-panel/admin'), admin_viewDonor );
// app.use( ('/c-panel/admin'), admin_viewAccepter );
app.use( ('/verify'), VERIFICATION );
app.use( ('/forget-password'), forget );
app.use( ('/forget-password'), newPassword );


/*  -----------------------------------------------------  */
/*                      Member Routes                   */
/*  ---------------------------------------------------  */
const H_signupRouter = require('./routes/hospital.signUp.js')
const MemberloginRouter = require('./routes/MemberloginRouter')

app.use( ('/member_signup'), H_signupRouter );
app.use( ('/member_login'), MemberloginRouter );


/*  ---------------------------------------------  */
/*                      Mongo DB                   */
/*  ---------------------------------------------  */

console.log('process.env.DATABASE_URL ' + process.env.DATABASE_URL)
const mongoose = require ('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open',()  => console.log('Connected Mongo'))

// mongodb://127.0.0.1:27017/Password_Management_System
// live DATABASE_URL in .env is :  mongodb://127.0.0.1:27017/Password_Management_System, {useNewUrlParser: true}||

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/Password_Management_System', {useNewUrlParser: true, useCreateIndex: true});
// mongoose.connect( process.env.MONGO_URI || 'mongodb+srv://passwordManagementSystem:pms123@cluster0-objod.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true});
// var db = mongoose.connection;

/*  ---------------------------------------------  */
/*                  listening Port                 */
/*  ---------------------------------------------  */  
const port1 = 3000
app.listen(process.env.PORT || port1);