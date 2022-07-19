const mongoose = require('mongoose');
const Joi=require('joi')
const Schema= mongoose.Schema;

const userSchema = new Schema({
    
    nom: {type: String, default: ""},
    prenom: {type: String, default: ""},
    password: {type: String, default: ""},
    email: {type: String, default: "", unique: true},
 },
 {
      timestamps: true 
 },)

 function validateUser(user){    
     const schema=Joi.object({     
         nom: Joi.string().allow('', null),
         prenom: Joi.string().allow('', null),
         email: Joi.string().email(),
         password: Joi.string().min(6).required(),
     }) 
     return schema.validate(user)
 }
 function validateLogin(login){
     const schema2 = Joi.object({
         email:Joi.string().required().email(),
         password:Joi.string().min(6).required()
     }) 
     return schema2.validate(login)
 }

 const User = mongoose.model('User',userSchema);

 module.exports.User = User;
 module.exports.validateLogin=validateLogin
 module.exports.validateUser=validateUser;