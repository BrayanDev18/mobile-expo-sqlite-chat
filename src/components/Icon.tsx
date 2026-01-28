import { useThemeStore } from "@/stores";
import * as LucideIcons from "lucide-react-native";
import { Pressable, ViewStyle } from "react-native";

interface IconProps {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
}

export const Icon = ({
  name,
  size = 24,
  color,
  strokeWidth = 2,
  className,
  onPress,
  style,
  disabled,
}: IconProps) => {
  const { theme } = useThemeStore();

  const LucideIcon = LucideIcons[name] as React.ComponentType<any>;
  const customIconColor = theme === "dark" ? "white" : "black";

  return (
    <Pressable disabled={disabled} className={className} onPress={onPress}>
      <LucideIcon
        size={size}
        color={color ? color : customIconColor}
        strokeWidth={strokeWidth}
        style={style}
      />
    </Pressable>
  );
};
