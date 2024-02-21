module.exports = (mongoose) => {
    const user_model = mongoose.model(
        'user',
        mongoose.Schema(
            {
            email: 'required|email',
            username: 'required|string',
            name: 'required|string',
            avatarImg: 'required|string',
            },
            
            { timestamps: true }
        )
    );
    return user_model;
};