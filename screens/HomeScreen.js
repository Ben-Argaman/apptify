import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

import axios, { Axios } from "axios";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [topArtists, setTopArtists] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const token =
    "HzD3tlJ238gNcFQnrToIEqUXAiqy8mSroJcl3G_lEG-PA_2AX5h-qvSm4wAMb0ef";

  const getTopArtists = async () => {
    const { data } = await axios.get(
      "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=e1c393f9c0cc727b780db859810b26bc&format=json"
    );
    setTopArtists(data);
  };
  const getSong = async () => {
    const { data } = await axios.get(
      `https://api.genius.com/search?q=${searchKey}&access_token=${token}`
    );
    if (!searchKey == "") {
      setSearchResults(data);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    getTopArtists();

    const delayDebounceFn = setTimeout(() => {
      getSong();
    }, 200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchKey]);

  return (
    <SafeAreaView className="bg-[#000]">
      <View className="flex-row-reverse pb-3 pt-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1 flex-row-reverse">
          <Text className="font-bold text-2xl">חיפוש</Text>
        </View>
      </View>
      <View>
        <View className="flex-row-reverse space-x-2 bg-[#000]  p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholderTextColor="#fff"
            placeholder="אמנים, שירים, אלבומים"
            className="placeholder-white mx-4  font-bold "
            keyboardType="default"
            onChangeText={(newText) => setSearchKey(newText)}
          />
        </View>
      </View>
      <ScrollView
        className="bg-[#181818]"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories */}
        <Categories artists={topArtists.artists && topArtists.artists.artist} />
        {/* Featured Row */}
        <FeaturedRow
          id="1"
          title="מומלצים"
          description="האזינו לאלבומים והשירים המומלצים ביותר"
          featuredCategory="featured"
        />
        <FeaturedRow
          id="2"
          title="חדשים"
          description="להנות ממגוון חדש של יצירות חדשות"
          featuredCategory="featured"
        />
        <FeaturedRow
          id="3"
          title="הבחירה שלנו"
          description="כל השירים שכולנו אוהבים"
          featuredCategory="featured"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
