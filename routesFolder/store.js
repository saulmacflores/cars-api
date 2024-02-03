const router = require('express').Router();
const Stores = require('../controllersFolder/store');

const { isAuthenticated } = require('../middlewareFolder/authenticate');
const validator = require('../middlewareFolder/validation/validate.store');

router.get('/', Stores.findAllStores);
router.get('/:store_id', Stores.findOneStore);

router.post('/', isAuthenticated, validator.saveStore, Stores.createStore);

router.put(
    '/:store_id',
    isAuthenticated,
    validator.saveStore,
    Stores.updateStore
);

router.delete('/:store_id', isAuthenticated, Stores.deleteStore);

module.exports = router;
