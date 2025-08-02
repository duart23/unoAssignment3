import { IGame } from "@/interfaces/IGame";
import { IHand } from "@/interfaces/IHand";
import axios from "axios";
const API_BASE = "/api/hands";

export async function apiCreateHand(gameId: string): Promise<IHand> {
  const response = await axios.post(`${API_BASE}/create`, { gameId });
  return response.data;
}


export async function apiGetHandById(handId: string): Promise<IHand> {
  const response = await axios.get(`${API_BASE}/${handId}`);
  return response.data;
}

export async function apiUpdateHand(_id: string, updates: IHand): Promise<IGame> {
  const response = await axios.put(`${API_BASE}/updateHand/${_id}`, updates);
  return response.data;
}
