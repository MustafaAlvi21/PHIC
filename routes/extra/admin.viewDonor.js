const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dononrRequestDataModel = require ('../modules/DB_req_donation')
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

/*          V i e w   D o n o r    R e q    P a g e           */

router.get('/donors', userAccess, function(req, res, next){
    dononrRequestDataModel.find({Status : "Pending"}).exec(function(err, result){
        if (err) throw err;
        res.render('adminView', {  title: 'Admin', data: result, loginUserGender: localStorage.getItem('loginUserGender'), loginUser: localStorage.getItem('loginUser'), })
    });
});

/*         E d i t   D o n o r     R e q u e s t        */
router.get('/donors/edit/:id', userAccess, function(req, res, next){
    const id= req.params.id;
    console.log('id is ----  : ' + id)
    localStorage.setItem('donor_id', id);
    dononrRequestDataModel.findById(id).exec (function  (err, data){
        if (err) throw err;
        // res.send(data)
        res.render('admindonorEdit', { title: 'Admin Donor Edit', msg: '', data: data,loginUserGender: localStorage.getItem('loginUserGender'), loginUser: localStorage.getItem('loginUser') , });
    });
});

router.post('/donors/edit', userAccess, function(req, res, next){
    const id = localStorage.getItem('donor_id');
    const Status = req.body.Status;
    dononrRequestDataModel.findByIdAndUpdate(id,
        {
            Status: Status
        }).exec(function(err, data){
       if (err) throw err;
       localStorage.removeItem('donor_id')
       res.redirect('/c-panel/admin/donors')
     });       
});

router.get('/donors/remove/:id', function(req, res, next){
    const id = req.params.id;
    dononrRequestDataModel.findByIdAndDelete(id).exec(function (err){
        if (err) throw err;
        res.redirect('/c-panel/admin/donors')
    })
    })






module.exports = router;