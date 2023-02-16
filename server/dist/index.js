"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const cors = require('cors');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io');
const DBConnection = require('../database');
const server = http.createServer(app);
const io = new Server(server);
const classUser = require('./middleware/user');
const routes = require('./routes/index.route');
const PORT = 3000 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('handlebars', engine());
app.set('socketio', io);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));
app.use('/public', express.static(path.join(__dirname, '../public')));
io.on("connection", (socket) => {
    socket.on('join-room', (id) => {
        console.log(id);
        socket.join(id);
    });
});
routes(app);
server.listen(PORT, () => {
    console.warn("SERVER UP PORT " + PORT);
});
