"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
const allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount++;
    console.log(`User connected: ${userCount}`);
    console.log(allSockets.toString());
    socket.on("message", (message) => {
        console.log(`Message received: ${message}`);
        for (let i = 0; i < allSockets.length; i++) {
            const users = allSockets[i];
            users.send(`Message sent: ${message} from server`);
        }
    });
});
