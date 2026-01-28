import { cn } from "@/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

interface GradientButtonProps {
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  colors?: any;
  className?: string;
}

export const GradientButton = (props: GradientButtonProps) => {
  const {
    title = "Sign In",
    onPress,
    loading = false,
    icon,
    colors = ["#047a8f", "#06b6d4"],
    className,
  } = props;

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="overflow-hidden rounded-2xl"
    >
      {({ pressed }) => (
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={cn(
            className,
            `h-14 flex-row items-center justify-center gap-2 px-6 ${pressed ? "opacity-90" : ""}`,
          )}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              {icon && (
                <MaterialCommunityIcons name={icon} size={22} color="white" />
              )}
              <Text className="text-center font-bold text-lg text-white">
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      )}
    </Pressable>
  );
};
