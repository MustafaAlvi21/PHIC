const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bloodRequestDataModel = require ('../modules/DB_blood_request')

   // settingUp local-storage
   if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }

  
/* Stopping user to access pages without login.  */
function userAccess(req, res, next){
    var userToken = localStorage.getItem('userToken');
    try {
       var decode = jwt.verify(userToken, 'loginToken');
       console.log('access')
    } catch (error) {
        console.log('DENIED')
        res.redirect('/login')
    }
     next();
   }

   router.get('/Need-Blood', userAccess, function(req, res, next){
    res.render('needBlood', { title: 'Need Blood', msg:'', loginUser: localStorage.getItem('loginUser'), loginUserGender: localStorage.getItem('loginUserGender'),})
  });


   router.post('/Need-Blood', function(req, res, next) {
       const Username = localStorage.getItem('loginUser')
       const Status = 'Pending'
       const Blood_Group =  req.body.Blood_Group
       const Blood_Cell = req.body.Blood_Cell
       const Weight =  req.body.Weight
       const Height =  req.body.Height

       
       const bloodRequest = new bloodRequestDataModel({
        Username : Username,
        Status : Status,
        Blood_Group : Blood_Group,
        Blood_Cell : Blood_Cell,
        Weight : Weight,
        Height : Height,
      });
      bloodRequest.save((err, data) => {
        if(err) throw err;
        res.render('needBlood', { title: 'Need Request', msg: 'Your request has been sended to Admin', loginUserGender: localStorage.getItem('loginUserGender'), loginUser: localStorage.getItem('loginUser'), });
    });
    });


  
module.exports = router; 