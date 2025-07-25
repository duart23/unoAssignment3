import { Server, Socket } from "socket.io";

export function registerGameHandlers(io: Server, socket: Socket) {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });

  // Example: Listen for test event
  socket.on("test", (data) => {
    console.log("Received test data:", data);
    socket.emit("testResponse", { message: "Hello from server!" });
  });
}
