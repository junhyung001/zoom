import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname+"/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);      //<-옆 방식은 express를 사용하는 http를 지원하는 것이고, ws를 사용하려면 다른 function을 사용해야 한다.
const server = http.createServer(app);          //http서버 돌리기
const wss = new WebSocket.Server({server});     //wss서버 돌리기

// function handleConnection(socket){
//     console.log(socket)
// }

function onSocketClose(){
    console.log("Disconnected from the Browser X");
}

const sockets = []

wss.on("connection", (socket)=>{
    sockets.push(socket)
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close", onSocketClose);
    socket.on("message", (msg) =>{
        const message = JSON.parse(msg);
        switch(message.type){
            case "new_message":
                sockets.forEach((aSocket)=> aSocket.send(`${socket.nickname}: ${message.payload}`));
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
});

server.listen(3000, handleListen)