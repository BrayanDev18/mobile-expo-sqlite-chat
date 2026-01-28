import { cn } from "@/utils";
import { ReactNode } from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface TextProps extends RNTextProps {
  children: ReactNode;
  className?: string;
}

export const Text = ({ children, className, ...props }: TextProps) => {
  return (
    <RNText
      {...props}
      className={cn("text-neutral-900 dark:text-white text-sm", className)}
    >
      {children}
    </RNText>
  );
};
