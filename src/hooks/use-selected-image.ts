import { useState } from "react";

interface SelectedImage {
  selectedImage: string | undefined;
  width: number;
  height: number;
}

export function useSelectedImage() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage>();

  return { selectedImage, setSelectedImage };
}
