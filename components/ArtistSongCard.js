import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ArtistSongCard = ({ imgUrl, artist, title, type }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Player", { imgUrl, artist, title })}
        className="mr-3 shadow-sm"
      >
        <View className="">
          <View className=" flex-row items-center  space-x-1">
            <Image source={{ uri: imgUrl }} className="h-10 w-10 rounded-sm" />

            <Text
              numberOfLines={1}
              className="font-bold text-white text-lg pt-2 "
            >
              {title}
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Text className="font-semibold text-sm text-gray-400">
              {artist}
            </Text>
          </View>
          <Text className=" font-semibold text-xs text-gray-700">{type}</Text>
        </View>
        <View />
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: "#2c2c2c",
          borderBottomWidth: 1,
          marginLeft: 5,
          marginRight: 5,
        }}
      />
    </View>
  );
};

export default ArtistSongCard;
