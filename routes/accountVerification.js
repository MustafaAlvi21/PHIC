const express = require ('express');
const router = express.Router();
const userDataModule = require('../modules/patient');





router.get('/:id', function(req, res){
    let id = req.params.id;
    userDataModule.findByIdAndUpdate( id, {verified: 'true'}, function(err, data){
        return res.render('login', {
            title: '',
            loginUser: '',
            msg: 'Account verified!!!'
        })
    })
})

module.exports = router; 