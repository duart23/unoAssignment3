// stores/socketStore.ts
import { join } from "path";
import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    socket: null as Socket | null,
  }),

  actions: {
    connect(playerId: string) {
      if (!this.socket || !this.socket.connected) {
        this.socket = io("http://localhost:5000");

        this.socket.on("connect", () => {
          console.log("Socket connected:", this.socket?.id);
          this.socket?.emit("login", { playerId });
        });

        this.socket.on("loginSuccess", ({ playerId }) => {
          console.log("✅ Login confirmed for:", playerId);
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
    joinGame(gameId: string, playerId: string) {
      if (this.socket) {
        this.socket.emit("joinGame", { gameId, playerId });
      } else {
        console.error("Socket is not connected");
      }
    },
    leaveGame(gameId: string, playerId: string) {
      if (this.socket) {
        this.socket.emit("leaveGame", { gameId, playerId });
      } else {
        console.error("Socket is not connected");
      }
    },
    startHand(gameId: string) {
      if (this.socket) {
        this.socket.emit("startHand", { gameId });
      } else {
        console.error("Socket is not connected");
      }
    },
  },
});
