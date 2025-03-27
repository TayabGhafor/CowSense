import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const CustomToast = ({ visible, message, type, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View
      style={[
        styles.container,
        type === 'success' ? styles.success : styles.error,
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: verticalScale(40),
    left: moderateScale(20),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    zIndex: 1000,
  },
  success: {
    backgroundColor: '#e0ffe0',
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  error: {
    backgroundColor: '#ffe0e0',
    borderWidth: 1,
    borderColor: '#ff0000',
  },
  message: {
    color: '#fff',
    fontSize: scale(14),
    fontWeight: 'bold',
  },
});

export default CustomToast;