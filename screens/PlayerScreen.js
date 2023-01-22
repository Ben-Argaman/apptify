import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import {
  useNavigation,
  useRoute,
  useScrollToTop,
} from "@react-navigation/native";
import { PlayIcon, PauseIcon } from "react-native-heroicons/solid";

import axios from "axios";
const PlayerScreen = () => {
  const playerRef = useRef();
  const [songId, setSongId] = useState("");
  const [playing, setPlaying] = useState(true);

  const colors = ["#877A70"];

  const {
    params: { title, imgUrl, artist },
  } = useRoute();
  const navigation = useNavigation();

  const getSongId = async () => {
    if (title) {
      const { data } = await axios.get(
        `https://bentify-api-risu.onrender.com/api/${title} + ${artist}}`
      );
      setSongId(data[0]);
    }
  };
  const togglePlaying = () => {
    setPlaying(!playing);
  };
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
    getSongId();
  }, []);

  return (
    <SafeAreaView className="h-full" style={{ backgroundColor: colors[0] }}>
      <View className="flex-row  justify-center mt-28 shadow-2xl ">
        <Image
          source={{ uri: imgUrl }}
          className="w-80 h-80 bg-gray-300 shadow-2xl rounded"
        />
      </View>
      <View className="px-9 space-y-1 pt-4">
        <Text className="text-3xl font-bold text-[#fafafa]">{title}</Text>
        <Text className="font-semibold text-sm text-gray-400">{artist}</Text>
        <View className="flex-row space-x-2 my-1"></View>
      </View>
      <View>
        <YoutubePlayer
          play={playing}
          ref={playerRef}
          videoId={songId}
          onChangeState={onStateChange}
        />
        <TouchableOpacity
          className="flex-col mt-20 mx-auto"
          onPress={togglePlaying}
          style={{ height: 50, width: 50 }}
        >
          <View>
            {playing ? (
              <PauseIcon color={"white"} height={50} width={50} />
            ) : (
              <PlayIcon color={"white"} height={50} width={50} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default PlayerScreen;
