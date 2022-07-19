const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.get('/',adminController.afficheAdmin);
router.post('/register',adminController.register);
router.post('/login',adminController.login);
router.delete('/supprimer/:id',adminController.supprimerAdmin);

module.exports=router