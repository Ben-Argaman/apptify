import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SongCard = ({ imgUrl, artist, title, type }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="mr-3 shadow-sm"
      onPress={() => navigation.navigate("Album", { imgUrl, artist, title })}
    >
      <Image source={{ uri: imgUrl }} className="h-36 w-48 rounded" />
      <View className="px-3 pb-4">
        <View className="flex-row items-center space-x-1">
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            className="font-bold text-lg pt-2 flex-1 text-white"
          >
            {title}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <Text className="font-semibold text-sm text-gray-400">{artist}</Text>
        </View>
        <Text className=" font-semibold text-xs text-gray-700">{type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;
