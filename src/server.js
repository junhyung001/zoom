import http from "http";
import {Server} from "socket.io"
import express from "express";

const app = express();

app.set("view engine", "pug");                              // 프론트앤드에서 pug를 활용해 프론트앤드 구현
app.set("views", __dirname+"/views");                       // view를 구현할때 views폴더 안에 pug를 활용
app.use("/public", express.static(__dirname + "/public"));  //plulic 폴더속에 있는 파일을 활용
app.get("/", (req, res) => res.render("home"));             // req와 res 둘다 home으로 읽어옴
app.get("/*", (req, res) => res.redirect("/"));             // res을 받아왔을때 only home으로 이동하는것을 작성

const httpServer = http.createServer(app);          //http서버 돌리기
const wsServer = new Server(httpServer);            //SoketIo의 내부함수를 활용해 무엇인가 만들고 outfut함

wsServer.on("connection", socket =>{
    socket.on("enter_room", (roomName, done)=> {
        console.log(roomName);
        setTimeout(() => {
            done("hello from the backend");
        }, 10000);
    });
});

/*  const sockets = []
    wss.on("connection", (socket)=>{
    sockets.push(socket)
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close", () => {
        console.log("Disconnected from the Browser X")      // server가 연결이 끊겼을때 consol.log를 찍을 수 있는 함수
    });
    socket.on("message", (msg) =>{
        const message = JSON.parse(msg);
        switch(message.type){
            case "new_message":
                sockets.forEach((aSocket)=> aSocket.send(`${socket.nickname}: ${message.payload}`));
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
}); */
//websocket을 활용한 함수 socket Io를 활용한 코드를 작성하기위한 주석

const handleListen = () => console.log(`Listening on http://localhost:3000`); // 함수가 호출되었을때 http://localhost:3000페이지를 생성함을 알려주는 log 

httpServer.listen(3000, handleListen);