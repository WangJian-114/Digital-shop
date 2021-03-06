const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeUsuario }= require('../helpers/db-validators');

const { logIn, authenticatedUser, changePassword } = require('../controllers/authController');
const { validarJWT } = require('../middlewares');

const router = Router();


router.post('/login', [
      check('email','El email es obligatorio').not().isEmpty(),
      check('password','El password es obligatorio').not().isEmpty().isLength({ min:6}),
      validarCampos 
    ], logIn);

// Obtener el usuario autenticado
router.get('/user', 
    validarJWT,
    authenticatedUser
);


router.post('/password', [
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    validarCampos 
    ],changePassword);

module.exports = router;