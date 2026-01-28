import { getConversationById } from "@/expo-sqlite/actions";
import { ConversationProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

export const useConversation = (conversationId: string) => {
  const [conversation, setConversation] = useState<ConversationProps>();
  const [loadingConversation, setLoadingConversations] = useState(false);

  const loadConversation = useCallback(async () => {
    setLoadingConversations(true);
    try {
      const res = await getConversationById(conversationId);

      setConversation(res as ConversationProps);
    } catch (error) {
      console.error("error getting conversations", error);
    } finally {
      setLoadingConversations(false);
    }
  }, [conversationId]);

  //   const handlePinConversation = async (conversationId: number) => {};

  //   const handleArchiveConversation = async (conversationId: number) => {};

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  return {
    conversation: conversation as ConversationProps,
    loadingConversation,
  };
};
