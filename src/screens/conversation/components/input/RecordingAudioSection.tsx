import { Icon, Text } from "@/components";
import { RecordingAudioSectionProps } from "@/interfaces";
import { audioFormatTime } from "@/utils";
import {
  PlayerState,
  RecorderState,
  Waveform,
} from "@simform_solutions/react-native-audio-waveform";
import { View } from "react-native";

export const RecordingAudioSection = (props: RecordingAudioSectionProps) => {
  const {
    audioRecorder: {
      isRecording,
      isPaused,
      recordingTime,
      liveRecorderRef,
      setRecorderState,
      audio,
      recorderState,
      playerState,
      handlePlayPauseAction,
      staticPlayerRef,
      setPlayerState,
      handleDeleteAudio,
      handleRecordPauseResume,
    },
    handleSendMessage,
  } = props;

  return (
    <View className="gap-4">
      <View className="flex-row items-center w-full gap-5 p-3">
        {(isRecording || isPaused) && (
          <Text className="!text-neutral-900 dark:!text-neutral-200 font-medium !text-xl">
            {audioFormatTime(recordingTime)}
          </Text>
        )}

        <Waveform
          ref={liveRecorderRef}
          mode="live"
          containerStyle={{
            height: isRecording || isPaused ? 60 : 0,
            width: 330,
          }}
          candleSpace={3}
          candleWidth={3}
          candleHeightScale={10}
          waveColor="#06b6d4"
          onRecorderStateChange={setRecorderState}
        />
      </View>

      {/* Controles de grabación y reproducción */}
      {(isRecording || isPaused) && (
        <View className="gap-5">
          {/* Player de audio grabado */}
          {audio?.url && (
            <View className="flex-row items-center gap-4 justify-center">
              <Icon
                name={playerState === PlayerState.playing ? "Pause" : "Play"}
                color="white"
                onPress={handlePlayPauseAction}
                className="bg-brand-300 w-12 h-12 items-center justify-center rounded-lg"
              />

              <Waveform
                mode="static"
                containerStyle={{ width: 340, height: 70 }}
                ref={staticPlayerRef}
                path={audio.url}
                candleSpace={2}
                candleWidth={4}
                scrubColor="#06b6d4"
                waveColor="#888888"
                candleHeightScale={5}
                onPlayerStateChange={setPlayerState}
                onError={(error) =>
                  console.log("Error en reproducción:", error)
                }
                onCurrentProgressChange={(currentProgress, songDuration) => {
                  console.log(`Progreso: ${currentProgress}/${songDuration}`);
                }}
              />
            </View>
          )}

          {/* Botones de control */}
          <View className="flex-row justify-between">
            <Icon
              name="Trash"
              size={30}
              onPress={handleDeleteAudio}
              className="w-12 h-12 items-center justify-center"
            />

            <Icon
              name={
                recorderState === RecorderState.recording
                  ? "Pause"
                  : recorderState === RecorderState.paused
                    ? "Play"
                    : "Mic"
              }
              onPress={handleRecordPauseResume}
              color="red"
              size={30}
              className="w-12 h-12 items-center justify-center"
            />

            <Icon
              name="SendHorizontal"
              color="white"
              onPress={handleSendMessage}
              className="bg-brand-500 w-14 h-14 items-center justify-center rounded-full"
            />
          </View>
        </View>
      )}
    </View>
  );
};
