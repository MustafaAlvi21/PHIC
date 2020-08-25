const express = require ('express');
const router = express.Router();

// settingUp local-storage
if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }

  /*          H o m e   p a g e       */

router.get('/', (req, res) => {
    console.log("loginUser: " + localStorage.getItem('loginUser') );
console.log( localStorage.getItem('userToken') )
    res.render('home', { title: 'Home', msg: "", loginUser: localStorage.getItem('loginUser') , loginUserGender: localStorage.getItem('loginUserGender') });
})




module.exports = router; 