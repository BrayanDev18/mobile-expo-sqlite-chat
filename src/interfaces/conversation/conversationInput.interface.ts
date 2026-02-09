import { useAudioRecorder } from "@/hooks";
import { AttachmentProps } from "../message.interface";

export interface ConversationInputProps {
  control: any;
  handleOpenEmojiGifsSheet: () => void;
  handleSendMessage: any;
  shouldShowInput: boolean;
  openFilePicker: () => void;
  attachments: AttachmentProps[];
  onAudioRecorded: (audio: AttachmentProps) => void;
}

export interface RecordingAudioSectionProps {
  audioRecorder: ReturnType<typeof useAudioRecorder>;
  handleSendMessage: () => void;
}

export interface InputSectionProps {
  bottom: number;
  handleOpenEmojiGifsSheet: () => void;
  control: any;
  openFilePicker: () => void;
  inputText: string;
  attachments: AttachmentProps[];
  handleSendMessage: () => void;
  handleRecorderAction: () => void;
}
