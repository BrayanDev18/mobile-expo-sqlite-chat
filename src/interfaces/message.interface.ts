import { attachments, messages } from "@/expo-sqlite/db";

export type MessageDbProps = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

export type AttachmentDbProps = typeof attachments.$inferSelect;
export type InsertAttachment = typeof attachments.$inferInsert;

export type MessageProps = {
  _id: string;
  conversationId: string;
  senderId?: string;
  issuingId?: string;
  body?: string;
  type: "text" | "image" | "video" | "audio" | "location" | "file";
  status: "sent" | "delivered" | "read" | "failed";
  attachments: AttachmentProps[];
  location?: LocationProps | null;
  createdAt: number;
  updatedAt?: number;
};

export type AttachmentProps = {
  _id: string;
  url: string;
  fileName: string;
  originalName?: string;
  mimeType: string;
  size: number;
  type: "image" | "video" | "audio" | "file";
  videoThumbnail?: VideoThumbnailProps;
  width: number;
  height: number;
  duration: number;
  createdAt?: number;
  updatedAt?: number;
  messageId?: string;
  conversationId?: string;
};

export interface VideoThumbnailProps {
  uri?: string;
  width?: number;
  height?: number;
}

export type LocationProps = {
  latitude: number;
  longitude: number;
  location?: string; // texto tipo "Medellín, Colombia"
};
