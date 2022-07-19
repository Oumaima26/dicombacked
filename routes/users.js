const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/',userController.afficheUser);
router.post('/register',userController.register);
router.post('/login',userController.login);

router.get('/afficher/:id',userController.getbyid)
router.put('/update/:id',userController.UpdateUser)

router.delete('/supprimer/:id',userController.suprimerUser)
module.exports=router