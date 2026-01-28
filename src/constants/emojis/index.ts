import { EmojiDataProps } from "@/interfaces";
import {
  Ban,
  Flag,
  Lightbulb,
  PawPrint,
  Pizza,
  Plane,
  Smile,
  Trophy,
  Users,
} from "lucide-react-native";
import EmojisList from "../../../assets/emojis.json";

export const ORGANIZED_EMOJIS_DATA = EmojisList.reduce<
  Record<string, EmojiDataProps[]>
>((acc, item) => {
  acc[item.title] = item.data;
  return acc;
}, {});

export const CATEGORIES_NAVIGATION = [
  {
    icon: Smile,
    category: "smileys_emotion",
  },
  {
    icon: Users,
    category: "people_body",
  },
  {
    icon: PawPrint,
    category: "animals_nature",
  },
  {
    icon: Pizza,
    category: "food_drink",
  },
  {
    icon: Plane,
    category: "travel_places",
  },
  {
    icon: Trophy,
    category: "activities",
  },
  {
    icon: Lightbulb,
    category: "objects",
  },
  {
    icon: Ban,
    category: "symbols",
  },
  {
    icon: Flag,
    category: "flags",
  },
] as const;
