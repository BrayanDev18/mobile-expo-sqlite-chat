import { Icon, Text } from "@/components";
import {
  AttachmentProps,
  AudioRendererProps,
  MessageBubbleProps,
  MessageImagesGroupedProps,
  MessageProps,
  VideoRendererProps,
} from "@/interfaces";
import {
  audioFormatTime,
  calculateDimensions,
  cn,
  formatChatDate,
  isSameDay,
} from "@/utils";
import {
  FinishMode,
  IWaveformRef,
  PlayerState,
  Waveform,
} from "@simform_solutions/react-native-audio-waveform";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import { Alert, Pressable, View } from "react-native";

export const MessageBubble = (props: MessageBubbleProps) => {
  const { message, messages, index, handleOpenPreview } = props;

  const hasBody = message.body;

  const isOwn = message.senderId === message.senderId;

  const prevMsg = messages[index - 1] as MessageProps;
  const nextMsg = messages[index + 1] as MessageProps;

  const isPrevSameUser =
    prevMsg &&
    prevMsg.senderId === message.senderId &&
    isSameDay(prevMsg.createdAt, message.createdAt);

  const isNextSameUser =
    nextMsg &&
    nextMsg.senderId === message.senderId &&
    isSameDay(nextMsg.createdAt, message.createdAt);

  const bubbleStyle = {
    borderTopLeftRadius: isOwn ? 10 : isPrevSameUser ? 3 : 10,
    borderTopRightRadius: isOwn ? (isPrevSameUser ? 3 : 10) : 10,
    borderBottomLeftRadius: isOwn ? 10 : isNextSameUser ? 3 : 10,
    borderBottomRightRadius: isOwn ? (isNextSameUser ? 3 : 10) : 10,
  };

  const imageAttachments =
    Array.isArray(message?.attachments) &&
    message?.attachments?.filter((att) => att.type === "image");

  const videoAttachments =
    Array.isArray(message?.attachments) &&
    message?.attachments?.filter((att) => att.type === "video");

  const audioAttachments =
    Array.isArray(message?.attachments) &&
    message?.attachments?.filter((att) => att.type === "audio");

  const mediaAttachments = [
    ...(imageAttachments || []),
    ...(videoAttachments || []),
  ];

  return (
    <>
      <View className="flex-row justify-end">
        <View
          style={bubbleStyle}
          className="max-w-[80%] items-end overflow-hidden bg-brand-600 p-1.5 gap-1"
        >
          {mediaAttachments && mediaAttachments.length > 0 ? (
            <MessageImagesGrouped
              message={message}
              attachments={mediaAttachments}
              bubbleStyle={bubbleStyle}
              onPress={() => handleOpenPreview(mediaAttachments)}
            />
          ) : null}

          {/* {audioAttachments && audioAttachments.length > 0 && (
            <View>
              {audioAttachments.map((attachment, idx) => (
                <AudioRenderer key={idx} message={message} audio={attachment} />
              ))}
            </View>
          )} */}

          {hasBody ? (
            <View className="items-end px-2 py-1">
              <Text className="!text-xl leading-5 !text-white">
                {message.body}
              </Text>

              <Text className=" !text-white text-end">
                {formatChatDate(message.createdAt as number)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

MessageBubble.displayName = "MessageBubble";

const MessageImagesGrouped = (props: MessageImagesGroupedProps) => {
  const { attachments, message, bubbleStyle, onPress } = props;

  const [img, img2, img3] = attachments;

  const getImageSource = (attachment: AttachmentProps) => {
    if (attachment?.type === "video") {
      return attachment.videoThumbnail?.uri;
    }
    return attachment.url;
  };

  const getImageHeight = (attachment: AttachmentProps) => {
    if (attachment?.type === "video") {
      return Math.min(attachment.videoThumbnail?.height ?? 400, 400);
    }
    return Math.min(attachment?.height ?? 400, 400);
  };

  const imgHeight = getImageHeight(img);
  const img2Height = getImageHeight(img2);

  const firstImageSource = getImageSource(img);

  if (!firstImageSource) {
    return <Text className="p-2 text-white">Contenido no disponible</Text>;
  }

  const isVideo = (attachment: AttachmentProps) => attachment?.type === "video";

  return (
    <View className="gap-1">
      <Pressable
        onPress={onPress}
        className={cn(
          "relative items-center gap-2",
          attachments.length === 2 ? "flex-row" : "flex",
        )}
      >
        <View className="relative">
          <Image
            source={{ uri: firstImageSource }}
            style={{
              width:
                attachments.length === 1
                  ? 250
                  : attachments.length === 2
                    ? 122
                    : 250,
              height: imgHeight,
              ...bubbleStyle,
            }}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          {isVideo(img) && (
            <View className="absolute inset-0 items-center justify-center">
              <Icon
                name="Play"
                size={25}
                color="white"
                className="items-center justify-center rounded-md bg-brand-500 p-3"
              />
            </View>
          )}
        </View>

        {attachments.length > 1 && (
          <View className="flex-row gap-2">
            <View className="relative">
              <Image
                source={{ uri: getImageSource(img2) as string }}
                style={{
                  width: 121,
                  height: attachments.length === 2 ? img2Height : 121,
                  ...bubbleStyle,
                }}
                contentFit="cover"
                cachePolicy="memory-disk"
              />
              {isVideo(img2) && (
                <View className="absolute inset-0 items-center justify-center">
                  <Icon
                    name="Play"
                    size={25}
                    color="white"
                    className="items-center justify-center rounded-md bg-brand-500 p-3"
                  />
                </View>
              )}
            </View>

            {attachments.length === 3 && getImageSource(img3) && (
              <View className="relative">
                <Image
                  source={{ uri: getImageSource(img3) }}
                  style={{
                    width: 121,
                    height: 121,
                    ...bubbleStyle,
                  }}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
                {isVideo(img3) && (
                  <View className="absolute inset-0 items-center justify-center">
                    <Icon
                      name="Play"
                      size={25}
                      color="white"
                      className="items-center justify-center rounded-md bg-brand-500 p-3"
                    />
                  </View>
                )}
              </View>
            )}

            {attachments.length > 3 && (
              <View
                style={{
                  width: 121,
                  height: 121,
                  ...bubbleStyle,
                }}
                className="items-center justify-center bg-brand-800"
              >
                <Text className="font-bold text-2xl text-white">
                  +{attachments.length - 2}
                </Text>
              </View>
            )}
          </View>
        )}
      </Pressable>

      <View className="items-end px-2 py-1">
        <Text className=" !text-white text-end">
          {formatChatDate(message.createdAt as number)}
        </Text>
      </View>
    </View>
  );
};

MessageImagesGrouped.displayName = "MessageImagesGrouped";

const VideoRenderer = (props: VideoRendererProps) => {
  const { attachment } = props;

  const { width, height } = calculateDimensions(
    attachment.width as number,
    attachment.height as number,
  );

  return (
    <View className="relative">
      <Image
        source={{
          uri: attachment?.videoThumbnail?.uri as string,
        }}
        style={{ width, height }}
        contentFit="cover"
        cachePolicy="memory-disk"
      />

      <View className="absolute inset-0 items-center justify-center">
        <Icon
          name="Play"
          size={25}
          color="white"
          className="items-center justify-center rounded-md bg-brand-500 p-3"
        />
      </View>
    </View>
  );
};

VideoRenderer.displayName = "VideoRenderer";

const AudioRenderer = (props: AudioRendererProps) => {
  const { audio, message } = props;

  const staticPlayerRef = useRef<IWaveformRef>(null);

  const [playerState, setPlayerState] = useState(PlayerState.stopped);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = async () => {
    if (!audio?.url) {
      Alert.alert("Error", "No hay audio para reproducir");
      return;
    }

    try {
      if (playerState === PlayerState.playing) {
        await staticPlayerRef.current?.pausePlayer();
      } else if (playerState === PlayerState.paused) {
        await staticPlayerRef.current?.resumePlayer();
      } else {
        await staticPlayerRef.current?.startPlayer({
          finishMode: FinishMode.stop,
        });
      }
    } catch (error) {
      console.error("Error en reproducción:", error);
      Alert.alert("Error", `No se pudo reproducir el audio: ${error}`);
    }
  };

  return (
    <View className="w-full gap-2">
      <View className="flex-row items-center gap-2 px-1">
        <Icon
          name={playerState === PlayerState.playing ? "Pause" : "Play"}
          color="white"
          onPress={handlePlayPause}
          className="bg-brand-300 w-12 h-12 items-center justify-center rounded-lg"
        />

        <Waveform
          mode="static"
          containerStyle={{
            width: 250,
            height: 50,
          }}
          ref={staticPlayerRef}
          path={audio.url}
          candleSpace={2}
          candleWidth={4}
          scrubColor="#06b6d4"
          waveColor="#FFFFFF"
          candleHeightScale={18}
          onPlayerStateChange={setPlayerState}
          onError={(error) => {
            console.log("Error en reproducción:", error);
          }}
          onCurrentProgressChange={(progress, totalDuration) => {
            setCurrentProgress(progress);
            setDuration(totalDuration);
          }}
        />
      </View>

      <View className="flex-row justify-between px-2">
        <Text className="!text-white font-medium">
          {playerState === PlayerState.playing
            ? audioFormatTime(duration)
            : audioFormatTime(currentProgress)}
        </Text>

        <Text className=" !text-white text-end">
          {formatChatDate(message.createdAt as number)}
        </Text>
      </View>
    </View>
  );
};

AudioRenderer.displayName = "AudioRenderer";
