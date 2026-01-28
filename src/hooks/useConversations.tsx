import { getConversations } from "@/expo-sqlite/actions";
import { ConversationProps } from "@/interfaces";
import { useEffect, useState } from "react";

export const useConversations = () => {
  const [conversationList, setConversations] = useState<ConversationProps[]>(
    [],
  );
  const [loadingConversation, setLoadingConversation] = useState(false);

  const loadConversations = async () => {
    setLoadingConversation(true);
    try {
      const res = await getConversations();

      setConversations(res as ConversationProps[]);
    } catch (error) {
      console.error("error getting conversations", error);
    } finally {
      setLoadingConversation(false);
    }
  };

  const handlePinConversation = async (conversationId: number) => {};

  const handleArchiveConversation = async (conversationId: number) => {};

  useEffect(() => {
    loadConversations();
  }, []);

  return {
    conversationList,
    loadingConversation,
    reload: loadConversations,
  };
};
