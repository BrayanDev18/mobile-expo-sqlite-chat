import { AttachmentProps } from "@/interfaces";
import { Image } from "expo-image";

export const FullScreenImage = ({ item }: { item: AttachmentProps }) => {
  const aspectRatio = item?.width / item?.height;

  return (
    <Image
      source={{ uri: item.url as string }}
      style={{ width: "100%", aspectRatio }}
      contentFit="cover"
    />
  );
};
