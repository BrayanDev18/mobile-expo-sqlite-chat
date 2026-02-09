import {cn} from "@/utils";
import {ReactNode, useEffect, useRef} from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const MIN_HEIGHT = 380;
const MAX_HEIGHT = SCREEN_HEIGHT * 0.7;
const CLOSE_THRESHOLD = 100; // Distancia para cerrar
const EXPAND_THRESHOLD = 50; // Distancia para expandir

interface ViewSheetProps {
  visibleSheet: boolean;
  className?: string;
  height?: number;
  onCloseSheet: () => void;
  children: ReactNode;
}

export const ViewSheet = (props: ViewSheetProps) => {
  const {visibleSheet, height, className, onCloseSheet, children} = props;

  const sheetHeight = useRef(new Animated.Value(0)).current;
  const currentHeight = useRef(height || MIN_HEIGHT);

  useEffect(() => {
    if (visibleSheet) {
      const targetHeight = height || MIN_HEIGHT;
      currentHeight.current = targetHeight;

      Animated.spring(sheetHeight, {
        toValue: targetHeight,
        useNativeDriver: false,
        friction: 8,
        tension: 40,
      }).start();
    } else {
      Animated.timing(sheetHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visibleSheet, sheetHeight, height]);

  // PanResponder solo para el handle
  const handlePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > 5;
      },
      onPanResponderGrant: () => {
        sheetHeight.setOffset(currentHeight.current);
        sheetHeight.setValue(0);
      },
      onPanResponderMove: (_, gesture) => {
        const newValue = -gesture.dy;

        if (currentHeight.current + newValue > MAX_HEIGHT) {
          const overflow = (currentHeight.current + newValue) - MAX_HEIGHT;
          sheetHeight.setValue(MAX_HEIGHT - currentHeight.current - overflow * 0.3);
        } else if (currentHeight.current + newValue < MIN_HEIGHT * 0.5) {
          const underflow = MIN_HEIGHT * 0.5 - (currentHeight.current + newValue);
          sheetHeight.setValue(MIN_HEIGHT * 0.5 - currentHeight.current + underflow * 0.3);
        } else {
          sheetHeight.setValue(newValue);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        sheetHeight.flattenOffset();

        const finalHeight = currentHeight.current - gesture.dy;
        const velocity = gesture.vy;

        if (gesture.dy > CLOSE_THRESHOLD || velocity > 0.5) {
          Animated.timing(sheetHeight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            currentHeight.current = height || MIN_HEIGHT;
            onCloseSheet();
          });
        } else if (gesture.dy < -EXPAND_THRESHOLD || velocity < -0.5) {
          currentHeight.current = MAX_HEIGHT;
          Animated.spring(sheetHeight, {
            toValue: MAX_HEIGHT,
            useNativeDriver: false,
            friction: 8,
            tension: 40,
          }).start();
        } else if (finalHeight > (MIN_HEIGHT + MAX_HEIGHT) / 2) {
          currentHeight.current = MAX_HEIGHT;
          Animated.spring(sheetHeight, {
            toValue: MAX_HEIGHT,
            useNativeDriver: false,
            friction: 8,
            tension: 40,
          }).start();
        } else {
          currentHeight.current = height || MIN_HEIGHT;
          Animated.spring(sheetHeight, {
            toValue: currentHeight.current,
            useNativeDriver: false,
            friction: 8,
            tension: 40,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      className={cn(className, "bg-neutral-50")}
      style={[styles.container, {height: sheetHeight}]}
    >
      <View
        {...handlePanResponder.panHandlers}
        style={styles.handleContainer}
      >
        <View style={styles.handle}/>
      </View>

      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
  },
});