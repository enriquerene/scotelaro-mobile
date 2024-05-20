import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LinkProps {
  handlePress: () => void;
  text: string;
}

const Link: React.FC<LinkProps> = ({ text, handlePress }) => {
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={style.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default Link;
