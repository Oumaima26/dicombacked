const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.get('/',adminController.afficheAdmin);
router.post('/register',adminController.register);
router.post('/login',adminController.login);
router.delete('/supprimer/:id',adminController.supprimerAdmin);
router.put('/update/:id',adminController.UpdateAdmin)

router.get('/afficher/:id',adminController.getbyid)
module.exports=router