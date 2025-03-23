import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080});
interface Users{
    socket: WebSocket;
    roomId: string;
}
let allSockets: Users[] = [];
wss.on("connection", (socket)=>{
    socket.on("message" , (message)=>{
        const parsedMessage = JSON.parse(message as unknown as string);
        // @ts-ignore
        if(parsedMessage.type === "join"){
            allSockets.push({socket,
                roomId:parsedMessage.payload.roomId});
        }
        if(parsedMessage.type === "chat"){
            let currentUserRoom = null; 
            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i].socket == socket){
                    currentUserRoom = allSockets[i].roomId;
                }
            }
            // allSockets.forEach((s)=>{
            //     if(s.roomId === currentRoomId){
            //         s.socket.send(parsedMessage.payload.message);
            //     }   
            // })
            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i].roomId === currentUserRoom){
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    })
    
})