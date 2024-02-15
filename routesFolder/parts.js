const express = require('express');
const router = express.Router();
const studentsController = require('../controllersFolder/parts');
//const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');
const validator = require('../middlewareFolder/validation/validate.parts');

router.get('/', partsController.getAll);
router.get('/:id', partsController.getSingle);

router.post(
    '/',
    isAuthenticated,
    validator.savePart,
    partsController.createPart
);
router.put(
    '/:id',
    isAuthenticated,
    validator.savePart,
    partsController.updatePart
);
router.delete('/:id', isAuthenticated, partsController.deletePart);
module.exports = router;
