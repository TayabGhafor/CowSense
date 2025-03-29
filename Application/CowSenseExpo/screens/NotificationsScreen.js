// screens/NotificationsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from '../utils/scale';

// Mock notifications
const notifications = [
  { id: '1', message: 'New prediction available for your cattle.', time: '2 mins ago' },
  { id: '2', message: 'System update completed.', time: '1 hour ago' },
  { id: '3', message: 'Feedback received from veterinarian.', time: '3 hours ago' },
];

const NotificationsScreen = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(true);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <Modal transparent visible={showPopup} animationType="fade">
      <View style={styles.popupOverlay}>
        <View style={styles.popupContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <TouchableOpacity onPress={() => setShowPopup(false)}>
              <MaterialIcons name="close" size={moderateScale(24)} color="#000" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    width: '80%',
    maxHeight: '50%',
    padding: moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  notificationItem: {
    paddingVertical: verticalScale(10),
  },
  notificationMessage: {
    fontSize: scale(14),
    color: '#000',
  },
  notificationTime: {
    fontSize: scale(12),
    color: '#666',
    marginTop: verticalScale(5),
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});

export default NotificationsScreen;