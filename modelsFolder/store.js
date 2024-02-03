module.exports = (mongoose) => {
    const store_model = mongoose.model(
        'store',
        mongoose.Schema(
            {
                store_id: String,
                store_name: String,
                vehicle_inventory: Array,
                parts_inventory: Array,
            },
            { timestamps: true }
        )
    );
    return store_model;
};
