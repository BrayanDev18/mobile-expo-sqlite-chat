import { Icon } from "@/components";
import { useAudioRecorder } from "@/hooks";
import { ConversationInputProps, InputSectionProps } from "@/interfaces";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ConversationInput = (props: ConversationInputProps) => {
  const {
    control,
    handleOpenEmojiGifsSheet,
    handleSendMessage,
    attachments,
    onAudioRecorded,
    openFilePicker,
  } = props;

  const { bottom } = useSafeAreaInsets();
  const inputText = useWatch({ control, name: "body" });

  const audioRecorder = useAudioRecorder(onAudioRecorded);

  const handleSendWithAudio = async () => {
    await audioRecorder.handleStopRecording();
    audioRecorder.resetAudio();
    handleSendMessage();
  };

  return (
    <>
      <View className="gap-4">
        {/* <View
          style={{
            paddingBottom: audioRecorder.showAudioUI ? bottom : 0,
          }}
          className={
            audioRecorder.showAudioUI ? "container-bg px-4 mt-4" : "h-0"
          }
        >
          <RecordingAudioSection
            audioRecorder={audioRecorder}
            handleSendMessage={handleSendWithAudio}
          />
        </View> */}

        {!audioRecorder.showAudioUI && (
          <InputSection
            bottom={bottom}
            handleOpenEmojiGifsSheet={handleOpenEmojiGifsSheet}
            control={control}
            openFilePicker={openFilePicker}
            inputText={inputText}
            attachments={attachments}
            handleSendMessage={handleSendMessage}
            handleRecorderAction={audioRecorder.handleRecorderAction}
          />
        )}
      </View>
    </>
  );
};

const InputSection = (props: InputSectionProps) => {
  const {
    bottom,
    handleOpenEmojiGifsSheet,
    control,
    openFilePicker,
    inputText,
    attachments,
    handleSendMessage,
    handleRecorderAction,
  } = props;

  return (
    <View style={{ paddingBottom: bottom }} className="flex-row gap-4 px-4">
      <View className="flex-1 container-bg flex-row items-center p-0.5 rounded-full">
        <TouchableOpacity
          onPress={handleOpenEmojiGifsSheet}
          className="w-14 h-14 items-center justify-center rounded-full"
        >
          <MaterialCommunityIcons name="sticker-emoji" size={22} color="gray" />
        </TouchableOpacity>

        <Controller
          control={control}
          name="body"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex-1 flex-row items-center h-14">
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Mensaje"
                placeholderTextColor="#a3a3a3"
                className="text-neutral-900 dark:text-neutral-200 text-[15px] font-medium flex-1 px-2"
                multiline
                autoCapitalize="none"
                maxLength={500}
                textAlignVertical="center"
              />
            </View>
          )}
        />

        <View className="flex-row">
          <TouchableOpacity
            onPress={openFilePicker}
            className="w-14 h-14 items-center justify-center rounded-full"
          >
            <Fontisto name="paperclip" size={22} color="gray" />
          </TouchableOpacity>

          <View className="w-14 h-14 items-center justify-center rounded-full">
            <Feather name="camera" size={22} color="gray" />
          </View>
        </View>
      </View>

      <Icon
        name={
          inputText?.trim().length || attachments?.length
            ? "SendHorizontal"
            : "Mic"
        }
        color="white"
        onPress={
          inputText?.trim().length || attachments?.length
            ? handleSendMessage
            : handleRecorderAction
        }
        size={22}
        className="bg-brand-500 w-14 h-14 items-center justify-center rounded-full"
      />
    </View>
  );
};
