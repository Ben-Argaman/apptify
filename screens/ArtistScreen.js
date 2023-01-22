import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AlbumRow from "../components/AlbumRow";
import SongsRow from "../components/SongsRow";

const ArtistScreen = () => {
  const {
    params: { name, artistId, hits },
  } = useRoute();
  const navigation = useNavigation();
  const token =
    "tZJO7IMXwDzFFRq7LrX03uWVbmJnCxc4Y_gzJp959h0evmYkkvc_-nRmm1cYbdki";

  const [artistImg, setArtistImg] = useState("");

  const getArtistImage = async () => {
    const { data } = await axios.get(
      `https://api.genius.com/artists/${artistId}?access_token=${token}`
    );
    setArtistImg(data.response.artist);
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
    getArtistImage();
  }, []);
  return (
    <ScrollView className="bg-[#181818]">
      <View>
        <Image
          source={{ uri: artistImg.image_url }}
          className="w-full h-72 bg-gray-300 p-4"
        />
      </View>
      <View className="px-4 pt-4">
        <Text className="text-3xl font-bold text-white">{name}</Text>
        <Text className="font-semibold text-sm text-gray-400">
          {artistImg.user && artistImg.user.human_readable_role_for_display}
        </Text>
        <View className="flex-row space-x-2 my-1"></View>
      </View>
      <View className="flex-row">
        <AlbumRow artist={name} />
      </View>
      <View className="flex-row">
        <SongsRow hits={hits} />
      </View>
    </ScrollView>
  );
};

export default ArtistScreen;
