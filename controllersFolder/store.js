const db = require('../modelsFolder');
const store_model = db.stores;

// Creates a Store
exports.createStore = (req, res) => {
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

exports.deleteStore = () => {
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
