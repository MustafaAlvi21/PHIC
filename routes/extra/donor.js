const express = require ('express');
const router = express.Router();
const donationRequestDataModel = require ('../modules/DB_req_donation')


   // settingUp local-storage
   if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }

  router.get('/', function(req, res){

    // const donationRequest = new donationRequestDataModel({});
     donationRequestDataModel.find({Status : "Accepted"}).exec(function(err, result){
      // console.log(result[0].Status)
        // if (err) throw err;
       // console.log(result[0].Status)
        if (err) throw err;
        res.render('donor', {  title: 'Blood Stock', data: result, loginUser: localStorage.getItem('loginUser'), loginUserGender: localStorage.getItem('loginUserGender') } )
      })
    })


    module.exports = router; 
