const router = require('express').Router();
const passport = require('passport');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const Stores = require('./store');
const Vehicles = require('./vehicles');

// use the swagger documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/stores', Stores);
router.use('/vehicles', Vehicles);

// routes for car parts collection
router.use('/parts', require('./parts'));

router.get(
    '/login',
    passport.authenticate('github'),
    (req, res) => {}
    /*
        #swagger.tags=['Authentication']
        #swagger.summary="Logs the User in"
    */
);
router.get(
    '/logout',
    (req, res, next) => {
        req.logout((error) => {
            if (error) {
                res.redirect('/api-docs');
            }
        });
        res.redirect('/');
    }
    /*
        #swagger.tags=['Authentication']
        #swagger.summary="Logs the User out"
    */
);

module.exports = router;
