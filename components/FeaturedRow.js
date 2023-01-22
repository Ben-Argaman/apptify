import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import SongCard from "./SongCard";
import axios from "axios";
const FeaturedRow = ({ title, description, id }) => {
  const [newSongs, setNewSongs] = useState([]);
  const [recSongs, setRecSongs] = useState([]);
  const [specSongs, setSpecSongs] = useState([]);
  const access_token =
    "BQCcX_vhLhlXOH9E8cs1EnbuXZgLkd8sj4e1pqvNRaNIcwyDm5hwODY1Fd1eRG2Jy78a9oATnc7fGoxZuAkXZ37cNe4IbGH8v7GlZuhCi9TrTTkx6kMd9eIlySvyphBoXQgXx_Xm2CYYSw7TMBSBuSMWoBg8ZTLPNEc8wgMc3clP7ob-Lsh1l1FrdX4td9CvN8E";

  const getNewSongs = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setNewSongs(data.albums.items);
  };

  const getRecommendedSongs = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases?country=US&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setRecSongs(data.albums.items);
  };

  const getSpecialSongs = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases?country=GB&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setSpecSongs(data.albums.items);
  };

  useLayoutEffect(() => {
    getRecommendedSongs();
    getSpecialSongs();
    getNewSongs();
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row-reverse items-center justify-between px-4">
        <Text className="font-bold text-white text-lg">{title}</Text>
      </View>
      <View className=" flex-row-reverse">
        <Text className="text-xs text-gray-500 px-4">{description}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="pt-4"
      >
        {id === "1" &&
          newSongs.map((item) => (
            <SongCard
              key={item.id}
              imgUrl={item.images[1].url}
              title={item.name}
              type={item.album_type}
              artist={item.artists[0].name}
            />
          ))}
        {id === "2" &&
          recSongs.map((item) => (
            <SongCard
              key={item.id}
              imgUrl={item.images[1].url}
              title={item.name}
              type={item.album_type}
              artist={item.artists[0].name}
            />
          ))}
        {id === "3" &&
          specSongs.map((item) => (
            <SongCard
              key={item.id}
              imgUrl={item.images[1].url}
              title={item.name}
              type={item.album_type}
              artist={item.artists[0].name}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
