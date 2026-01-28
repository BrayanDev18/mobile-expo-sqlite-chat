import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { Dimensions, View } from "react-native";

import { AttachmentProps } from "@/interfaces";
import { Icon } from "../Icon";

const { width } = Dimensions.get("window");

export const FullScreenVideo = ({ item }: { item: AttachmentProps }) => {
  const player = useVideoPlayer(item.url, (player) => {
    player.loop = false;
    player.pause();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handlePlayPauseVideo = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const videoSize =
    item.width && item.height ? (item.height / item.width) * width : width;

  return (
    <View className="relative">
      <VideoView
        style={{ width, height: videoSize, backgroundColor: "red" }}
        contentFit="fill"
        player={player}
        allowsPictureInPicture
      />

      <View className="absolute inset-0 items-center justify-center">
        <Icon
          name={isPlaying ? "Pause" : "Play"}
          size={30}
          color="white"
          onPress={handlePlayPauseVideo}
          className="items-center justify-center rounded-md bg-brand-500 p-4"
        />
      </View>
    </View>
  );
};
