import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title?: string;
  className?: string;
  textClassName?: string;
}

export default function Button(props: ButtonProps) {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable className={props.className} onPress={onPress}>
      <Text className={props.textClassName}>{title}</Text>
    </Pressable>
  );
}
