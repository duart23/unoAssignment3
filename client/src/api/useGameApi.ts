import axios from "axios";
import { IGame } from "../interfaces/IGame";
import { IHand } from "../interfaces/IHand";

const API_BASE = "/api/games";

export async function apiCreateGame(): Promise<IGame> {
  const response = await axios.post(`${API_BASE}/create`);
  return response.data;
}

export async function apiJoinGame(_id: string, playerId: string): Promise<IGame> {
  const response = await axios.post(`${API_BASE}/join`, { _id, playerId });
  return response.data;
}

export async function apiGetAllGames(): Promise<IGame[]> {
  const response = await axios.get(`${API_BASE}`);
  return response.data;
}

export async function apiGetGameById(_id: string): Promise<IGame> {
  const response = await axios.get(`${API_BASE}/${_id}`);
  return response.data;
}

export async function apiUpdateGame(_id: string, updates: Partial<IGame>): Promise<IGame> {
  const response = await axios.put(`${API_BASE}/updateGame/${_id}`, updates);
  return response.data;
}

export async function apiLeaveGame(_id: string, playerId: string): Promise<void> {
  const response = await axios.put(`${API_BASE}/leave`, { _id, playerId });
  return response.data;
}

export async function apiGetCurrentHand(_id: string): Promise<IHand> {
  const response = await axios.get(`${API_BASE}/currentHand/${_id}`);
  return response.data;
}