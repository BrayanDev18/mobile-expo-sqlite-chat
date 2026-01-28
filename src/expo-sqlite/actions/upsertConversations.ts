import { UserProps } from "@/interfaces";
import { desc, eq } from "drizzle-orm";
import { chatDb, conversations } from "../db";
import { mapApiUserToConversation } from "../mappers";

export const upsertConversation = async (apiUser: UserProps) => {
  const conversation = mapApiUserToConversation(apiUser);

  await chatDb
    .insert(conversations)
    .values(conversation)
    .onConflictDoUpdate({
      target: conversations._id,
      set: {
        name: conversation.name,
        avatar: conversation.avatar,
        updatedAt: conversation.updatedAt,
      },
    });

  return conversation;
};

/**
 * Obtiene todas las conversaciones ordenadas por fecha
 */
export const getConversations = async (limit = 10) => {
  return await chatDb
    .select()
    .from(conversations)
    .orderBy(desc(conversations.updatedAt))
    .limit(limit);
};

/**
 * Obtiene una conversación por ID
 */
export const getConversationById = async (id: string) => {
  const result = await chatDb
    .select()
    .from(conversations)
    .where(eq(conversations._id, id))
    .limit(1);

  return result[0] || null;
};

/**
 * Actualiza el último mensaje de una conversación
 */
export const updateConversationMessage = async (
  conversationId: string,
  lastMessage: string,
) => {
  await chatDb
    .update(conversations)
    .set({
      lastMessage,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(conversations._id, conversationId));
};

/**
 * Archiva/desarchivar una conversación
 */
export const toggleArchiveConversation = async (conversationId: string) => {
  const conversation = await getConversationById(conversationId);
  if (!conversation) return;

  await chatDb
    .update(conversations)
    .set({
      isArchived: conversation.isArchived ? 0 : 1,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(conversations._id, conversationId));
};

/**
 * Pin/unpin una conversación
 */
export const togglePinConversation = async (conversationId: string) => {
  const conversation = await getConversationById(conversationId);
  if (!conversation) return;

  await chatDb
    .update(conversations)
    .set({
      isPinned: conversation.isPinned ? 0 : 1,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(conversations._id, conversationId));
};
