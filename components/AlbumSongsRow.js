import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import ArtistSongCard from "./ArtistSongCard";
import AlbumSongCard from "./AlbumSongCard";

const AlbumSongsRow = ({ albumTracks, artist }) => {
  useLayoutEffect(() => {
    console.log(albumTracks);
  }, [albumTracks]);
  return (
    <View className="w-full">
      <View className="mt-2 flex-row-reverse items-center justify-between px-4">
        <Text className="font-bold text-lg text-white">שירים</Text>
      </View>
      <View className="flex-row-reverse">
        <Text className="text-xs text-gray-500 px-4">{artist}</Text>
      </View>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="pt-4"
      >
        <View>
          {albumTracks.tracks &&
            albumTracks.tracks.track.length > 1 &&
            albumTracks.tracks.track.map((track) => {
              track.image = Object.values(albumTracks.image[5])[1];

              return (
                <AlbumSongCard
                  key={track.mbid}
                  title={track.name}
                  imgUrl={track.image}
                  artist={artist}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AlbumSongsRow;
