// screens/AIAssistantScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import NotificationPopup from '../components/NotificationPopup';
import { scale, verticalScale, moderateScale } from '../utils/scale';
import { useNavigationContext } from '../context/NavigationContext';

const AIAssistantScreen = ({ navigation, route }) => {
  const { activeTab, updateActiveTab } = useNavigationContext();
  const [showNotifications, setShowNotifications] = useState(false);

  const dashboardScale = useSharedValue(1);
  const aiAssistantScale = useSharedValue(1);
  const liveMonitoringScale = useSharedValue(1);
  const chatScale = useSharedValue(1);
  const profileScale = useSharedValue(1);

  const animatedDashboardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(dashboardScale.value) }],
      backgroundColor: withTiming(activeTab.farmer === 'Dashboard' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  const animatedAIAssistantStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(aiAssistantScale.value) }],
      backgroundColor: withTiming(activeTab.farmer === 'AIAssistant' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  const animatedLiveMonitoringStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(liveMonitoringScale.value) }],
      backgroundColor: withTiming(activeTab.farmer === 'LiveMonitoring' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  const animatedChatStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(chatScale.value) }],
      backgroundColor: withTiming(activeTab.farmer === 'Chat' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  const animatedProfileStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(profileScale.value) }],
      backgroundColor: withTiming(activeTab.farmer === 'Profile' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  useEffect(() => {
    if (route.params?.activeTab) {
      updateActiveTab('farmer', route.params.activeTab);
    }
  }, [route.params?.activeTab]);

  const handleTabPress = (tab, scaleValue, route) => {
    updateActiveTab('farmer', tab);
    scaleValue.value = 1.2;
    if (route) {
      navigation.navigate(route, { activeTab: tab, role: 'farmer' });
    }
  };

  return (
    <View style={styles.container}>
      <NotificationPopup
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        navigation={navigation}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>AI Assistant</Text>
        <TouchableOpacity onPress={() => setShowNotifications(true)}>
          <MaterialIcons name="notifications" size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>AI-powered chatbot for disease detection, treatment suggestions, and farming tips.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Chat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => handleTabPress('Dashboard', dashboardScale, 'FarmerHome')}
        >
          <Animated.View style={[styles.navItem, animatedDashboardStyle]}>
            <MaterialIcons
              name="home"
              size={moderateScale(24)}
              color={activeTab.farmer === 'Dashboard' ? '#fff' : '#666'}
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress('AIAssistant', aiAssistantScale, 'AIAssistant')}
        >
          <Animated.View style={[styles.navItem, animatedAIAssistantStyle]}>
            <MaterialIcons
              name="smart-toy"
              size={moderateScale(24)}
              color={activeTab.farmer === 'AIAssistant' ? '#fff' : '#666'}
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress('LiveMonitoring', liveMonitoringScale, 'LiveMonitoring')}
        >
          <Animated.View style={[styles.navItem, animatedLiveMonitoringStyle]}>
            <MaterialIcons
              name="sensors"
              size={moderateScale(24)}
              color={activeTab.farmer === 'LiveMonitoring' ? '#fff' : '#666'}
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress('Chat', chatScale, 'Chat')}
        >
          <Animated.View style={[styles.navItem, animatedChatStyle]}>
            <MaterialIcons
              name="chat"
              size={moderateScale(24)}
              color={activeTab.farmer === 'Chat' ? '#fff' : '#666'}
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress('Profile', profileScale, 'ProfileDetails')}
        >
          <Animated.View style={[styles.navItem, animatedProfileStyle]}>
            <MaterialIcons
              name="person"
              size={moderateScale(24)}
              color={activeTab.farmer === 'Profile' ? '#fff' : '#666'}
            />
          </Animated.View>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: scale(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  button: {
    backgroundColor: '#1e88e5',
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
  },
  buttonText: {
    fontSize: scale(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: verticalScale(15),
    backgroundColor: '#000',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  navItem: {
    padding: moderateScale(10),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AIAssistantScreen;