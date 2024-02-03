const validator = require('./validate.setup');
const saveStore = async (req, res, next) => {
    const validationRule = {
        store_id: 'required|string',
        store_name: 'string',
        vehicle_inventory: 'array',
        parts_inventory: 'array',
    };

    await validator(req.body, validationRule, {}, (error, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            next();
        }
    }).catch((err) => console.log(err));
};
module.exports = {
    saveStore,
};
