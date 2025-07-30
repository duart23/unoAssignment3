import { IGame } from "@/interfaces/IGame";
import { IHand } from "@/interfaces/IHand";
import axios from "axios";
const API_BASE = "/api/hands";

export async function apiCreateHand(gameId: string): Promise<IHand> {
  const response = await axios.post(`${API_BASE}/create`, { gameId });
  return response.data;
}


export async function apiGetHandById(_id: string): Promise<IHand> {
  const response = await axios.get(`${API_BASE}/${_id}`);
  return response.data;
}

export async function apiUpdateHand(_id: string, updates: Partial<IHand>): Promise<IGame> {
  const response = await axios.put(`${API_BASE}/update/${_id}`, updates);
  return response.data;
}
