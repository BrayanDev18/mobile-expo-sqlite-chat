import { GiphyApiGif } from "@/interfaces";
import { chatDb, gifs } from "../db";
import { mapApiGif } from "../mappers";

export const upsertGif = async (apiGif: GiphyApiGif) => {
  const gif = mapApiGif(apiGif);

  await chatDb.insert(gifs).values(gif).onConflictDoUpdate({
    target: gifs.id,
    set: gif,
  });

  return gif;
};

export const getGifs = async (limit = 60) => {
  return await chatDb.select().from(gifs).limit(limit);
};
