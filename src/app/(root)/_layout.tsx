import { getConversations, getGifs } from "@/expo-sqlite/actions";
import { syncConversationsFromAPI, syncTrendingGifsFromAPI } from "@/services";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";

export default function RootLayout() {
  return (
    <>
      <DataSyncManager />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

const DataSyncManager = () => {
  return (
    <>
      <ConversationSync />
      <GifSync />
    </>
  );
};

const ConversationSync = () => {
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    if (hasSyncedRef.current) return;

    hasSyncedRef.current = true;

    const bootstrap = async () => {
      try {
        const existingConversations = await getConversations();

        if (!existingConversations || existingConversations.length === 0) {
          await syncConversationsFromAPI();

          hasSyncedRef.current = true;
        } else {
          console.log(
            `Found ${existingConversations.length} conversations, skipping sync`,
          );
          hasSyncedRef.current = true;
        }
      } catch (error) {
        console.error("Error syncing conversations:", error);
      }
    };

    bootstrap();
  }, []);

  return null;
};

const GifSync = () => {
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    if (hasSyncedRef.current) return;
    hasSyncedRef.current = true;

    const gifs = async () => {
      try {
        const existingGifs = await getGifs();

        if (!existingGifs || existingGifs.length === 0) {
          await syncTrendingGifsFromAPI();
        } else {
          console.log(`Found ${existingGifs.length} gifs, skipping sync`);
          hasSyncedRef.current = true;
        }
      } catch (e) {
        console.log("error syncing gifs", e);
      }
    };

    gifs();
  }, []);

  return null;
};
