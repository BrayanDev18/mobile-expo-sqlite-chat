import { AttachmentProps } from "@/interfaces";
import {
  FinishMode,
  IWaveformRef,
  PermissionStatus,
  PlayerState,
  RecorderState,
  UpdateFrequency,
  useAudioPermission,
} from "@simform_solutions/react-native-audio-waveform";
import { randomUUID } from "expo-crypto";
import { useEffect, useRef, useState } from "react";
import { Alert, Linking } from "react-native";

export const useAudioRecorder = (
  onAudioRecorded: (audio: AttachmentProps) => void,
) => {
  const liveRecorderRef = useRef<IWaveformRef>(null);
  const staticPlayerRef = useRef<IWaveformRef>(null);

  const [recorderState, setRecorderState] = useState(RecorderState.stopped);
  const [audio, setAudio] = useState<AttachmentProps>();
  const [playerState, setPlayerState] = useState(PlayerState.stopped);
  const [recordingTime, setRecordingTime] = useState(0);

  const { checkHasAudioRecorderPermission, getAudioRecorderPermission } =
    useAudioPermission();

  const startRecording = () => {
    setRecorderState(RecorderState.recording);
    liveRecorderRef.current?.startRecord({
      updateFrequency: UpdateFrequency.medium,
    });
  };

  const handleRecorderAction = async () => {
    try {
      if (recorderState === RecorderState.stopped) {
        const hasPermission = await checkHasAudioRecorderPermission();

        if (hasPermission === PermissionStatus.granted) {
          startRecording();
        } else if (hasPermission === PermissionStatus.undetermined) {
          const permissionStatus = await getAudioRecorderPermission();
          if (permissionStatus === PermissionStatus.granted) {
            startRecording();
          }
        } else {
          Linking.openSettings();
        }
      } else {
        await handleStopRecording();
      }
    } catch (error) {
      console.log("error setting recorder action", error);
    }
  };

  const handleStopRecording = async () => {
    try {
      const path = await liveRecorderRef.current?.stopRecord();

      if (path) {
        const audioAttach = {
          _id: randomUUID(),
          fileName: `audio-${Date.now()}`,
          size: 0,
          mimeType: `audio/${path?.split(".").pop()}`,
          type: "audio",
          url: path,
          width: 0,
          height: 0,
          duration: 0,
        };

        onAudioRecorded(audioAttach as any);
        setAudio(audioAttach as any);
        console.log("Audio guardado:", path);
      }

      setRecorderState(RecorderState.stopped);
    } catch (error) {
      console.error("Error al detener grabación:", error);
    }
  };

  const handlePlayPauseAction = async () => {
    try {
      if (playerState === PlayerState.stopped) {
        await staticPlayerRef.current?.startPlayer({
          finishMode: FinishMode.stop,
        });
      } else if (playerState === PlayerState.playing) {
        await staticPlayerRef.current?.pausePlayer();
      } else if (playerState === PlayerState.paused) {
        await staticPlayerRef.current?.resumePlayer();
      }
    } catch (error) {
      console.log("Error playing or pausing audio", error);
    }
  };

  const handleRecordPauseResume = async () => {
    try {
      if (recorderState === RecorderState.recording) {
        await liveRecorderRef.current?.pauseRecord();
      } else if (recorderState === RecorderState.paused) {
        await liveRecorderRef.current?.resumeRecord();
      }
    } catch (error) {
      console.error("Error pausing and resuming audio", error);
    }
  };

  const handleDeleteAudio = () => {
    Alert.alert(
      "Eliminar audio",
      "¿Estás seguro de que deseas eliminar este audio?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setAudio(undefined);
            setRecorderState(RecorderState.stopped);
            setRecordingTime(0);
          },
        },
      ],
    );
  };

  const resetAudio = () => {
    setAudio(undefined);
    setRecorderState(RecorderState.stopped);
    setRecordingTime(0);
  };

  // Control del tiempo de grabación
  useEffect(() => {
    let interval: number;

    if (recorderState === RecorderState.recording) {
      interval = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    } else if (recorderState === RecorderState.stopped) {
      setRecordingTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recorderState]);

  // Estados derivados
  const isRecording = recorderState === RecorderState.recording;
  const isPaused = recorderState === RecorderState.paused;
  const hasAudio = !!audio?.url;
  const showAudioUI = isRecording || isPaused || hasAudio;

  return {
    // Refs
    liveRecorderRef,
    staticPlayerRef,

    // Estados
    recorderState,
    setRecorderState,
    playerState,
    setPlayerState,
    audio,
    recordingTime,

    // Estados derivados
    isRecording,
    isPaused,
    hasAudio,
    showAudioUI,

    // Acciones
    handleRecorderAction,
    handleStopRecording,
    handlePlayPauseAction,
    handleRecordPauseResume,
    handleDeleteAudio,
    resetAudio,
  };
};
