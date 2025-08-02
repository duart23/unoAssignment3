import axios from "axios";
import { IGame } from "@/interfaces/IGame";
import { IHand } from "@/interfaces/IHand";

const API_BASE = "/api/games";

export async function apiCreateGame(): Promise<IGame> {
  const response = await axios.post(`${API_BASE}/create`);
  return response.data;
}

export async function apiJoinGame(playerId: string, gameId: string): Promise<IGame> {
  const response = await axios.post(`${API_BASE}/join`, { playerId, gameId });
  return response.data;
}

export async function apiGetAllGames(): Promise<IGame[]> {
  const response = await axios.get(`${API_BASE}`);
  return response.data;
}

export async function apiGetGameById(gameId: string): Promise<IGame> {
  const response = await axios.get(`${API_BASE}/${gameId}`);
  return response.data;
}

export async function apiUpdateGame(gameId: string, updates: Partial<IGame>): Promise<IGame> {
  const response = await axios.put(`${API_BASE}/updateGame/${gameId}`, updates);
  return response.data;
}

export async function apiLeaveGame(playerId: string, gameId: string): Promise<void> {
  const response = await axios.put(`${API_BASE}/leave`, { playerId, gameId });
  return response.data;
}

export async function apiGetCurrentHand(gameId: string): Promise<IHand> {
  const response = await axios.get(`${API_BASE}/currentHand/${gameId}`);
  return response.data;
}