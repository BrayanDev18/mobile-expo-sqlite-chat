import { useGifs } from "@/hooks";
import { GifProps } from "@/interfaces";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useCallback } from "react";
import { View } from "react-native";

export const GifsScetion = () => {
  const { gifs } = useGifs();

  const renderGifs: ListRenderItem<GifProps> = useCallback(
    ({ item }) => <GifItem gif={item} />,
    [],
  );

  return (
    <View className="flex-1">
      <FlashList
        data={gifs}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={renderGifs}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const GifItem = ({ gif }: { gif: GifProps }) => {
  return (
    <View className="m-1">
      <Image
        source={{ uri: gif.previewUrl }}
        style={{
          width: "100%",
          aspectRatio: 1,
          borderRadius: 8,
        }}
      />
    </View>
  );
};
