import React, { useState } from "react";
import { Image as RNImage, useWindowDimensions } from "react-native";
import { fitContainer } from "react-native-zoom-toolkit";

type ImageProps = {
  uri: string;
  index: number;
};

export const Image = ({ uri, index }: ImageProps) => {
  const { width, height } = useWindowDimensions();
  const [resolution, setResolution] = useState<{
    width: number;
    height: number;
  }>({
    width: 1,
    height: 1,
  });

  const size = fitContainer(resolution.width / resolution.height, {
    width,
    height,
  });

  return (
    <RNImage
      source={{ uri }}
      style={size}
      resizeMethod="scale"
      resizeMode="cover"
      onLoad={(e) => {
        setResolution({
          width: e.nativeEvent.source.width,
          height: e.nativeEvent.source.height,
        });
      }}
    />
  );
};
