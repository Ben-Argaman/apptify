import React, { useRef, useState } from "react";

import { useEffect } from "react";
import { TextInput } from "react-native";
import Sound from "react-native-sound";

const Player = ({ track, isSongClicked, albumImage, source }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const audioPlayer = useRef();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };
  useEffect(() => {
    setIsPlaying(true);
    const sound = new Sound('http://sounds.com/some-sound', null, (error) => {
  if (error) {
    // do something
  }
  
  // play when loaded
  sound.play();
});

  }, [isSongClicked]);

  return (
    track && (
      <View className="mx-auto my-auto">
        <View className="h-36 bg-[#111111] text-white grid grid-cols-3 text-sm md:text-base px-2 md:px-8">
          <View className="flex items-center space-x-4 pb-4">
            <Image
              className="hidden md:inline h-20 w-20"
              source={
                track.result
                  ? track.result.header_image_thumbnail_url
                  : albumImage
              }
              alt=""
            />
            <View>
              <Text>{track.result ? track.result.title : track.name}</Text>
              <Text className="text-md text-gray-500">
                {track.result ? track.result.artist_names : track.artist.name}
              </Text>
            </View>
          </View>
          <View className="flex items-center justify-evenly">
            <SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            <RewindIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            {isPlaying ? (
              <PauseIcon
                className="w-14 h-14 cursor-pointer hover:scale-125 transition transform duration-100 ease-out text-[#EEEEEE]"
                onClick={handlePlayPause}
              />
            ) : (
              <PlayIcon
                className="w-14 h-14 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
                onClick={handlePlayPause}
              />
            )}
            <FastForwardIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            <ReplyIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
          </View>

          <View className="flex items-center space-x-3 md:space-x-4 justify-end p-5">
            <VolumeDownIcon
              className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
              // onClick={() => volume > 0 && setVolume(volume - 10)}
            />
            <TextInput
              type="range"
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                audioPlayer.current.volume = volume * 0.01;
              }}
              min={0}
              max={100}
              className="w-14 md:w-36 "
            />
            <VolumeUpIcon
              className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
              // onClick={() => volume < 100 && setVolume(volume + 10)}
            />
          </View>
        </View>
        <audio
          autoPlay
          ref={audioPlayer}
          name="media"
          src={source}
          type="audio/mp3"
        ></audio>
      </View>
    )
  );
};

export default Player;
