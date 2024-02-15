const validator = require('validatorjs');

const savePart = (req, res, next) => {
    const validationRule = {
        part_name: 'required|string',
        category: 'string',
        brand: 'required|string',
        price: 'string',
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).json({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            next();
        }
    });
};

module.exports = {
    savePart,
};
