"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        // @ts-ignore
        if (parsedMessage.type === "join") {
            allSockets.push({ socket,
                roomId: parsedMessage.payload.roomId });
        }
        if (parsedMessage.type === "chat") {
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].socket == socket) {
                    currentUserRoom = allSockets[i].roomId;
                }
            }
            // allSockets.forEach((s)=>{
            //     if(s.roomId === currentRoomId){
            //         s.socket.send(parsedMessage.payload.message);
            //     }   
            // })
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].roomId === currentUserRoom) {
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
