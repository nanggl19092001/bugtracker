import mongoose from 'mongoose'
import { genToken } from '../utils/gentoken'

interface Verify {
    email: string,
    token: string,
    end: Date
}

interface VerifyModel extends Verify, mongoose.Document{}

const verifySchema = new mongoose.Schema<VerifyModel>({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: genToken
    },
    end: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model<VerifyModel>('verify', verifySchema)