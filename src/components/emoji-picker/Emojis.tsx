import { CATEGORIES_NAVIGATION, ORGANIZED_EMOJIS_DATA } from "@/constants";
import {
  CategoryItemProps,
  CategoryKey,
  EmojiCategoriesProps,
  EmojiDataProps,
  EmojiItemProps,
  EmojistSectionProps,
} from "@/interfaces";
import { calculateLayout } from "@/utils";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useCallback } from "react";
import {
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { finalItemSize: EMOJI_ITEM_SIZE, finalNumColumns: NUM_COLUMNS } =
  calculateLayout();

export const EmojistSection = (props: EmojistSectionProps) => {
  const { onEmojiSelected, selectedCategory, setSelectedCategory } = props;

  const renderEmojiItem: ListRenderItem<EmojiDataProps> = useCallback(
    ({ item }) => (
      <EmojiItem emoji={item.emoji} onEmojiSelected={onEmojiSelected} />
    ),
    [onEmojiSelected],
  );

  return (
    <View className="flex-1">
      <FlashList
        data={ORGANIZED_EMOJIS_DATA[selectedCategory]}
        keyExtractor={(item) => item.emoji}
        renderItem={renderEmojiItem}
        getItemType={() => "emoji"}
        numColumns={NUM_COLUMNS}
        ListEmptyComponent={() => (
          <View className="mt-10 flex-1 items-center justify-center gap-4 p-8">
            <Text className="font-bold text-2xl text-neutral-600 dark:text-neutral-300">
              ¡Ups! No hay resultados 😔
            </Text>
            <Text className="max-w-xs text-center text-lg text-neutral-500 dark:text-neutral-400">
              Intenta ajustando tu búsqueda o selecciona otra categoría.
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      />

      <EmojiCategories {...{ selectedCategory, setSelectedCategory }} />
    </View>
  );
};

const EmojiCategories = (props: EmojiCategoriesProps) => {
  const { selectedCategory, setSelectedCategory } = props;

  const { bottom } = useSafeAreaInsets();

  const handleEmojiSelect = useCallback(
    (category: CategoryKey) => {
      setSelectedCategory(category);
    },
    [setSelectedCategory],
  );

  return (
    <View style={{ paddingBottom: bottom }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 pt-2 gap-1 justify-between w-full"
      >
        {CATEGORIES_NAVIGATION.map((item, index) => (
          <CategoryItem
            key={index}
            item={item}
            isSelected={selectedCategory === item.category}
            onPress={handleEmojiSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const EmojiItem = (props: EmojiItemProps) => {
  const { emoji, onEmojiSelected } = props;

  const handlePress = useCallback(() => {
    onEmojiSelected(emoji);
  }, [emoji, onEmojiSelected]);

  const itemStyle = {
    height: EMOJI_ITEM_SIZE,
    width: EMOJI_ITEM_SIZE,
  };

  return (
    <TouchableHighlight
      style={itemStyle}
      className="items-center justify-center rounded-lg"
      underlayColor="rgb(6 182 212 / 0.1)"
      onPress={handlePress}
    >
      <Text className="text-[30px]">{emoji}</Text>
    </TouchableHighlight>
  );
};

const CategoryItem = (props: CategoryItemProps) => {
  const { item, isSelected, onPress } = props;

  const CategoryIcon = item.icon;

  const handlePress = useCallback(() => {
    onPress(item.category);
  }, [item.category, onPress]);

  return (
    <TouchableOpacity
      className="w-12 h-12 items-center justify-center rounded-lg"
      onPress={handlePress}
    >
      <CategoryIcon color={isSelected ? "#06b6d4" : "gray"} />
    </TouchableOpacity>
  );
};
