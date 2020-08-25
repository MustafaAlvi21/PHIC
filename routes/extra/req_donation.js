const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const donationRequestDataModel = require ('../modules/DB_req_donation')
// const userAccess = require('../middleware/user-access');
 
// console.log('userAccess:  ' + userAccess)


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

   router.get('/donationRequest', userAccess, function(req, res, next){
    res.render('donationRequest', { title: 'Donation Request',  msg: "",  loginUser: localStorage.getItem('loginUser') , loginUserGender: localStorage.getItem('loginUserGender') } )
  });


   router.post('/donationRequest', function(req, res, next) {
    const Donation_Req_Id = '';   
    const Username = localStorage.getItem('loginUser')
       const Status = 'Pending'
       const Blood_Group =  req.body.Blood_Group
       const Blood_Cell = req.body.Blood_Cell
       const Weight =  req.body.Weight
       const Height =  req.body.Height
       
       const donationRequest = new donationRequestDataModel({
        Username : Username,
        Status : Status,
        Blood_Group : Blood_Group,
        Blood_Cell : Blood_Cell,
        Weight : Weight,
        Height : Height,
      });
      donationRequest.save((err, data) => {
        if(err) throw err;
        res.render('donationRequest', { title: 'Donation Request', msg: 'Your request has been send to Admin, please wait for admin response, thank you!!!', loginUserGender: localStorage.getItem('loginUserGender'), loginUser: localStorage.getItem('loginUser'), });      });
});


  
module.exports = router; 