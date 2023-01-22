import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const CategoryCard = ({ name }) => {
  const [artistImg, setArtistImg] = useState([]);
  const [artistId, setArtistId] = useState([]);
  const [hits, setHits] = useState([]);
  const token =
    "HzD3tlJ238gNcFQnrToIEqUXAiqy8mSroJcl3G_lEG-PA_2AX5h-qvSm4wAMb0ef";
  const navigation = useNavigation();
  const getArtistImage = async () => {
    const { data } = await axios.get(
      `https://api.genius.com/search?q=${name}&access_token=${token}`
    );
    setHits(data.response.hits);
    setArtistId(data.response.hits[0].result.primary_artist.id);
    setArtistImg(data.response.hits[0].result.header_image_url);
  };
  useLayoutEffect(() => {
    getArtistImage();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Artist", { hits, name, artistId })}
      className="mr-4 relative"
    >
      <Image
        source={{
          uri: artistImg,
        }}
        className="h-52 w-44 rounded-md"
      />
      <Text className="absolute bottom-1 left-1 text-[#ffffff] font-bold">
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
