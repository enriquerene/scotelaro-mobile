import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  verticalSpacing?: number;
  horizontalSpacing?: number;
}

const Logo: React.FC<LogoProps> = ({
  width = 200,
  height = 200,
  verticalSpacing = 10,
  horizontalSpacing = 10,
}) => {
  return (
    <View style={[style.container, { marginHorizontal: horizontalSpacing, marginVertical: verticalSpacing }]}>
      <Image
        source={require('../images/logo.png')}
        style={{
          width: width,
          height: height,
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logo;
