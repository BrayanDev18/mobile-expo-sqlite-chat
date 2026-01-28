import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import migrations from "../drizzle/migrations";
import { chatDb, expoDb } from "./client";

export const useInitDb = () => {
  const { success, error } = useMigrations(chatDb, migrations);

  if (error) console.error("Migration error:", error);
  if (success) console.log("✅ DB migrated successfully");

  if (__DEV__) {
    useDrizzleStudio(expoDb as any);
  }

  return { success, error };
};
