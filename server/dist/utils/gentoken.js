"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = void 0;
function genToken() {
    return Math.floor(Math.random() * 8999 + 1000).toString();
}
exports.genToken = genToken;
