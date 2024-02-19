const express = require('express');
const router = express.Router();
const partsController = require('../controllersFolder/parts');
const { isAuthenticated } = require('../middlewareFolder/authenticate');
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
