import { Icon, Input } from "@/components";
import { useGifs } from "@/hooks";
import { GifProps } from "@/interfaces";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Modal } from "react-native-reanimated-modal";

interface ConversationGifsProps {
  open: boolean;
  close: () => void;
}

export const ConversationGifs = ({ open, close }: ConversationGifsProps) => {
  const { gifs, loadingGifs } = useGifs();

  const [toSearch, setToSearch] = useState(false);

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const renderItem = useCallback(
    ({ item }: { item: GifProps }) => <GifItem gif={item} />,
    [],
  );

  if (loadingGifs) return null;

  return (
    <Modal
      visible={open}
      onHide={close}
      //   swipe={false}
      statusBarTranslucent
      onBackdropPress={close}
      animation={{
        type: "slide",
        duration: 400,
        direction: {
          start: "down",
          end: ["down"],
        },
      }}
      style={{ justifyContent: "flex-end" }}
    >
      <View
        style={{ height: 500 }}
        className="section-bg rounded-t-2xl py-2 px-2 h-full"
      >
        {toSearch ? (
          <View className="flex-row items-center gap-4 h-20 px-6">
            <Icon name="ArrowLeft" onPress={() => setToSearch(false)} />

            <View className="flex-1">
              <Input
                placeholder="Search"
                autoCapitalize="none"
                className="rounded-full"
                name="search"
                control={control}
              />
            </View>
          </View>
        ) : (
          <View className="flex-row items-center justify-between px-6 h-20">
            <TouchableOpacity onPress={() => setToSearch(true)}>
              <Ionicons name="search" size={24} color="gray" />
            </TouchableOpacity>

            <View className="border-2 border-neutral-100 flex-row items-center rounded-full px-3 py-1">
              <View className="border-r-2 px-2 border-r-neutral-100">
                <FontAwesome6 name="face-grin-wide" size={24} color="gray" />
              </View>

              <View className="px-2">
                <MaterialIcons name="gif" size={24} color="gray" />
              </View>
            </View>

            <MaterialIcons
              name="face-retouching-natural"
              size={24}
              color="gray"
            />
          </View>
        )}

        <View className="flex-1">
          <FlashList
            data={gifs}
            numColumns={4}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
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
