import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  _id: text("_id").primaryKey(),
  name: text("name"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  fullName: text("fullName"),
  gender: text("gender", { enum: ["male", "female"] }),
  location: text("location"),
  login: text("login"),
  email: text("email"),
  registered: text("registered"),
  phone: text("phone"),
  cell: text("cell"),
  avatar: text("avatar"),
});

export const conversations = sqliteTable("conversations", {
  _id: text("_id").primaryKey(),
  name: text("name").notNull(),
  issuingId: text("issuingId").references(() => users._id),
  isArchived: integer("isArchived").default(0),
  isPinned: integer("isPinned").default(0),
  avatar: text("avatar"),
  lastMessage: text("lastMessage"),
  updatedAt: text("updatedAt"),
});

export const messages = sqliteTable("messages", {
  _id: text("id").primaryKey(),
  conversationId: text("conversationId")
    .notNull()
    .references(() => conversations._id),
  issuingId: text("issuingId").references(() => users._id),
  senderId: text("senderId"),
  body: text("body"),
  type: text("type"),
  location: text("location"),
  status: text("status"),
  attachments: text("attachments"),
  createdAt: text("createdAt"),
  updatedAt: text("updatedAt"),
});

export const attachments = sqliteTable("attachments", {
  _id: text("id").primaryKey(),
  url: text("url"),
  fileName: text("fileName"),
  mimeType: text("mimeType"),
  size: integer("size"),
  type: text("type"),
  videoThumbnail: text("videoThumbnail"),
  width: integer("width"),
  height: integer("height"),
  duration: integer("duration"),
  createdAt: integer("createdAt"),
  updatedAt: integer("updatedAt"),
  messageId: text("messageId")
    .notNull()
    .references(() => messages._id),
  conversationId: text("conversationId")
    .notNull()
    .references(() => conversations._id),
});

export const gifs = sqliteTable("gifs", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  previewUrl: text("previewUrl"),
  width: integer("width"),
  height: integer("height"),
  title: text("title"),
});
