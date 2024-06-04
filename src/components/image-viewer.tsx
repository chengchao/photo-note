import { StyleSheet, Image, Dimensions } from "react-native";

interface ImageViewerProps {
  placeholderImageSource: any;
  selectedImage?: string | undefined;
  width: number;
  height: number;
}

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
  width,
  height,
}: ImageViewerProps) {
  const screenWidth = Dimensions.get("window").width;
  // Calculate the aspect ratio of the image
  const aspectRatio = width / height;
  // Calculate the new height based on the screen width and the aspect ratio
  const newHeight = screenWidth / aspectRatio;

  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;
  // return <Image source={imageSource} style={{ width, height }} />;
  return (
    <Image
      source={imageSource}
      style={{ width: screenWidth, height: newHeight, resizeMode: "contain" }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 18,
  },
});
