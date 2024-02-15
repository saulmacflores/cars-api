const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helpers/validate');

const savePart = (req, res, next) => {
    const validationRule = {
        part_name: 'required|string',
        category: 'required|string',
        brand: 'required|string',
        price: 'required|string',
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

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('parts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error getting parts', error: error.message });
    }
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid part id to find a a car part.');
        return;
    }

    try {
        const partId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('parts').find({ _id: partId }).toArray();

        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Car part not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting Car part', error: error.message });
    }
};

const createPart = async (req, res) => {
    const part = {
        part_name: req.body.part_name,
        category: req.body.category,
        brand: req.body.brand,
        price: req.body.price,
    };

    try {
        const validationRule = {
            part_name: 'string',
            category: 'string',
            brand: 'string',
            price: 'string',
        };

        validator(part, validationRule, {}, (err, status) => {
            if (!status) {
                res.status(412).json({
                    success: false,
                    message: 'Validation failed',
                    data: err,
                });
            } else {
                mongodb.getDb().collection('parts').insertOne(part, (insertErr, response) => {
                    if (insertErr) {
                        res.status(500).json({ message: 'Some error occurred while creating the part', error: insertErr });
                    } else {
                        res.status(201).send();
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating part', error: error.message });
    }
};

const updatePart = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid part id to update a car part.');
        return;
    }

    const partId = new ObjectId(req.params.id);
    const updatedPart = {
        $set: {
            part_name: 'required|string',
            category: 'required|string',
            brand: 'required|string',
            price: 'required|string',
        },
    };

    try {

        const response = await mongodb.getDb().collection('parts').updateOne({ _id: partId }, updatedPart);

        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            res.status(404).json({ message: 'Car part not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating car part', error: error.message });
    }
};

const deletePart = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid car part id to delete a car part.');
        return;
    }

    const partId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().collection('parts').deleteOne({ _id: partId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Part not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting part', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createPart,
    updatePart,
    deletePart,
    savePart, 
};
