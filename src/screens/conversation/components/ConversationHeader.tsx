import { Icon, Text } from "@/components";
import { ConversationProps } from "@/interfaces";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ConversationHeader = ({ user }: { user: ConversationProps }) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: top }}
      className="flex-row items-center gap-2 px-4 py-3 border-b border-neutral-100 dark:border-neutral-900"
    >
      <Icon
        name="ArrowLeft"
        size={22}
        onPress={() => router.back()}
        className="h-12 w-12 items-center justify-center"
      />

      <View className="flex-1 flex-row items-center gap-3">
        <View className="relative">
          <Image
            source={{ uri: user?.avatar }}
            style={{ width: 48, height: 48, borderRadius: 24 }}
            cachePolicy="memory-disk"
          />
          <View className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border border-white bg-green-500" />
        </View>

        <View className="flex-1 justify-center">
          <Text className="text-xl font-semibold">{user?.name}</Text>

          <Text className="text-sm !text-neutral-500 dark:!text-neutral-400">
            hoy a la 5:00PM
          </Text>
        </View>

        <Pressable className="h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100">
          <Icon name="EllipsisVertical" size={24} />
        </Pressable>
      </View>
    </View>
  );
};
