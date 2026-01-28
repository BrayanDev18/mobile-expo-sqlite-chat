import { GifProps, GiphyApiGif } from "@/interfaces";

export const mapApiGif = (apiGif: GiphyApiGif): GifProps => ({
  id: apiGif.id,
  url: apiGif.images.original.url,
  previewUrl: apiGif.images.fixed_width_small.url,
  width: Number(apiGif.images.original.width),
  height: Number(apiGif.images.original.height),
  title: apiGif.title,
});
