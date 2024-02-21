const mongodb = require('../modelsFolder');
const users_model = mongodb.users_model;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    users_model
        .find({}, {})
        .then((data) => {
            if (!data.length) {
                res.status(404).send({ message: `No users found.` });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Error getting users',
                error: error.message,
            });
        });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to find a user.');
        return;
    }

    try {
        constId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .collection('users')
            .find({ _id: userId })
            .toArray();

        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error getting user',
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {
    /* Check request content. */
    const user = {
        email: 'required|email',
        username: 'required|string',
        name: 'required|string',
        avatarImg: 'required|string',
    };

    mongodb
        .getDb()
        .collection('users')
        .insertOne(user, (insertErr, response) => {
            if (insertErr) {
                res.status(500).json({
                    message: 'Some error occurred while creating a user',
                    error: insertErr,
                });
            } else {
                res.status(201).send();
            }
        });
};

const updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to update the user.');
        return;
    }

    const userId = new ObjectId(req.params.id);
    const updatedUser = {
        $set: {
            email: 'required|email',
            username: 'required|string',
            name: 'required|string',
            avatarImg: 'required|string',
        },
    };

    try {
        const response = await mongodb
            .getDb()
            .collection('users')
            .updateOne({ _id: userId }, updatedUser);

        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating User',
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json(
            'Must use a valid User id to delete User.'
        );
        return;
    }

    const userId = new ObjectId(req.params.id);

    try {
        const response = await mongodb
            .getDb()
            .collection('users')
            .deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting User',
            error: error.message,
        });
    }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};