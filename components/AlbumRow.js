import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import SongCard from "./SongCard";

const AlbumRow = ({ artist }) => {
  const [artistAlbums, setArtistAlbums] = useState([]);

  const getArtistAlbums = async (artist) => {
    const { data } = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=e1c393f9c0cc727b780db859810b26bc&format=json`
    );
    console.log(data);
    setArtistAlbums(data.topalbums ? data.topalbums.album : "");
  };

  useLayoutEffect(() => {
    getArtistAlbums(artist);
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row-reverse items-center justify-between px-4">
        <Text className="font-bold text-lg text-white">אלבומים</Text>
      </View>
      <View className=" flex-row-reverse">
        <Text className="text-xs text-gray-500 px-4">{artist}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="pt-4"
      >
        {artistAlbums &&
          artistAlbums.map(
            (item) =>
              !Object.values(item.image[3])[0] == "" && (
                <SongCard
                  key={item.playcount}
                  imgUrl={Object.values(item.image[3])[0]}
                  title={item.name}
                  artist={item.artist.name}
                />
              )
          )}
      </ScrollView>
    </View>
  );
};

export default AlbumRow;
