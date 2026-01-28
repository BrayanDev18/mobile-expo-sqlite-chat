import { Header, Screen } from "@/components";
import { ScreenRoutes } from "@/constants";
import { ConversationProps } from "@/interfaces";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useConversations } from "../../../hooks/useConversations";

interface ConversationItemProps {
  conversation: ConversationProps;
  index: number;
}

export default function ConversationsScreen() {
  const { conversationList } = useConversations();

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: ConversationProps; index: number }) => (
      <ConversationItem conversation={item} index={index} />
    ),
    [],
  );

  return (
    <Screen preset="fixed">
      <Header
        control={control}
        name="search"
        title="Chats"
        showSearch
        searchPlaceholder="Search conversations ..."
      />

      <View className="flex-1 justify-start p-3">
        <FlashList
          data={conversationList}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          onStartReachedThreshold={0.3}
          scrollEventThrottle={16}
          removeClippedSubviews
          contentContainerClassName="pb-4"
          ItemSeparatorComponent={() => <View className="h-3" />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  );
}

const ConversationItem = ({ conversation, index }: ConversationItemProps) => (
  <TouchableOpacity
    onPress={() =>
      router.push({
        pathname: ScreenRoutes.conversation as any,
        params: { id: conversation._id },
      })
    }
    className="flex-row items-center gap-4 rounded-2xl p-3"
  >
    <Image
      source={{ uri: conversation.avatar }}
      style={{ width: 55, height: 55, borderRadius: 26 }}
      cachePolicy="memory-disk"
    />

    <View className="flex-1">
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="text-xl font-semibold">{conversation.name}</Text>

        <Text className="text-xs !text-neutral-500 dark:!text-neutral-400">
          10:22
        </Text>
      </View>

      <View className="flex-1 flex-row items-center justify-between gap-4">
        <Text
          className="flex-1 !text-neutral-500 dark:!text-neutral-400"
          numberOfLines={1}
        >
          nada que decir
        </Text>

        <Pressable className="h-6 w-6 items-center justify-center rounded-md bg-brand-500 active:bg-neutral-100">
          <Text className="font-bold text-xs text-white">{5 + index}</Text>
        </Pressable>
      </View>
    </View>
  </TouchableOpacity>
);
