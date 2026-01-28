import { AttachmentProps } from "@/interfaces";
import * as MediaLibrary from "expo-media-library";

export const formatMediaAsset = (
  asset: MediaLibrary.Asset,
): AttachmentProps => {
  const isVideo = asset.mediaType === "video";

  return {
    _id: asset.id,
    fileName: asset.filename,
    originalName: asset.filename,
    mimeType: isVideo
      ? `video/${asset.filename.split(".").pop()?.toLowerCase() || "mp4"}`
      : `image/${asset.filename.split(".").pop()?.toLowerCase() || "jpeg"}`,
    size: 0,
    type: isVideo ? "video" : "image",
    url: asset.uri,
    height: asset.height,
    width: asset.width,
    duration: asset.duration || 0,
  };
};
