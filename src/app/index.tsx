import { Text, View, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import ImageViewer from "../components/image-viewer";


export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-[#25292e]">
      <View className="flex-1 pt-[58px]">
        <ImageViewer placeholderImageSource={require("../../assets/images/background-image.png")} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
