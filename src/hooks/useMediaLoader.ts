import * as MediaLibrary from "expo-media-library";
import {useCallback, useEffect, useState} from "react";

export const useMediaLoader = () => {
  const [media, setMedia] = useState<MediaLibrary.Asset[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const loadMedia = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }

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
  }

  const loadMore = () => {
    if (hasMore && !isLoading) {
      loadMedia();
    }
  };

  useEffect(() => {
    MediaLibrary.requestPermissionsAsync().then(({status}) => {
      if (status === "granted") {
        loadMedia().then()
      }
    });
  }, [loadMedia]);

  return { media, hasMore, loadMore, loadMedia, isLoading };
};
