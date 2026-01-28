CREATE TABLE `gifs` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`previewUrl` text,
	`width` integer,
	`height` integer,
	`title` text
);
