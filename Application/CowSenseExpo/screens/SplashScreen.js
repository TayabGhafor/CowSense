import React, { useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/splash-bg.jpeg')} // Replace with your background image
      style={styles.background}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/icon.png')} // Replace with your logo
          style={styles.logo}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: 'white',
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  logo: {
    width: scale(120),
    height: verticalScale(60),
    resizeMode: 'contain',
  },
});

export default SplashScreen;