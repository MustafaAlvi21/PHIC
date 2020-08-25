// signIn
const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MemberDataModule = require('../modules/hospital/signUp');
// const checkExistingUsernameFromDB = require('../middleware/existing-user');
// const local_storage = require('../middleware/local-storage');

// settingUp local-storage
if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }

/* User access */

  function haveAccess(req, res, next){
      var enteredEmail = req.body.email;
      var userHaveAccess = MemberDataModule.find({Email : enteredEmail,});
      console.log('checkExistingUsernameFromDB : ' + userHaveAccess)
      
      userHaveAccess.exec((err, data) => {
          console.log('have access' + data)
          if (err) throw err; 
          if (data === ''){
        return   res.render('member_login', { title: 'P H I C', msg:"You don't have access, login with correct portal", loginUser: '', usernameMsg: "Username You don't have access, login with correct portal", emailMsg: '', });
      }
      next();
    });
  };
 
  router.get('/', (req,res) => {
    res.render('member_login', {
      title: '',
      loginUser: '',
      msg: '',
      usernameMsg :''
  })
})


router.post('/', haveAccess, (req, res) => {
    var userToken = localStorage.getItem('userToken');
    if(userToken){
      res.redirect('/');
    } else {
        const enteredEmail = req.body.email;
        const password = req.body.password123;
console.log(enteredEmail )
console.log( password)
        var checkUser = MemberDataModule.find({Email : enteredEmail,});
        checkUser.exec(function (err, data) {
            console.log('data 123: ' + data)

            if (data == null || data == ''){
                res.render('member_login', { title: 'member_login', msg:'Incorrect Email...', loginUser: localStorage.getItem('loginUser') });
            } else {
                if (err) throw err;
               var getPasswordFromDB = data[0].password;
               console.log('getPasswordFromDB : ' + getPasswordFromDB)
               var getUserId = data._id;
               if (password == getPasswordFromDB){
                console.log('password match 1')
                let token = jwt.sign({ username: data[0].Username }, 'loginToken');
                localStorage.setItem('userToken', token);
                localStorage.setItem('loginUser', data[0].Username);
                // localStorage.setItem('loginUserGender', data.Gender);
                // console.log("userToken: 123    " + localStorage.getItem('userToken') );                 
                console.log("loginUser: " + localStorage.getItem('loginUser') );                 
                // console.log("loginUserGender: " + localStorage.getItem('loginUserGender') );                 
                res.render('home', {title:"Home" , loginUser: localStorage.getItem('loginUser'),  loginUserGender: localStorage.getItem('loginUserGender')  });     
               } else {
                console.log('password not match ')
                res.render('member_login', { title: 'login', msg:'Incorrect Password... ', loginUser: localStorage.getItem('loginUser') });
               }
              }
           });
        }
})





module.exports = router; 