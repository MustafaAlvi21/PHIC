const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bloodRequestDataModel = require ('../modules/DB_blood_request')
// const userAccess = require ('../middleware/user-access');

   // settingUp local-storage
   if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }

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

/*          V i e w   A c c e p t e r    R e q    P a g e           */

router.get('/accepters', userAccess, function(req, res, next){
    bloodRequestDataModel.find({Status : "Pending"}).exec(function(err, result){
        if (err) throw err;
        res.render('adminAccepterView', {  title: 'Admin', data: result, loginUserGender: localStorage.getItem('loginUserGender'), loginUser: localStorage.getItem('loginUser'), })
    });
});

/*         E d i t   A c c e p t e r     R e q u e s t        */
router.get('/accepters/edit/:id', userAccess, function(req, res, next){
    const id= req.params.id;
    console.log('id is ----  : ' + id)
    localStorage.setItem('donor_id', id);
    bloodRequestDataModel.findById(id).exec (function  (err, data){
        if (err) throw err;
        res.render('AdminAccepterEdit', { title: 'Admin Accepters Edit', msg: '', data: data, loginUserGender: localStorage.getItem('loginUserGender'), loginUser: localStorage.getItem('loginUser') , });
    });
});

router.post('/accepters/edit', userAccess, function(req, res, next){
    const id = localStorage.getItem('donor_id');
    const Status = req.body.Status;
    bloodRequestDataModel.findByIdAndUpdate(id,
        {
            Status: Status
        }).exec(function(err, data){
       if (err) throw err;
       localStorage.removeItem('donor_id')
       res.redirect('/c-panel/admin/accepters')
     });       
});

router.get('/accepters/remove/:id', function(req, res, next){
    const id = req.params.id;
    bloodRequestDataModel.findByIdAndDelete(id).exec(function (err){
        if (err) throw err;
        res.redirect('/c-panel/admin/accepters')
    })
    })






module.exports = router;