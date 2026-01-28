import { AttachmentProps } from "@/interfaces";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type PaginationProps = {
  progress: SharedValue<number>;
  items: AttachmentProps[];
  onPressItem: (index: number) => void;
};

interface ThumbnailProps {
  index: number;
  item: AttachmentProps;
  progress: SharedValue<number>;
  onPress: () => void;
}

export const Pagination = (props: PaginationProps) => {
  const { progress, items, onPressItem } = props;

  return (
    <View className="flex-row gap-2">
      {items.map((item, index) => (
        <Thumbnail
          key={item._id ?? index}
          index={index}
          item={item}
          progress={progress}
          onPress={() => onPressItem(index)}
        />
      ))}
    </View>
  );
};

const Thumbnail = (props: ThumbnailProps) => {
  const { index, item, progress, onPress } = props;

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [index - 1.1, index, index + 1],
      [0.9, 1, 0.9],
      "clamp",
    );

    const opacity = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [0.6, 1, 0.6],
      "clamp",
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          {
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "white",
          },
          animatedStyle,
        ]}
      >
        <Image
          source={item.url}
          style={{ width: 55, height: 55, borderRadius: 10 }}
          cachePolicy="memory-disk"
        />
      </Animated.View>
    </Pressable>
  );
};
