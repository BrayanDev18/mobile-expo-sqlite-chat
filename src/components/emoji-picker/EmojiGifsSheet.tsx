import { CategoryKey, EmojiStickerSheetProps } from "@/interfaces";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Icon } from "../Icon";
import { Input } from "../Input";
import { ViewSheet } from "../ViewSheet";
import { EmojistSection } from "./Emojis";
import { GifsScetion } from "./Gifs";

export const EmojiGifsSheet = (props: EmojiStickerSheetProps) => {
  const { visibleSheet, handleCloseSheet, onEmojiSelect, control } = props;

  const [contentType, setContentType] = useState<"gifs" | "emojis">("emojis");
  const [selectedCategory, setSelectedCategory] = useState("smileys_emotion");

  const [toSearch, setToSearch] = useState(false);

  const handleEmojiPress = (emoji: string) => {
    onEmojiSelect(emoji);
  };

  return (
    <ViewSheet visibleSheet={visibleSheet} onCloseSheet={handleCloseSheet}>
      <View>
        {toSearch ? (
          <View className="flex-row items-center gap-4 h-16 px-6">
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
          <View className="flex-row items-center justify-between px-6 h-16">
            <TouchableOpacity onPress={() => setToSearch(true)}>
              <Ionicons name="search" size={24} color="gray" />
            </TouchableOpacity>

            <View className="border-2 border-neutral-200 flex-row items-center rounded-full px-3 py-1">
              <Pressable
                onPress={() => setContentType("emojis")}
                className="border-r-2 px-2 border-r-neutral-200"
              >
                <FontAwesome6 name="face-grin-wide" size={24} color="gray" />
              </Pressable>

              <Pressable
                onPress={() => setContentType("gifs")}
                className="px-2"
              >
                <MaterialIcons name="gif" size={24} color="gray" />
              </Pressable>
            </View>

            <MaterialIcons
              name="face-retouching-natural"
              size={24}
              color="gray"
            />
          </View>
        )}
      </View>

      {contentType === "gifs" ? (
        <GifsScetion />
      ) : (
        <EmojistSection
          selectedCategory={selectedCategory as CategoryKey}
          setSelectedCategory={setSelectedCategory}
          onEmojiSelected={handleEmojiPress}
        />
      )}
    </ViewSheet>
  );
};
