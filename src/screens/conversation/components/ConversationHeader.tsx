import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system/legacy";
import { Icon, Text } from "@/components";
import { AttachmentProps, ConversationProps } from "@/interfaces";

type Props = {
  user: ConversationProps;
  selectedItem: AttachmentProps[];
};

export const ConversationHeader = ({ user, selectedItem }: Props) => {
  const { top } = useSafeAreaInsets();

  const ensureMediaPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Permiso de galería no concedido");
    }
  };

  const shareRemoteImage = async (url: string) => {
    const filename = url.split("/").pop() || "image.jpg";
    const localUri = FileSystem.cacheDirectory + filename;

    const { uri } = await FileSystem.downloadAsync(url, localUri);

    await Sharing.shareAsync(uri, {
      mimeType: "image/jpeg",
      dialogTitle: "Compartir imagen",
    });
  };

  const shareLocalImage = async (assetId: string, mimeType?: string) => {
    await ensureMediaPermission();

    const assetInfo = await MediaLibrary.getAssetInfoAsync(assetId);

    if (!assetInfo || !assetInfo.localUri) {
      throw new Error("No se pudo obtener el archivo local");
    }

    await Sharing.shareAsync(assetInfo.localUri, {
      mimeType: mimeType ?? "image/jpeg",
    });
  };

  const handleShareFile = async () => {
    try {
      const item = selectedItem?.[0];

      if (!item) {
        console.warn("No hay archivo seleccionado");
        return;
      }

      if (item.url.startsWith("http")) {
        // Imagen del servidor
        console.log('Imagen del servidor', item.url);
        await shareRemoteImage(item.url);
      } else  {
        // iOS galería
        await shareLocalImage(item._id, item.mimeType);
      }
    } catch (error) {
      console.error("Error al compartir archivo:", error);
    }
  };

  return (
    <View
      style={{ paddingTop: top }}
      className="flex-row items-center gap-2 px-4 py-3 border-b border-neutral-100 dark:border-neutral-900"
    >
      <Icon
        name="ArrowLeft"
        size={22}
        onPress={() => router.back()}
        className="h-12 w-12 items-center justify-center"
      />

      <View className="flex-1 flex-row items-center gap-3">
        <View className="relative">
          <Image
            source={{ uri: user?.avatar }}
            style={{ width: 48, height: 48, borderRadius: 24 }}
            cachePolicy="memory-disk"
          />
          <View className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border border-white bg-green-500" />
        </View>

        <View className="flex-1 justify-center">
          <Text className="text-xl font-semibold">{user?.name}</Text>
          <Text className="text-sm !text-neutral-500 dark:!text-neutral-400">
            hoy a las 5:00 PM
          </Text>
        </View>

        <Pressable className="h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100">
          <Icon name="EllipsisVertical" size={24} />
        </Pressable>
      </View>
    </View>
  );
};
