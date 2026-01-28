import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export const expoDb = openDatabaseSync("sqlite_chat.db", {
  enableChangeListener: true,
});

export const chatDb = drizzle(expoDb);

export const resetDatabase = () => {
  try {
    expoDb.execSync("DROP TABLE IF EXISTS attachments;");
    expoDb.execSync("DROP TABLE IF EXISTS messages;");
    expoDb.execSync("DROP TABLE IF EXISTS conversations;");
    expoDb.execSync("DROP TABLE IF EXISTS users;");
    expoDb.execSync("DROP TABLE IF EXISTS __drizzle_migrations;");
    console.log("✅ Database reset complete");
  } catch (error) {
    console.error("❌ Error resetting database:", error);
  }
};
