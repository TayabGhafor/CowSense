// screens/FarmerHomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import NotificationPopup from '../components/NotificationPopup';
import { scale, verticalScale, moderateScale } from '../utils/scale';
import { useNavigationContext } from '../context/NavigationContext';

const FarmerHomeScreen = ({ navigation, route }) => {
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
      navigation.navigate(route, { activeTab: tab });
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
        <Text style={styles.title}>Rancher’s Homepage</Text>
        <TouchableOpacity onPress={() => setShowNotifications(true)}>
          <MaterialIcons name="notifications" size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={moderateScale(20)} color="#666" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="search" />
      </View>

      <ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Looking for Special Features?</Text>
          <Text style={styles.bannerSubtitle}>Machine learning system is here to help you out.</Text>
        </View>

        <View style={styles.featuresHeader}>
          <Text style={styles.featuresTitle}>Features:</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>see all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <TouchableOpacity style={[styles.featureButton, styles.greenButton]}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="medical-services" size={moderateScale(24)} color="#fff" />
            </View>
            <Text style={styles.featureText}>view prediction</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.featureButton, styles.yellowButton]}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="psychology" size={moderateScale(24)} color="#fff" />
            </View>
            <Text style={styles.featureText}>generate prediction</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  searchIcon: {
    marginRight: moderateScale(10),
  },
  searchInput: {
    flex: 1,
    padding: moderateScale(10),
    fontSize: scale(14),
  },
  banner: {
    backgroundColor: '#d32f2f',
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    marginBottom: verticalScale(20),
  },
  bannerTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: scale(14),
    color: '#fff',
  },
  featuresHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  featuresTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: scale(14),
    color: '#1e88e5',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureButton: {
    width: '48%',
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  greenButton: {
    backgroundColor: '#2e7d32',
  },
  yellowButton: {
    backgroundColor: '#ffb300',
  },
  iconCircle: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  featureText: {
    fontSize: scale(14),
    color: '#fff',
    textAlign: 'center',
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

export default FarmerHomeScreen;