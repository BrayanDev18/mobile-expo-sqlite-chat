import { Screen, Text } from "@/components";
import { View } from "react-native";

const ImageEditorContainer = () => {
  return (
    <Screen canGoBack>
      <View className="flex-1 items-center justify-center">
        <Text>Image editor</Text>
      </View>
    </Screen>
  );
};

export default ImageEditorContainer;
