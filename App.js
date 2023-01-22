import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ArtistScreen from "./screens/ArtistScreen";
import PlayerScreen from "./screens/PlayerScreen";
import AlbumScreen from "./screens/AlbumScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Artist" component={ArtistScreen}></Stack.Screen>
        <Stack.Screen name="Player" component={PlayerScreen}></Stack.Screen>
        <Stack.Screen name="Album" component={AlbumScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
