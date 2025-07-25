import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app";
import connectDB from "./db/connect";
import { registerGameHandlers } from "./sockets/game.socket";
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  registerGameHandlers(io, socket);
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

export { io, server };
