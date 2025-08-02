import { Server, Socket } from "socket.io";
import { getPlayerById } from "../services/PlayerService";
import { getCurrentHand, getGameById } from "../services/GameService";

export function registerGameHandlers(io: Server, socket: Socket) {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });

  socket.on("login", ({ playerId }) => {
    socket.data.playerId = playerId;
    socket.join(playerId);
    io.to(playerId).emit("loginSuccess", { playerId });
  });

  socket.on("joinGame", async ({ gameId, playerId }) => {
    socket.join(gameId);
    console.log(`Player ${playerId} joined game ${gameId}`);
    try {
      const player = await getPlayerById(playerId);
      io.to(gameId).emit("playerJoined", { playerName: player?.name });
    } catch (error) {
      console.error(`Failed to get player info for ${playerId}:`, error);
    }
  });

  socket.on("leaveGame", async ({ gameId, playerId }) => {
    socket.leave(gameId);
    console.log(`Player ${playerId} left game ${gameId}`);
    try {
      const player = await getPlayerById(playerId);
      io.to(gameId).emit("playerLeft", { playerName: player?.name });
    } catch (error) {
      console.error(`Failed to get player info for ${playerId}:`, error);
    }
  });

  socket.on("startHand", async ({ gameId }) => {
    console.log("Starting hand for game:", gameId);

    const game = await getGameById(gameId);
    if (!game) {
      console.error("Game not found for ID:", gameId);
      return; // or emit an error event back to client
    }

    const currentHand = await getCurrentHand(gameId);
    io.to(gameId).emit("handStarted", { handId: currentHand._id });
  });

  socket.on("playCard", ({ gameId, card, playerId }) => {
    console.log(`${playerId} played`, card);

    io.to(gameId).emit("gameUpdated", {
      /* updated state here */
    });
  });

  socket.on("drawCard", ({ gameId, playerId }) => {
    // Deal card to player
    io.to(gameId).emit("cardDrawn", {
      playerId,
      card: {
        /*...*/
      },
    });
  });

  socket.on("endGame", ({ gameId, winner }) => {
    console.log(`Game ${gameId} ended. Winner: ${winner}`);
    io.to(gameId).emit("gameEnded", { winner });
  });

  socket.on("gameUpdate", ({ gameId, update }) => {
    console.log(`Game update for ${gameId}:`, update);
    io.to(gameId).emit("gameUpdated", update);
  });
}
