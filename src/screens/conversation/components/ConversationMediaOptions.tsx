import { Icon, Text, ViewSheet } from "@/components";
import { useMediaLoader } from "@/hooks";
import { AttachmentProps } from "@/interfaces";
import { useMediaFilesSelectedStore } from "@/stores";
import { formatMediaAsset, formatVideoDuration } from "@/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image, ImageStyle } from "expo-image";
import { router } from "expo-router";
import { Video } from "lucide-react-native";
import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MediaOptionsProps {
  visiblePicker: boolean;
  handleClosePicker: () => void;
}

interface FilesToEditPreviewProps {
  mediaFilesSelected: AttachmentProps[];
  type?: string;
  conversationId?: string;
  setType?: () => void;
}

export const ConversationMediaOptions = (props: MediaOptionsProps) => {
  const { visiblePicker, handleClosePicker } = props;

  const { mediaFilesSelected, mediaFilesSelectedIds, toggleMediaFileSelected } =
    useMediaFilesSelectedStore();

  const { bottom } = useSafeAreaInsets();

  const handleSelectImage = (image: AttachmentProps) => {
    toggleMediaFileSelected(image, "photo");
  };

  const { media, loadMore } = useMediaLoader();

  return (
    <ViewSheet
      height={450}
      visibleSheet={visiblePicker}
      onCloseSheet={handleClosePicker}
    >
      <View className="flex-1 gap-3">
        <View className="flex-1">
          <FlashList
            data={media}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = mediaFilesSelectedIds.includes(item.id);

              return (
                <Pressable
                  onPress={() => handleSelectImage(formatMediaAsset(item))}
                  className="relative m-1"
                >
                  <Image
                    source={item.uri}
                    style={{
                      width: "100%",
                      height: 100,
                      borderRadius: 8,
                      opacity: isSelected ? 0.6 : 1,
                    }}
                    contentFit="cover"
                    transition={200}
                  />

                  {isSelected && (
                    <View className="absolute right-2 top-2 h-6 w-6 items-center justify-center rounded-full bg-brand-500">
                      <Icon name="Check" size={16} color="#fff" />
                    </View>
                  )}

                  {item.mediaType === "video" ? (
                    <View className="absolute bottom-0 p-1">
                      <View className="flex-row items-center gap-1.5 rounded-full bg-black/70 px-2 py-0.5">
                        <Video color="white" fill="white" size={15} />

                        <Text className="font-medium !text-xs text-white">
                          {formatVideoDuration(item.duration)}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </Pressable>
              );
            }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </View>

        <View
          style={{ paddingBottom: bottom }}
          className="w-full flex-row items-center gap-4 px-4"
        >
          <FilesToEditPreview mediaFilesSelected={mediaFilesSelected} />

          <View className="container-bg h-14 flex-1 rounded-full">
            <TextInput
              className="flex-1 px-3 rounded-full"
              placeholder="Add a comment"
              placeholderTextColor="gray"
            />
          </View>

          <Icon
            name="SendHorizontal"
            size={20}
            color="white"
            strokeWidth={2.5}
            // onPress={handleSubmit(onSendMessage)}
            className="h-14 w-14 items-center justify-center rounded-full bg-cyan-500 active:bg-cyan-600"
          />
        </View>
      </View>
    </ViewSheet>
  );
};

const FilesToEditPreview = (props: FilesToEditPreviewProps) => {
  const { mediaFilesSelected, conversationId } = props;

  return mediaFilesSelected.length > 0 ? (
    <Pressable
      style={{ width: 45, height: 45 }}
      onPress={() => {
        router.push({
          pathname: "/",
          params: {
            conversationId,
          },
        });
      }}
      className="relative"
    >
      {mediaFilesSelected.slice(0, 4).map((file, index) => {
        const isTop = index === 0;

        const itemStyle = {
          width: 45,
          height: 45,
          borderRadius: 7,
          position: "absolute",
          top: isTop ? 0 : index * 1,
          left: isTop ? 0 : -(index * 2),
          zIndex: mediaFilesSelected.length - index,
          transform: isTop ? [] : [{ rotate: `${-4 * index}deg` }],
        };

        return (
          <View key={index}>
            <Image source={{ uri: file.url }} style={itemStyle as ImageStyle} />
          </View>
        );
      })}

      <View className="absolute inset-0 items-center justify-center bg-black/50 rounded-lg z-50">
        <MaterialCommunityIcons
          name="pencil-box-outline"
          size={24}
          color="white"
        />
      </View>
    </Pressable>
  ) : null;
};
