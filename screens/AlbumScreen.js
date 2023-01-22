import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AlbumRow from "../components/AlbumRow";
import SongsRow from "../components/SongsRow";
import SongCard from "../components/SongCard";
import ArtistSongCard from "../components/ArtistSongCard";
import AlbumSongsRow from "../components/AlbumSongsRow";

const AlbumScreen = () => {
  const {
    params: { imgUrl, artist, title },
  } = useRoute();
  const navigation = useNavigation();
  const [albumTracks, setAlbumTracks] = useState([]);
  const loadAlbumTracks = async () => {
    const { data } = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=e1c393f9c0cc727b780db859810b26bc&artist=${artist}&album=${title}&format=json`
    );

    data.album.tracks.track.length > 2 && setAlbumTracks(data.album);
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
    loadAlbumTracks();
  }, []);
  return (
    <ScrollView className="bg-[#181818]">
      <View>
        <Image
          source={{ uri: imgUrl }}
          className="w-full h-72 bg-gray-300 p-4"
        />
      </View>
      <View className="px-4 pt-4">
        <Text className="text-3xl font-bold text-white">{title}</Text>
      </View>
      <AlbumSongsRow
        albumTracks={albumTracks}
        artist={artist}
        title={title}
        imgUrl={imgUrl}
      />
      <View className="flex-row"></View>
    </ScrollView>
  );
};

export default AlbumScreen;
