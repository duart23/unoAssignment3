import axios from "axios";
import { Player } from "@/interfaces/IGame";

const API_BASE = "/api/players";

export async function apiCreatePlayer(name: string, password: string): Promise<Player> {
    const response = await axios.post(`${API_BASE}/create`, { name, password });
    return response.data;
}

export async function apiLoginPlayer(name: string, password: string): Promise<Player> {
  const response = await axios.post(`${API_BASE}/login`, { name, password });
  return response.data;
}

export async function apiUpdatePlayer(_id: string, updates: Partial<Player>): Promise<Player> {
  const response = await axios.put(`${API_BASE}/updatePlayer/${_id}`, updates);
  return response.data;
}

export async function apiGetPlayerById(_id: string): Promise<Player> {
  const response = await axios.get(`${API_BASE}/${_id}`);
  return response.data;
}

export async function apiGetAllPlayersFromGame(gameId: string): Promise<Player[]> {
  const response = await axios.get(`${API_BASE}/game/${gameId}`);
  return response.data;
}
