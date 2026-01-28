import { ConversationProps, UserProps } from "@/interfaces";

export const mapApiUserToConversation = (
  apiUser: UserProps,
): ConversationProps => ({
  _id: apiUser.login.uuid,
  name: `${apiUser.name.first} ${apiUser.name.last}`,
  issuingId: apiUser.login.uuid,
  avatar: apiUser.picture.large,
  isArchived: 0,
  isPinned: 0,
  lastMessage: null,
  updatedAt: new Date().toISOString(),
});
