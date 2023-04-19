"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gentoken_1 = require("../utils/gentoken");
const commentSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: gentoken_1.genToken
    },
    end: {
        type: Date,
        default: Date.now
    }
});
exports.default = commentSchema;
