CREATE TABLE `attachments` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text,
	`fileName` text,
	`mimeType` text,
	`size` integer,
	`type` text,
	`videoThumbnail` text,
	`width` integer,
	`height` integer,
	`duration` integer,
	`createdAt` integer,
	`updatedAt` integer,
	`messageId` text NOT NULL,
	`conversationId` text NOT NULL,
	FOREIGN KEY (`messageId`) REFERENCES `messages`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`conversationId`) REFERENCES `conversations`(`_id`) ON UPDATE no action ON DELETE no action
);
