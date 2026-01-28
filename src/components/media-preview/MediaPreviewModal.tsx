import { AttachmentProps } from "@/interfaces";
import React, { useCallback, useRef } from "react";
import { View } from "react-native";
import { Modal } from "react-native-reanimated-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Gallery,
  GalleryRefType,
  stackTransition,
} from "react-native-zoom-toolkit";
import { Icon } from "../Icon";
import { Image } from "../Image";

interface MediaPreviewModalProps {
  visible: boolean;
  onClose: () => void;
  selectedItem: AttachmentProps[];
}

export const MediaPreviewModal = (props: MediaPreviewModalProps) => {
  const { visible, selectedItem, onClose } = props;

  const ref = useRef<GalleryRefType>(null);

  const { top } = useSafeAreaInsets();

  const renderItem = useCallback((item: AttachmentProps, index: number) => {
    return <Image uri={item.url} index={index} />;
  }, []);

  const transition = useCallback(stackTransition, []);

  return (
    <Modal
      visible={visible}
      onHide={onClose}
      swipe={false}
      statusBarTranslucent
      onBackdropPress={onClose}
      animation={{ type: "fade", duration: 350 }}
    >
      <View
        style={{ top }}
        className="absolute left-0 right-0 flex-row items-center gap-4 px-4 z-50"
      >
        <Icon
          name="X"
          color="white"
          size={25}
          onPress={onClose}
          className="w-14 h-14 items-center justify-center rounded-full blur-3xl bg-neutral-800/80"
        />
      </View>

      <View className="h-full">
        <Gallery
          ref={ref}
          data={selectedItem}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
          customTransition={transition}
        />
      </View>
    </Modal>
  );
};
