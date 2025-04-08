// screens/NotificationDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const NotificationDetailsScreen = ({ route, navigation }) => {
  const { notification } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Notification Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.message}>{notification.message}</Text>
        <Text style={styles.type}>{notification.type}</Text>
        <Text style={styles.time}>{notification.time}</Text>
        {notification.file && (
          <Text style={styles.file}>File: {notification.file}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(40),
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(40),
    left: moderateScale(20),
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  detailContainer: {
    padding: moderateScale(20),
    backgroundColor: '#f0f0f0',
    borderRadius: moderateScale(10),
  },
  message: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  type: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(5),
  },
  time: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(5),
  },
  file: {
    fontSize: scale(14),
    color: '#1e88e5',
  },
});

export default NotificationDetailsScreen;