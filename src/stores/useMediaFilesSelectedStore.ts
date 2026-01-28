import { AttachmentProps } from "@/interfaces";
import { getFileExtension } from "@/utils";
import { create } from "zustand";

interface MediaFilesSelectedStore {
  mediaFilesSelected: AttachmentProps[];
  mediaFilesSelectedIds: string[];
  setMediaFilesSelected: (mediaFilesSelected: AttachmentProps[]) => void;
  resetMediaFilesSelected: () => void;
  removeMediaFileSelected: (id: string) => void;
  toggleMediaFileSelected: (
    file: Partial<AttachmentProps> & {
      uri?: string;
      id?: string;
      base64?: string;
    },
    type: "photo" | "video",
  ) => void;
}

export const useMediaFilesSelectedStore = create<MediaFilesSelectedStore>(
  (set) => ({
    mediaFilesSelected: [],
    mediaFilesSelectedIds: [],

    setMediaFilesSelected: (mediaFilesSelected) => {
      const mediaFilesSelectedIds = mediaFilesSelected.map((file) => file._id);
      set({ mediaFilesSelected, mediaFilesSelectedIds });
    },

    resetMediaFilesSelected: () =>
      set({ mediaFilesSelected: [], mediaFilesSelectedIds: [] }),

    removeMediaFileSelected: (id) => {
      set((state) => ({
        mediaFilesSelected: state.mediaFilesSelected.filter(
          (file) => file._id !== id,
        ),
        mediaFilesSelectedIds: state.mediaFilesSelectedIds.filter(
          (fileId) => fileId !== id,
        ),
      }));
    },

    toggleMediaFileSelected: (file, type) => {
      set((state) => {
        // Usar el _id del archivo o generar uno temporal
        const fileId = file._id || file.id || `temp-${Date.now()}`;
        const exists = state.mediaFilesSelectedIds.includes(fileId);

        if (exists) {
          // Remover archivo
          return {
            mediaFilesSelectedIds: state.mediaFilesSelectedIds.filter(
              (id) => id !== fileId,
            ),
            mediaFilesSelected: state.mediaFilesSelected.filter(
              (f) => f._id !== fileId,
            ),
          };
        }

        // Agregar archivo - construir nombre
        const fileName =
          file.originalName ||
          file.fileName ||
          file.url?.split("/").pop() ||
          "file";

        // Construir el attachment siguiendo la interfaz AttachmentProps
        const newAttachment: AttachmentProps = {
          _id: fileId,
          url: file.url || file.uri || "", // Usar uri como fallback si no hay url
          fileName: fileName,
          originalName: file.originalName || fileName,
          mimeType:
            file.mimeType ||
            `${type === "photo" ? "image" : type}/${getFileExtension(fileName)}`,
          size: file.size || 0,
          type: type === "photo" ? "image" : "video",
          videoThumbnail: file.videoThumbnail,
          width: file.width || 0,
          height: file.height || 0,
          duration: file.duration || 0,
          createdAt: file.createdAt || Date.now(),
          updatedAt: file.updatedAt || Date.now(),
          messageId: file.messageId || "",
          conversationId: file.conversationId || "",
        };

        return {
          mediaFilesSelectedIds: [...state.mediaFilesSelectedIds, fileId],
          mediaFilesSelected: [...state.mediaFilesSelected, newAttachment],
        };
      });
    },
  }),
);
