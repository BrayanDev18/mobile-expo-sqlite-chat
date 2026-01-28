import { upsertConversation, upsertUser } from "@/expo-sqlite/actions";
import { UserProps } from "@/interfaces";

export const syncConversationsFromAPI = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=10");

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const apiUsers: UserProps[] = data.results;

    await Promise.all(
      apiUsers.map(async (apiUser) => {
        await upsertUser(apiUser);

        await upsertConversation(apiUser);
      }),
    );

    console.log(
      `✅ Sincronizados ${apiUsers.length} usuarios y conversaciones`,
    );
    return apiUsers;
  } catch (error) {
    console.error("❌ Error syncing conversations:", error);
    throw error;
  }
};
