import type { BabyName } from "../types";

export async function fetchNames(): Promise<BabyName[]> {
  try {
    const response = await fetch(
      "https://api.sheetbest.com/sheets/8ab858e3-a6ac-4666-afe6-cc44bfa9e2b3"
    );

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
