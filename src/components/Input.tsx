import { cn } from "@/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { Icon } from "./Icon";
import { Text } from "./Text";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  name: any;
  control?: Control<any>;
  iconName?: any;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  className,
  name,
  control,
  required = false,
  iconName,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={
        required ? { required: { value: true, message: "Required field" } } : {}
      }
      render={({ field: { onChange, onBlur, value } }) => (
        <View className="gap-1.5">
          {label ? (
            <Text className="text-base font-semibold !text-neutral-500 dark:!text-neutral-400">
              {label}
            </Text>
          ) : null}

          <View
            className={cn(
              className,
              "container-bg flex-row items-center gap-3 rounded-full px-4",
              error && "border-red-400",
            )}
          >
            {iconName ? (
              <Icon name={iconName} color="#facc15" size={28} />
            ) : null}

            <TextInput
              {...props}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={isPassword && !showPassword}
              className="h-14 flex-1 text-neutral-900 dark:text-neutral-200"
              placeholderTextColor="#9ca3af"
            />

            {isPassword && (
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#9ca3af"
                />
              </Pressable>
            )}
          </View>

          {/* {error && <Text className='text-xs !text-red-400'>{error}</Text>} */}
        </View>
      )}
    />
  );
};
