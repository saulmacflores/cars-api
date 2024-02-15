module.exports = (mongoose) => {
    const parts_model = mongoose.model(
        'parts',
        mongoose.Schema(
            {
                /* Enter json here. */
            },
            { timestamps: true }
        )
    );
    return parts_model;
};
