export interface GiphyApiGif {
  id: string;
  title: string;
  images: {
    original: {
      url: string;
      width: string;
      height: string;
    };
    fixed_width_small: {
      url: string;
    };
  };
}

export interface GifProps {
  id: string;
  url: string;
  previewUrl: string;
  width?: number;
  height?: number;
  title?: string;
}
