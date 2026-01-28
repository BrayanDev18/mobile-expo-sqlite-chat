import { AttachmentProps, MessageProps } from "../message.interface";

export interface MessageBubbleProps {
  message: MessageProps;
  messages: MessageProps[];
  index: number;
  handleOpenPreview: (attach: AttachmentProps[]) => void;
}

export interface MessageImagesGroupedProps {
  attachments: AttachmentProps[];
  bubbleStyle: any;
  message: MessageProps;
  onPress: () => void;
}

export interface AudioRendererProps {
  audio: AttachmentProps;
  message: MessageProps;
}

export interface VideoRendererProps {
  attachment: AttachmentProps;
}
