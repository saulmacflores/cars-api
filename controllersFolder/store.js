const db = require('../modelsFolder');
const store_model = db.stores;

// Creates a Store
exports.createStore = (req, res) => {
    /*
        #swagger.summary = 'Creates a Store Record'
        #swagger.tags=['Stores']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/storeRecord' }
        }
        #swagger.responses[400] = {
            schema: { message: `Content can not be empty!`}
        }
        #swagger.responses[401] = {
            schema: {$ref: '#/definitions/notAuthed'}
        }
        #swagger.responses[500] = {
            schema: { message: `Some error occurred while creating a Store Record.`}
        }
    */
    if (!req.body.store_id) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    const store = new store_model({
        store_id: req.body.store_id,
        store_name: req.body.store_name,
        vehicle_inventory: req.body.vehicle_inventory,
        parts_inventory: req.body.parts_inventory,
    });

    store
        .save(store)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Error creating a Store.`,
                });
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Some error occurred while creating a Store.`,
            });
        });
};

exports.findAllStores = (req, res) => {
    /*
        #swagger.summary = 'Gets all Store Records'
        #swagger.tags=['Stores']
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/storeRecord'}]
        }
        #swagger.responses[404] = {
            schema: { message: 'No Stores found.' }
        }
        #swagger.responses[500] = {
            schema: { message: `Some error occured while retrieving Store Records.`}
        }
    */
    store_model
        .find(
            {},
            {
                store_id: 1,
                store_name: 1,
                vehicle_inventory: 1,
                parts_inventory: 1,
                _id: 0,
            }
        )
        .then((data) => {
            if (!data.length) {
                res.status(404).send({ message: `No Stores found.` });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Some error occured while retrieving Stores.`,
            });
        });
};

// Finds a single store
exports.findOneStore = (req, res) => {
    /*
        #swagger.summary = 'Gets a Store Record'
        #swagger.tags=['Stores']
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/storeRecord'}
        }
        #swagger.responses[404] = {
            schema: { message: `No Store Record found for id of [store_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving Store Record with id of [store_id].`}
        }
    */
    const store_id = req.params.store_id;
    store_model
        .find({ store_id: store_id })
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message: `No Store found with id of ${store_id}.`,
                });
            } else {
                res.send(data[0]);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error retrieving Store with id of ${store_id}.`,
            });
        });
};

// Updates a store
exports.updateStore = (req, res) => {
    /*
        #swagger.summary = 'Updates a Store Record'
        #swagger.tags=['Stores']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {$ref: '#/definitions/storeRecord'}
        }
        #swagger.responses[400] = {
            schema: { message: 'Updated data cannot be empty!' }
        }
        #swagger.responses[401] = {
            schema: {$ref: '#/definitions/notAuthed'}
        }
        #swagger.responses[404] = {
            schema: { message: `No Store Record found for id of [store_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error updating Store Record with id of [store_id].`}
        }
    */
    if (!req.body.store_id) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    const store = {
        store_id: req.body.store_id,
        store_name: req.body.store_name,
        vehicle_inventory: req.body.vehicle_inventory,
        parts_inventory: req.body.parts_inventory,
    };

    store_model
        .findOneAndUpdate({ store_id: store.store_id }, store)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No Store found with id of ${store.store_id}.`,
                });
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error updating Store with id of ${store.store_id}.`,
            });
        });
};

exports.deleteStore = (req, res) => {
    /*
        #swagger.summary = 'Deletes a Store Record'
        #swagger.tags=['Stores']
        #swagger.responses[401] = {
            schema: {$ref: '#/definitions/notAuthed' }
        }
        #swagger.responses[404] = {
            schema: { message: `No Store Record found for id of [store_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error deleting Store Record with id of [store_id].`}
        }
    */
    const store_id = req.params.store_id;
    store_model
        .findOneAndDelete({ store_id: store_id })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No Store found with id of ${store.store_id}.`,
                });
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error deleting Storewith id of ${store.store_id}.`,
            });
        });
};
