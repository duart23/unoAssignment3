import axios from "axios";
import { IGame, Player } from "@/interfaces/IGame";

const API_BASE = "/api/players";

export async function apiCreatePlayer(name: string, password: string): Promise<Player> {
    const response = await axios.post(`${API_BASE}/create`, { name, password });
    return response.data;
}

export async function apiLoginPlayer(name: string, password: string): Promise<Player> {
  const response = await axios.post(`${API_BASE}/login`, { name, password });
  return response.data;
}

export async function apiUpdatePlayer(playerId: string, updates: Partial<Player>): Promise<Player> {
  const response = await axios.put(`${API_BASE}/updatePlayer/${playerId}`, updates);
  return response.data;
}

export async function apiGetPlayerById(playerId: string): Promise<Player | null> {
  const response = await axios.get(`${API_BASE}/${playerId}`);
  return response.data;
}
