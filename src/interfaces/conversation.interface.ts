export interface ConversationItemProps {
  conversation: ConversationProps;
  index: number;
}

export interface ConversationResponse {
  results: ConversationProps[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface ConversationProps {
  _id: string;
  name: string;
  issuingId?: string | null;
  isArchived?: number;
  isPinned?: number;
  avatar?: string;
  lastMessage?: string | null;
  updatedAt?: string | null;
}

export interface FormProps {
  conversationId: string;
  body: string;
  type: string;
  createdAt: number;
  status: string;
  attachments: never[];
  senderId: string;
  issuingId: string;
}
