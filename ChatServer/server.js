import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"; // Import CORS

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"], 
  },
});
// Enable CORS for all routes
app.use(cors());

const PORT = 3000;

io.on("connection", (socket) => {

  // If you want to disconnect all users
  // io.sockets.sockets.forEach((s) => {
  //   s.disconnect(true);
  // });

  //Display the user id
  console.log("a user connected: " + socket.id);
  // Showing the number of total user in the chat room
  io.emit("total users", io.engine.clientsCount)

  //Joinning Message
  socket.on("joinning message", (userName)=>{
    console.log(userName  + "has joined the chat room")
    io.emit("joinning message", userName)
  })
  // socket.broadcast.emit("Connected user", socket.id);

  //Send the message
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg);
  });

  //Send the typing status
  socket.on("typing", (name) => {
    console.log(name + " is typing");
    socket.broadcast.emit("typing", name);
  });

  // Custom event when a user leaves
  socket.on("user leaving", (userName) => {
    console.log(userName + " is leaving the chat");
    // Broadcast the name of the user leaving
    socket.broadcast.emit("user leaving", `${userName} has left the chat room.`);
  });

   // Handle disconnection (just in case if user closes browser without clicking 'leave')
   socket.on("disconnect", () => {
    // console.log("user disconnected: " + socket.id);
    socket.broadcast.emit('total users', io.engine.clientsCount);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
