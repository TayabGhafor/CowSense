// components/NotificationPopup.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_WIDTH = SCREEN_WIDTH * 0.7; // 70% of screen width

// Mock notifications with avatars and actions
const notifications = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    message: 'Tom added new video',
    time: '12 minutes ago',
    type: 'New post',
    action: null,
  },
  {
    id: '2',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    message: 'Tom left comments for you',
    time: '27 minutes ago',
    type: 'New comment',
    action: null,
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    message: 'Anna has applied to create an ad for your campaign',
    time: '2 hours ago',
    type: 'New request for campaign',
    action: { decline: 'Decline', accept: 'Accept' },
  },
  {
    id: '4',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    message: 'Jason attached the file',
    time: '6 hours ago',
    type: 'Attached files',
    file: 'Work examples.pdf',
    action: null,
  },
];

const NotificationPopup = ({ visible, onClose, navigation }) => {
  const translateX = useSharedValue(-PANEL_WIDTH);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    if (visible) {
      translateX.value = withTiming(0, { duration: 300 });
    } else {
      translateX.value = withTiming(-PANEL_WIDTH, { duration: 300 });
    }
  }, [visible]);

  const handleAction = (action, notification) => {
    console.log(`${action} clicked for notification: ${notification.message}`);
    // Implement action logic here (e.g., API call to accept/decline)
  };

  const handleNotificationPress = (notification) => {
    onClose();
    navigation.navigate('NotificationDetails', { notification });
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity onPress={() => handleNotificationPress(item)}>
      <View style={styles.notificationItem}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationType}>{item.type}</Text>
          {item.file && (
            <View style={styles.fileContainer}>
              <MaterialIcons name="attach-file" size={moderateScale(16)} color="#fff" />
              <Text style={styles.fileName}>{item.file}</Text>
            </View>
          )}
          <Text style={styles.notificationTime}>{item.time}</Text>
          {item.action && (
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.declineButton]}
                onPress={() => handleAction('Decline', item)}
              >
                <Text style={styles.actionText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => handleAction('Accept', item)}
              >
                <Text style={styles.actionText}>Accept</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.unreadDot} />
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.popupOverlay}>
          <Animated.View style={[styles.popupContainer, animatedStyle]}>
            <BlurView style={styles.blurView} blurType="light" blurAmount={10} />
            <View style={styles.header}>
              <Text style={styles.title}>Notifications</Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name="close" size={moderateScale(24)} color="#fff" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={notifications}
              renderItem={renderNotification}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            <TouchableOpacity style={styles.markAllRead}>
              <Text style={styles.markAllReadText}>Mark all as read</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: PANEL_WIDTH,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background for blur
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: moderateScale(10),
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: scale(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationType: {
    fontSize: scale(12),
    color: '#ccc',
    marginTop: verticalScale(2),
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  fileName: {
    fontSize: scale(12),
    color: '#ccc',
    marginLeft: moderateScale(5),
  },
  notificationTime: {
    fontSize: scale(12),
    color: '#ccc',
    marginTop: verticalScale(5),
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: verticalScale(5),
  },
  actionButton: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(5),
    marginLeft: moderateScale(10),
  },
  declineButton: {
    backgroundColor: '#e0e0e0',
  },
  acceptButton: {
    backgroundColor: '#1e88e5',
  },
  actionText: {
    fontSize: scale(12),
    color: '#fff',
  },
  unreadDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#1e88e5',
    marginLeft: moderateScale(10),
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  markAllRead: {
    alignItems: 'center',
    padding: moderateScale(10),
  },
  markAllReadText: {
    fontSize: scale(14),
    color: '#1e88e5',
  },
});

export default NotificationPopup;