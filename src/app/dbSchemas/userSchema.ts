import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String
    },
    {
        strict: true,
        collection: 'users'
    }
);

export const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);
