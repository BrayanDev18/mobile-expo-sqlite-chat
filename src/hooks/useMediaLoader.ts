import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

export const useMediaLoader = () => {
  const [media, setMedia] = useState<MediaLibrary.Asset[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const loadMedia = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const result = await MediaLibrary.getAssetsAsync({
        first: 30,
        sortBy: MediaLibrary.SortBy.creationTime,
        mediaType: ["photo", "video"],
        after: endCursor,
      });

      setMedia((prev) => [...prev, ...result.assets]);
      setHasMore(result.hasNextPage);
      setEndCursor(result.endCursor);
    } catch (error) {
      console.error("Error loading media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMore = () => {
    if (hasMore && !isLoading) {
      loadMedia();
    }
  };

  return { media, hasMore, loadMore, isLoading };
};
