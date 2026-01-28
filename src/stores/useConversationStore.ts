import { getConversations } from "@/expo-sqlite/actions";
import { create } from "zustand";
import { ConversationProps } from "../interfaces/conversation.interface";

interface UseConversationStoreStore {
  conversations: ConversationProps[];
  loadConversations: () => Promise<void>;
}

export const useConversationStore = create<UseConversationStoreStore>(
  (set, get) => ({
    conversations: [],
    loadConversations: async () => {
      if (get().conversations.length > 0) return;

      const rows = await getConversations();

      console.log(rows.length);

      set({ conversations: rows as ConversationProps[] });
    },
  }),
);
