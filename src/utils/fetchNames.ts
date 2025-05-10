import type { BabyName } from "../types";

export async function fetchNames(): Promise<BabyName[]> {
  const API_URL = import.meta.env.VITE_API_SHEETBEST_URL;

  if (!API_URL) throw new Error(`Invalid API_URL`);

  try {
    const response = await fetch(`${API_URL}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch names: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
