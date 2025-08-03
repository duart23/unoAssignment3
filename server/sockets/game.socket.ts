import { Server, Socket } from "socket.io";
import { getPlayerById } from "../services/PlayerService";
import { getCurrentHand, getGameById } from "../services/GameService";

export function registerGameHandlers(io: Server, socket: Socket) {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });

  socket.on("login", ({ _id }) => {
    socket.data._id = _id;
    socket.join(_id);
    io.to(_id).emit("loginSuccess", { _id });
  });

  socket.on("joinGame", async ({ _id, playerId }) => {
    socket.join(_id);
    console.log(`Player ${playerId} joined game ${_id}`);
    try {
      const player = await getPlayerById(playerId);
      io.to(_id).emit("playerJoined", { playerName: player?.name });
    } catch (error) {
      console.error(`Failed to get player info for ${_id}:`, error);
    }
  });

  socket.on("leaveGame", async ({ _id, playerId }) => {
    socket.leave(_id);
    console.log(`Player ${playerId} left game ${_id}`);
    try {
      const player = await getPlayerById(playerId);
      io.to(_id).emit("playerLeft", { playerName: player?.name });
    } catch (error) {
      console.error(`Failed to get player info for ${_id}:`, error);
    }
  });

  socket.on("startHand", async ({ _id }) => {
    console.log("Starting hand for game:", _id);

    const game = await getGameById(_id);
    if (!game) {
      console.error("Game not found for ID:", _id);
      return; // or emit an error event back to client
    }

    const currentHand = await getCurrentHand(_id);
    io.to(_id).emit("handStarted", { _id: currentHand._id });
  });

  socket.on("playCard", ({ _id, card, playerId }) => {
    console.log(`${playerId} played`, card);

    io.to(_id).emit("gameUpdated", {
      /* updated state here */
    });
  });

  socket.on("drawCard", ({ _id, playerId }) => {
    // Deal card to player
    io.to(_id).emit("cardDrawn", {
      playerId,
      card: {
        /*...*/
      },
    });
  });

  socket.on("endGame", ({ _id, winner }) => {
    console.log(`Game ${_id} ended. Winner: ${winner}`);
    io.to(_id).emit("gameEnded", { winner });
  });

  socket.on("gameUpdate", ({ _id, update }) => {
    console.log(`Game update for ${_id}:`, update);
    io.to(_id).emit("gameUpdated", update);
  });
}
