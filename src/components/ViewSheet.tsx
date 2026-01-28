import { cn } from "@/utils";
import { ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MIN_HEIGHT = 380;
const MAX_HEIGHT = SCREEN_HEIGHT * 0.7;

interface ViewSheetProps {
  visibleSheet: boolean;
  className?: string;
  height?: number;
  onCloseSheet: () => void;
  children: ReactNode;
}

export const ViewSheet = (props: ViewSheetProps) => {
  const { visibleSheet, height, className, onCloseSheet, children } = props;

  const sheetHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visibleSheet) {
      Animated.spring(sheetHeight, {
        toValue: height ? height : MIN_HEIGHT,
        useNativeDriver: false,
        friction: 8,
      }).start();
    } else {
      Animated.timing(sheetHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visibleSheet, sheetHeight, height]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > 5;
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) {
          const newHeight = Math.min(MIN_HEIGHT - gesture.dy, MAX_HEIGHT);
          sheetHeight.setValue(newHeight);
        } else {
          const newHeight = Math.max(MIN_HEIGHT - gesture.dy, MIN_HEIGHT * 0.3);
          sheetHeight.setValue(newHeight);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 100) {
          Animated.timing(sheetHeight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start(onCloseSheet);
        } else if (gesture.dy < -50) {
          Animated.spring(sheetHeight, {
            toValue: MAX_HEIGHT,
            useNativeDriver: false,
            friction: 8,
          }).start();
        } else {
          Animated.spring(sheetHeight, {
            toValue: MIN_HEIGHT,
            useNativeDriver: false,
            friction: 8,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      className={cn(className, "bg-neutral-50 gap-3")}
      style={[{ height: sheetHeight }]}
    >
      <View {...panResponder.panHandlers} style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  handleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
  },
});
