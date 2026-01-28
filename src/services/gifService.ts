import { upsertGif } from "@/expo-sqlite/actions";
import { GiphyApiGif } from "@/interfaces";

const GIPHY_API_KEY = process.env.EXPO_PUBLIC_GIPHY_API_KEY!;
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs";

export const fetchTrendingGifs = async (
  limit: number,
): Promise<GiphyApiGif[]> => {
  const response = await fetch(
    `${GIPHY_BASE_URL}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&rating=g`,
  );

  if (!response.ok) {
    throw new Error(`Giphy error: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
};

export const syncTrendingGifsFromAPI = async () => {
  const apiGifs = await fetchTrendingGifs(60);

  await Promise.all(apiGifs.map(upsertGif));
};
