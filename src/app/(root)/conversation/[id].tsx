import { EmojiGifsSheet, MediaPreviewModal, Screen, Text } from "@/components";
import { useConversation, useMessages } from "@/hooks";
import { AttachmentProps, MessageProps } from "@/interfaces";
import {
  ConversationHeader,
  ConversationInput,
  ConversationMediaOptions,
  MessageBubble,
} from "@/screens/conversation/components";
import { useMediaFilesSelectedStore } from "@/stores";
import { formatChatDate, isSameDay } from "@/utils";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableWithoutFeedback, View } from "react-native";

interface RenderMessageItemProps {
  item: MessageProps;
  index: number;
}

const senderId = "brayan_001";

const ConversationScreen = () => {
  const { id } = useLocalSearchParams();
  const flashListRef = useRef(null);

  const [openEmojiGifsSheet, setOpenEmojiGifsSheet] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentProps[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AttachmentProps[]>();
  const [showFilePicker, setShowFilePicker] = useState(false);

  const { conversation } = useConversation(id as string);
  const { messages, saveMessage } = useMessages(id as string);
  const { resetMediaFilesSelected } = useMediaFilesSelectedStore();

  const { control, reset, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      conversationId: id,
      body: "",
      type: "body",
      createdAt: Date.now(),
      status: "sending",
      attachments: attachments,
      senderId,
      issuingId: id,
    },
  });

  const onSendMessage = (data: any) => {
    saveMessage(data);
    reset();
    setAttachments([]);
  };

  const handleEmojiSelect = (emoji: string) => {
    const currentValue = watch("body") || "";
    setValue("body", currentValue + emoji);
  };

  const handleCloseSheet = () => {
    setOpenEmojiGifsSheet(false);
  };

  const handleAttachmentPreview = (attachments: AttachmentProps[]) => {
    setSelectedItem(attachments);
    setPreviewVisible(true);
  };

  const handleTouchableWithoutFeedback = () => {
    setOpenEmojiGifsSheet(false);
    setShowFilePicker(false);
    resetMediaFilesSelected();
  };

  const renderMessageItem = (props: RenderMessageItemProps) => {
    const { item: message, index } = props;

    const showDateHeader =
      (messages.length > 0 && index === 0) ||
      !isSameDay(message.createdAt, messages[index - 1].createdAt);

    return (
      <View className="gap-2 w-full">
        {showDateHeader && (
          <View className="container-bg self-center rounded-xl px-4 py-2">
            <Text className="text-xs font-semibold">
              {formatChatDate(message.createdAt as number)}
            </Text>
          </View>
        )}

        <MessageBubble
          message={message}
          messages={messages}
          index={index}
          handleOpenPreview={handleAttachmentPreview}
        />
      </View>
    );
  };

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
        <View className="flex-1">
          <ConversationHeader
            user={conversation}
            selectedItem={selectedItem as AttachmentProps[]}
          />

          <View className="my-3 flex-1">
            <FlashList
              ref={flashListRef}
              data={messages}
              keyExtractor={(item) => item._id.toString()}
              getItemType={(item) => item.type?.toString()}
              renderItem={renderMessageItem}
              maintainVisibleContentPosition={{
                startRenderingFromBottom: true,
                animateAutoScrollToBottom: true,
                autoscrollToBottomThreshold: 1,
                autoscrollToTopThreshold: 0,
              }}
              removeClippedSubviews
              contentContainerClassName="px-3 gap-5"
              ItemSeparatorComponent={() => <View className="h-[4px]" />}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View>
            <ConversationInput
              control={control}
              handleSendMessage={handleSubmit(onSendMessage)}
              handleOpenEmojiGifsSheet={() => {
                setShowFilePicker(false);
                setOpenEmojiGifsSheet((prev) => !prev);
              }}
              attachments={attachments}
              onAudioRecorded={(audio: any) => {
                setValue("attachments", [audio]);
                setAttachments([audio]);
              }}
              openFilePicker={() => {
                setOpenEmojiGifsSheet(false);
                setShowFilePicker((prev) => !prev);
              }}
              shouldShowInput={!showFilePicker}
            />

            <EmojiGifsSheet
              control={control}
              visibleSheet={openEmojiGifsSheet}
              handleCloseSheet={handleCloseSheet}
              onEmojiSelect={handleEmojiSelect}
            />

            <ConversationMediaOptions
              visiblePicker={showFilePicker}
              handleClosePicker={() => {
                setShowFilePicker(false);
                resetMediaFilesSelected();
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <MediaPreviewModal
        visible={previewVisible}
        selectedItem={selectedItem as AttachmentProps[]}
        onClose={() => setPreviewVisible(false)}
      />
    </Screen>
  );
};

export default ConversationScreen;
