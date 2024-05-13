import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LinkProps {
  to: string;
  text: string;
}

const Link: React.FC<LinkProps> = ({ text, to }) => {
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.navigate(to)}>
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
