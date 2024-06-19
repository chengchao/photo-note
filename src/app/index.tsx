import "react-native-polyfill-globals/auto";

import { SafeAreaView, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/ui/button";
import ImageViewer from "../components/image-viewer";
import { useSelectedImage } from "@/hooks/use-selected-image";
import * as FileSystem from "expo-file-system";

export default function Index() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not set");
  }

  const { selectedImage, setSelectedImage } = useSelectedImage();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      quality: 0,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage({
        selectedImage: result.assets[0].uri,
        width: result.assets[0].width,
        height: result.assets[0].height,
      });
    } else {
      alert("You did not select any image.");
    }
  };

  const sendImage = async (imageUri: string) => {
    try {
      // If there's an image, read it as base64
      let imageBase64 = null;
      if (imageUri) {
        imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }

      console.log(`Connect to API_URL: ${API_URL}`);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64,
        }),
        reactNative: { textStreaming: true },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      if (response.body === null) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        console.log(`value: ${value}, decoded: ${decoder.decode(value)}`);

        result += decoder.decode(value);
      }

      console.log("Result:", result);
      console.log("Stream ended");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <ScrollView>
        <ImageViewer
          placeholderImageSource={require("../../assets/images/placeholder.jpg")}
          selectedImage={selectedImage?.selectedImage}
          width={selectedImage?.width ?? 1000}
          height={selectedImage?.height ?? 1000}
        />
      </ScrollView>
      <View className="basis-1/3">
        <Button
          className=" bg-black px-8 py-3 rounded-lg mt-4"
          textClassName="text-white"
          onPress={pickImageAsync}
          title="Choose a photo"
        />
        <Button
          className=" bg-black px-8 py-3 rounded-lg mt-4"
          textClassName="text-white"
          onPress={() => {
            if (!selectedImage || !selectedImage.selectedImage) {
              alert("You did not select any image.");
              return;
            }
            sendImage(selectedImage.selectedImage);
          }}
          title="Send the photo"
        />
      </View>
    </SafeAreaView>
  );
}
