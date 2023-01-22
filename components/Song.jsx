import React, { useEffect } from "react";
import { Image, View } from "react-native";

const Song = ({ track, index, albumImage }) => {
  useEffect(() => {}, [track]);

  return (
    <>
      <View className="grid grid-cols-2 text-gray-500 h-24 p-2 cursor-pointer hover:bg-gray-900 text-lg">
        <View className="flex items-center space-x-4">
          <Text>{index + 1}</Text>
          <Image
            source={
              track.result
                ? track.result.header_image_thumbnail_url
                : albumImage
            }
            className="h-20 w-20"
          />
          <View>
            <Text className="w-36 lg:w-64 truncate text-white">
              {track.result ? track.result.title : track.name}
            </Text>
            <Text className="w-40 truncate">
              {track.result ? track.result.artist_names : track.artist.name}
            </Text>
          </View>
        </View>
        <View className="flex items-center justify-between ml-auto md:ml-0">
          <Text className="w-40 hidden md:inline">
            {track.albumName && track.albumName}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Song;
