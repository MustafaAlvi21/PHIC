const express = require ('express');
const router = express.Router();
const bloodRequestDataModel = require ('../modules/DB_blood_request')


   // settingUp local-storage
   if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }

  router.get('/', function(req, res){
     bloodRequestDataModel.find({Status : "Accepted"}).exec(function(err, result){
        console.log('result: ' + result)
        // if (err) throw err;
        res.render('Accepter', {  title: 'Blood Stock', data: result, loginUser: localStorage.getItem('loginUser'),  loginUserGender: localStorage.getItem('loginUserGender')} )
      })
    })


    module.exports = router; 
