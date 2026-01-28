import { getGifs } from "@/expo-sqlite/actions";
import { GifProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

export const useGifs = () => {
  const [gifs, setGifs] = useState<GifProps[]>();
  const [loadingGifs, setLoadingGifs] = useState(false);

  const loadGifs = useCallback(async () => {
    setLoadingGifs(true);
    try {
      const res = await getGifs();

      setGifs(res as GifProps[]);
    } catch (error) {
      console.error("error getting gifs", error);
    } finally {
      setLoadingGifs(false);
    }
  }, []);

  useEffect(() => {
    loadGifs();
  }, [loadGifs]);

  return {
    gifs: gifs as GifProps[],
    loadingGifs,
  };
};
