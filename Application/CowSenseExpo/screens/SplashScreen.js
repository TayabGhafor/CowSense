import React, { useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
});

export default SplashScreen;