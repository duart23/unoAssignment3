// stores/socketStore.ts
import { join } from "path";
import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    socket: null as Socket | null,
  }),

  actions: {
    connect(_id: string) {
      if (!this.socket || !this.socket.connected) {
        this.socket = io("http://localhost:5000");

        this.socket.on("connect", () => {
          console.log("Socket connected:", this.socket?.id);
          this.socket?.emit("login", { _id });
        });

        this.socket.on("loginSuccess", ({ _id }) => {
          console.log("✅ Login confirmed for:", _id);
        });

        this.socket.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
        });
      }
    },
    disconnect() {
      this.socket?.disconnect();
      this.socket = null;
    },
    joinGame(_id: string, playerId: string) {
      if (this.socket) {
        this.socket.emit("joinGame", { _id, playerId });
      } else {
        console.error("Socket is not connected");
      }
    },
    leaveGame(_id: string, playerId: string) {
      if (this.socket) {
        this.socket.emit("leaveGame", { _id, playerId });
      } else {
        console.error("Socket is not connected");
      }
    },
    startHand(_id: string) {
      if (this.socket) {
        this.socket.emit("startHand", { _id });
      } else {
        console.error("Socket is not connected");
      }
    },
  },
});
