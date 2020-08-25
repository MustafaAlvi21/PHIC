// signIn
//require('dotenv').config();
//"use strict";

const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userDataModule = require('../modules/patient');
// const  mailsender = require ('../nodemail/sendMail') 
const checkExistingUsernameFromDB = require('../middleware/existing-user');

// settingUp local-storage
if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }

function isVerified(req, res, next){
  const email = req.body.email;
  userDataModule.findOne({Email: email, verified: 'false', password: req.body.password123}).exec(function(err, data){
    if (err) throw err;
    if (data){

   

const nodemailer = require("nodemailer");
async function main() {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
    port: 465,
    secure: true,
auth: {
  user: 'qwopa08@gmail.com', // generated ethereal user
  pass: 'xcusqmdudishelgk', // generated ethereal password
},   
});
const userId = data._id;
const url = 'https://phic.herokuapp.com/verify'
// send mail with defined transport object
let info = await transporter.sendMail({
from: '"Fred Foo 👻" <foo@example.com>', // sender address
to: req.body.email, // list of receivers
subject: "Please confirm your Email account", // Subject line
text: "Hello world 123?", // plain text body
html: "<h3>Account Verification link: </h3> "+ `${url}`+"/"+`${userId}`, // html body
});



console.log("Message sent: %s", info.messageId);
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
// ====================================

return res.render('login', { title: 'login', msg:'Email not varified, email is send...',loginUser: '', usernameMsg: '', emailMsg: '', })
    }
    next();
  })
}

  router.get('/', (req,res) => {
    res.render('login', {
      title: '',
      loginUser: '',
      msg: ''
  })
})


router.post('/', isVerified, (req, res) => {
    var userToken = localStorage.getItem('userToken');
    if(userToken){
      res.redirect('/');
    } else {
        const email = req.body.email;
        const password = req.body.password123;
console.log(password)
        var checkUser = userDataModule.findOne({ Email: email });
        checkUser.exec(function (err, data) {
          console.log('data : ' + data)
          if (data == null){
            res.render('login', { title: 'login', msg:'Incorrect Email...', loginUser: localStorage.getItem('loginUser') });
          } else {
          if (err) throw err;
               var getPasswordFromDB = data.password;
               var getUserId = data._id;
               if (password == getPasswordFromDB){
                console.log('password match')
                let token = jwt.sign({ username: data.Username }, 'loginToken');
                localStorage.setItem('userToken', token);
                localStorage.setItem('loginUser', data.Username);
                // localStorage.setItem('loginUserGender', data.Gender);
                // console.log("userToken: 123    " + localStorage.getItem('userToken') );                 
                console.log("loginUser: " + localStorage.getItem('loginUser') );                 
                // console.log("loginUserGender: " + localStorage.getItem('loginUserGender') );                 
                res.render('home', {title:"Home" , loginUser: localStorage.getItem('loginUser'),  loginUserGender: localStorage.getItem('loginUserGender')  });     
               } else {
                console.log('password not match')
                res.render('login', { title: 'login', msg:'Incorrect Password... ', loginUser: localStorage.getItem('loginUser') });
               }
              }
           });
        }
})





module.exports = router; 
