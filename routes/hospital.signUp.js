const express = require ('express');
const router = express.Router();
// const signUpSchema = require ('../modules/signUpSchema')
var memberDataModule = require('../modules/hospital/signUp'); 
// settingUp local-storage
if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }


/* Checking db existing username. */ 
function checkExistingUsernameFromDB(req, res, next){
    var enteredUsername = req.body.Username;
    var checkExistingUsernameFromDB = memberDataModule.findOne({Username : enteredUsername});
    console.log('checkExistingUsernameFromDB : ' + checkExistingUsernameFromDB)
    
    checkExistingUsernameFromDB.exec((err, data) => {
      if (err) throw err; 
      if (data){
        return   res.render('h_signUp', { title: 'P H I C', msg:"Username is already taken.", loginUser: '', usernameMsg: 'Username exist in our data', emailMsg: '', });
      }
      next();
    });
  };
function checkExistingEmailFromDB(req, res, next){
    var enteredEmail = req.body.Email;
    var checkExistingEmailFromDB = memberDataModule.findOne({Email : enteredEmail});
    console.log('checkExistingEmailFromDB : ' + checkExistingEmailFromDB)
    
    checkExistingEmailFromDB.exec((err, data) => {
      if (err) throw err; 
      if (data){
        return   res.render('h_signUp', { title: 'P H I C', msg:"Email is already taken.", loginUser: '', usernameMsg: 'Username exist in our data', emailMsg: '', });
      }
      next();
    });
  };

  
function checkExistingPhoneFromDB(req, res, next){
    var enteredPhone = req.body.phone;
    var checkExistingPhoneFromDB = memberDataModule.findOne({phone : enteredPhone});
    console.log('checkExistingPhoneFromDB : ' + checkExistingPhoneFromDB)
    
    checkExistingPhoneFromDB.exec((err, data) => {
      if (err) throw err; 
      if (data){
        return   res.render('h_signUp', { title: 'P H I C', msg:"Phone is already taken.", loginUser: '', usernameMsg: 'Username exist in our data', emailMsg: '', });
      }
      next();
    });
  };

function checkExistingNICFromDB(req, res, next){
    var enteredNIC = req.body.nic;
    var checkExistingNICFromDB = memberDataModule.findOne({nic : enteredNIC});
    console.log('checkExistingNICFromDB : ' + checkExistingNICFromDB)
    
    checkExistingNICFromDB.exec((err, data) => {
      if (err) throw err; 
      if (data){
        return   res.render('h_signUp', { title: 'P H I C', msg:"NIC is already taken.", loginUser: '', usernameMsg: 'Username exist in our data', emailMsg: '', });
      }
      next();
    });
  };

  
  router.get('/', (req, res) => {
    res.render('h_signUp', {
        title : 'member ',
        msg : '',
        loginUser : '',
        usernameMsg : '',
        emailMsg : ''
    })
})


router.post('/', checkExistingUsernameFromDB, checkExistingEmailFromDB, checkExistingPhoneFromDB, checkExistingNICFromDB, (req, res, next) => {
    var userToken = localStorage.getItem('userToken');
    if(userToken){
      res.redirect('/');
    } else {
        console.log('req.body.Username : ' + req.body.Username)
        const Username = req.body.Username;
        const Email =  req.body.Email;
        const password = req.body.password;
        const nic =  req.body.nic;
        const phone =  req.body.phone;
        const role =  'member';

        var d = Date(Date.now()); 
        const currentDate = d.toString();

        const signUpDetails = new memberDataModule({
            Username : Username,
            Email : Email,
            password : password,
            nic : nic,
            phone : phone,
            role : role,
          });
          signUpDetails.save((err, data) => {
            if(err) throw err;
            res.render('member_login', { title: '', msg:"Member Successfully registered.", loginUser : '', usernameMsg : '', emailMsg : ''});
          });
        }
})


module.exports = router; 