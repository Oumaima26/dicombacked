const { Admin, validateUser, validateLogin } = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    login: async (req, res) => {
        const { error } = validateLogin(req.body)
        if (error) return res.status(400).send({ status: false, message: error.details[0].message })
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.send({ status: false, message: 're-enter your data' });
        const validPass = await bcrypt.compare(req.body.password, admin.password);
        if (!validPass) return res.send({ status: false, message: 're-enter your data' })
        jwt.sign({ admin }, 'secretkey', (err, token) => {
            res.json({ status: true, id: admin.id, token: token, role: admin.role });
        });
    },

    register: async (req, res) => {
        const { error } = validateUser(req.body)
        if (error) return res.send({ status: false, message: error.details[0].message })
        const emailExist = await Admin.findOne({ email: req.body.email });
        if (emailExist) return res.send({ status: false, message: 'Email admin before' });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const admin = new Admin({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: hashPassword,
        })
        admin.save().then(() => res.json('added')).catch(err => res.status(400).json('Error: ' + err));
    },

    afficheAdmin: async (req, res) => {
        Admin.find()
            .then(admins => res.json(admins))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    
     //** SUPPRESSION D'UN ADMIN **/
     supprimerAdmin: (req,res)=>{
        admin.findOneAndRemove({_id:req.params.id},(err,list)=>{
          if(err){
              res.json({state : 'no', msg :'error'+err})
          }else{
            res.json({state : 'ok',msg:'done'}) 
          }
      })  
    },
}