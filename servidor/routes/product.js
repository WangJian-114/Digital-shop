const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole, } = require('../middlewares');
const { existeProducto } = require('../helpers/db-validators');
const { subirArchivo } = require('../middlewares/subirArchivo');
const  productController  = require('../controllers/productController');

const router = Router();

// Obtener todos los productos - Publico
router.get('/', productController.getProducts);

// Crear Producto - privado - solo ADMIN_ROLE
router.post('/', 
    subirArchivo,
    [ 
    check('name', 'The name is required').not().isEmpty(),
    validarJWT,
    esAdminRole,
    validarCampos
    ],
    productController.createProduct
);

// Actualizar Producto - privado - solo ADMIN_ROLE
router.put('/:id',
    validarJWT, 
    subirArchivo,
    [
        esAdminRole,
        validarCampos
    ],
    productController.updateProduct    
);

// Borrar una Producto - privado - solo ADMIN_ROLE
router.delete('/:id',[ 
    validarJWT, 
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
    ],
    productController.deleteProduct
);

module.exports = router;