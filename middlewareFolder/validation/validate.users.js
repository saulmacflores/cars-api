const validator = require('./validate.setup');

// Create saveUser

const saveUser = async (req, res, next) => {
    const validationRule = {
        email: 'required|email',
        username: 'required|string',
        name: 'required|string',
        avatarImg: 'required|string',
    }
    await validator(req.body, validationRule, {}, (error, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: error,
            });
        } else {
            next();
        }
    }).catch((err) => console.log(err));
};

module.exports = {
    saveUser,
};