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
  // Broadcast a message to all clients when a new user connects
  socket.broadcast.emit("user connected", { id: socket.id });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg)
  });
  
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
    // Broadcast to all clients that a user has disconnected
    socket.broadcast.emit("user disconnected", { id: socket.id });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
