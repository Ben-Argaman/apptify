import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import ArtistSongCard from "./ArtistSongCard";

const SongsRow = ({ hits }) => {
  return (
    <View className="w-full">
      <View className="mt-2 flex-row-reverse items-center justify-between px-4">
        <Text className="font-bold text-lg text-white">שירים</Text>
      </View>
      <View className="flex-row-reverse">
        <Text className="text-xs text-gray-500 px-4">
          {hits[0].result.artist_names}
        </Text>
      </View>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="pt-4"
      >
        {hits &&
          hits.map((item) => (
            <ArtistSongCard
              key={item.result.id}
              imgUrl={item.result.header_image_url}
              title={item.result.title}
              artist={item.result.artist_names}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default SongsRow;
