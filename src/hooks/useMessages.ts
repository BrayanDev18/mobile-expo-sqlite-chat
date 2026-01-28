import { chatDb, messages } from "@/expo-sqlite/db";
import { InsertMessage, MessageProps } from "@/interfaces";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { randomUUID } from "expo-crypto";

export const useMessages = (conversationId: string) => {
  const { data, error } = useLiveQuery(
    chatDb
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt),
  );

  const messagesData = data.map((message) => ({
    ...message,
    conversationId,
    status: "sent",
    attachments: JSON.parse(message.attachments as any),
    location: JSON.parse(message.location as any),
  }));

  const saveMessage = async (messageData: InsertMessage) => {
    try {
      const newMessage = {
        _id: randomUUID(),
        conversationId: messageData.conversationId,
        body: messageData.body,
        type: messageData.type,
        createdAt: messageData.createdAt,
        status: messageData.status,
        location: JSON.stringify(messageData.location),
        attachments: JSON.stringify(messageData.attachments || []),
        senderId: messageData.senderId,
        issuingId: messageData.issuingId,
      };

      await chatDb.insert(messages).values(newMessage);
    } catch (error) {
      console.error("❌ Error saving message:", error);
      throw error;
    }
  };

  return { messages: messagesData as MessageProps[], saveMessage, error };
};
