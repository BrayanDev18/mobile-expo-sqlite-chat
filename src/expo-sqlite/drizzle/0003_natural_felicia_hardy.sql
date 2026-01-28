CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`conversationId` text NOT NULL,
	`issuingId` text,
	`senderId` text,
	`body` text,
	`type` text,
	`location` text,
	`status` text,
	`attachments` text,
	`createdAt` text,
	`updatedAt` text,
	FOREIGN KEY (`conversationId`) REFERENCES `conversations`(`_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`issuingId`) REFERENCES `users`(`_id`) ON UPDATE no action ON DELETE no action
);
