import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"; // Import CORS

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your frontend's origin
    methods: ["GET", "POST"], // Allowed methods
  },
});
// Enable CORS for all routes
app.use(cors()); // This will allow all origins by default

const PORT = 3000;

io.on("connection", (socket) => {
  //Display the user id
  console.log("a user connected: " + socket.id);

  //Send the user Id to the client side, so that the other users will be informed of his/her joinning
  socket.broadcast.emit("Connected user", socket.id);

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

  // // Handle disconnection
  socket.on("disconnecting", () => {
    console.log("user disconnected: " + socket.id);
    // Broadcast to all clients that a user has disconnected
    socket.broadcast.emit("Disconnected user",socket.id );
  });

  //socket.disconnect(false);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
