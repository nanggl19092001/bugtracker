"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ticketSchema = new mongoose_1.default.Schema({
    summary: { type: String, required: true },
    description: { type: String, default: "" },
    severity: { type: Number, required: true },
    asignee: { type: String, required: true },
    status: { type: Number, required: true },
    version: { type: String, default: "0.0" },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    deadline: { type: Date, required: false, default: 0 }
});
module.exports = mongoose_1.default.model('ticket', ticketSchema);
