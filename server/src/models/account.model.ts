import mongoose from "mongoose"

interface Account {
    email: String,
    firstname: String,
    lastname: String,
    phone: String,
    address: String,
    oauth: Boolean,
    password: String
}

interface AccountModel extends Account, mongoose.Document { }

const accountSchema = new mongoose.Schema<AccountModel>({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    firstname: String,
    lastname: String,
    phone: {
        type: String
    },
    address: {
        type: String
    },
    oauth: {
        type: Boolean, 
        default: false
    },
    password: {
        type: String, 
        default: ""
    }
})

export default mongoose.model<AccountModel>('account', accountSchema)