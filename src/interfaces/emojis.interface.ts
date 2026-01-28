import { CATEGORIES_NAVIGATION } from "@/constants";

export interface EmojiDataProps {
  emoji: string;
  name?: string;
  [key: string]: any;
}

export interface EmojiStickerSheetProps {
  visibleSheet: boolean;
  handleCloseSheet: () => void;
  onEmojiSelect: (emoji: string) => void;
  control: any;
}

export interface EmojistSectionProps {
  onEmojiSelected: (emoji: string) => void;
  selectedCategory: CategoryKey;
  setSelectedCategory: (category: CategoryKey) => void;
}

export type CategoryKey = (typeof CATEGORIES_NAVIGATION)[number]["category"];

export type CategoryItemType = (typeof CATEGORIES_NAVIGATION)[number];

export interface EmojiCategoriesProps {
  selectedCategory: CategoryKey;
  setSelectedCategory: (category: CategoryKey) => void;
}

export interface EmojiItemProps {
  emoji: string;
  onEmojiSelected: (emoji: string) => void;
}

export interface CategoryItemProps {
  item: CategoryItemType;
  isSelected: boolean;
  onPress: (category: CategoryKey) => void;
}
