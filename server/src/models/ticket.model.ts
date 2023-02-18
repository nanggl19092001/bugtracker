import mongoose from "mongoose";

interface Ticket {
    summary: String,
    description: String,
    severity: Number,
    asignee: String,
    status: Number,
    version: String,
    created: Date,
    updated: Date,
    deadline: Date
}

interface TicketModel extends Ticket, mongoose.Document {}

const ticketSchema = new mongoose.Schema<TicketModel>({
    summary: {type: String, required: true},
    description: {type: String, default: ""},
    severity: {type: Number, required: true},
    asignee: {type: String, required: true},
    status: {type: Number, required: true},
    version: {type: String, default: "0.0"},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    deadline: {type: Date, required: false, default: 0}
})

module.exports = mongoose.model<TicketModel>('ticket', ticketSchema)