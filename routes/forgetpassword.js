const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userDataModule = require('../modules/patient');



// settingUp local-storage
if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }



router.get('/',  function(req, res){
 res.render('forgetPassword', {title : '', msg : '', loginUser : ''})
})

router.post('/', function(req, res){
    const email = req.body.email;

    userDataModule.findOne({Email: email }).exec(function(err, data){
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
    const url = 'https://phic.herokuapp.com/forget-password/new'
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
    
    return res.render('login', { title: 'login', msg:'Reset password link is emailed...',loginUser: '', usernameMsg: '', emailMsg: '', })
        }
    })
})


router.get('/new/:id',  function(req, res){
    const id = req.params.id;
    localStorage.setItem('userId', id)
    // console.log('id: ' + id)
    // console.log('local: ' + localStorage.getItem('userId'))
    res.render('forgetPassword_new', {title : '', msg : '', loginUser : ''})
   })
   

   router.post('/new', function(req, res){
    let userId = localStorage.getItem('userId');
    let enteredPassword = req.body.password
    console.log(userId + ' ' + enteredPassword)

    userDataModule.findByIdAndUpdate(userId, {password: enteredPassword}, function(err, data){
        if (err) console.log(err)
        if (data) {
            console.log(data)
            localStorage.removeItem('userId')
            console.log('local: ' + localStorage.getItem('userId'))
            return res.render('login', { title: 'P H I C', msg: 'Password is updated', loginUser: ''})
        }
    })
})





module.exports = router
