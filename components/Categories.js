import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import CategoryCard from "./CategoryCard";

const Categories = ({ artists }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {artists &&
        artists.map((artist) => (
          <CategoryCard name={artist.name} key={artist.name} />
        ))}
    </ScrollView>
  );
};

export default Categories;
