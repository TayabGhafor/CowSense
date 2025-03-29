// screens/CameraScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Screen</Text>
      <Text style={styles.subtitle}>This is a placeholder for the Camera screen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(20),
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: scale(14),
    color: '#666',
  },
});

export default CameraScreen;