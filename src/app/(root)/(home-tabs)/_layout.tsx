import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { MessagesSquare, UserRoundPen } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

interface CustomTabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: Record<string, any>;
  navigation: NavigationHelpers<
    ParamListBase,
    MaterialTopTabNavigationEventMap
  >;
}

type RouteNames = "conversations" | "settings";

interface TabItemProps {
  route: { name: string; key: string };
  index: number;
  isFocused: boolean;
  onPress: () => void;
  Icon: any;
}

const TabItem: React.FC<TabItemProps> = ({ isFocused, onPress, Icon }) => {
  const animatedValue = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: true,
      damping: 13,
      stiffness: 120,
    }).start();
  }, [isFocused, animatedValue]);

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
      }}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View className="h-16 w-16 items-center justify-center rounded-xl">
          <Animated.View
            className="absolute inset-0 rounded-xl bg-cyan-500"
            style={{ opacity }}
          />

          <Icon size={26} color={isFocused ? "white" : "gray"} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, navigation }) => {
  const { bottom } = useSafeAreaInsets();

  const icons: Record<RouteNames, any> = {
    conversations: MessagesSquare,
    settings: UserRoundPen,
  };

  return (
    <View
      style={{
        paddingBottom: bottom,
      }}
      className="section-bg absolute bottom-0 left-0 right-0 z-50 flex-row items-center justify-center gap-10 rounded-t-2xl py-4 shadow-sm"
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const Icon = icons[route.name as RouteNames];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabItem
            key={route.key}
            route={route}
            index={index}
            isFocused={isFocused}
            onPress={onPress}
            Icon={Icon}
          />
        );
      })}
    </View>
  );
};

const HomeTabsLayout: React.FC = () => {
  return (
    <MaterialTopTabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        swipeEnabled: true,
      }}
      style={{ flex: 1 }}
    >
      <MaterialTopTabs.Screen
        name="conversations"
        options={{
          title: "Conversations",
        }}
      />

      <MaterialTopTabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </MaterialTopTabs>
  );
};

export default HomeTabsLayout;
