import { Control } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Text } from "./Text";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  rightIcon?: any;
  onRightPress?: () => void;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  name?: string;
  control?: Control<any>;
}

export const Header = (props: HeaderProps) => {
  const {
    title,
    showSearch = false,
    rightIcon,
    onRightPress,
    searchPlaceholder = "Search...",
    name,
    control,
  } = props;

  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: top }}
      className="section-bg gap-3 border-neutral-200 px-4 pb-4"
    >
      <View className="flex-row items-center justify-between">
        {title ? <Text className="font-bold !text-3xl">{title}</Text> : null}

        {rightIcon ? (
          <Icon
            name={rightIcon}
            size={22}
            onPress={onRightPress}
            color="white"
            className="container-bg h-12 w-12 items-center justify-center rounded-xl"
          />
        ) : null}
      </View>

      {showSearch ? (
        <View className="">
          <Input
            placeholder={searchPlaceholder}
            autoCapitalize="none"
            className="rounded-full"
            name={name}
            control={control}
          />
        </View>
      ) : null}
    </View>
  );
};
