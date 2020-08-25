const mongoose = require('mongoose');

var userSchema  = new mongoose.Schema(
    {
        Username : { type: String , required: true } ,
        Email : { type: String , required: true } ,
        password : { type: String , required: true } ,
        nic : { type: String , required: true,  max: 13 } ,
        phone : { type: String , required: true } ,
        role: { type: String, required: true  },
        // verificationCode: { type: String,},
        verified: { type: String, default: 'false'},
    }
  );

  var userDataModel = mongoose.model('users', userSchema); 
  module.exports =  userDataModel;


