import axios from "axios";
import { IGame } from "@/interfaces/IGame";

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
  const response = await axios.get(`${API_BASE}/all`);
  return response.data;
}

export async function apiGetGameById(gameId: string): Promise<IGame> {
  const response = await axios.get(`${API_BASE}/${gameId}`);
  return response.data;
}

export async function apiUpdateGame(handId: string, updates: Partial<IGame>): Promise<IGame> {
  const response = await axios.put(`${API_BASE}/update/${handId}`, updates);
  return response.data;
}
