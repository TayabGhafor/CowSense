// screens/ProfileDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import NotificationPopup from '../components/NotificationPopup';
import { scale, verticalScale, moderateScale } from '../utils/scale';
import { useNavigationContext } from '../context/NavigationContext';

const ProfileDetailsScreen = ({ navigation, route }) => {
  const { activeTab, updateActiveTab } = useNavigationContext();
  const [showNotifications, setShowNotifications] = useState(false);

  const patientsScale = useSharedValue(1);
  const chatScale = useSharedValue(1);
  const appointmentsScale = useSharedValue(1);
  const profileScale = useSharedValue(1);
  const dashboardScale = useSharedValue(1);
  const aiAssistantScale = useSharedValue(1);
  const liveMonitoringScale = useSharedValue(1);

  const animatedPatientsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(patientsScale.value) }],
      backgroundColor: withTiming(activeTab.vet === 'Patients' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  const animatedChatStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(chatScale.value) }],
      backgroundColor: withTiming(activeTab.vet === 'Chat' || activeTab.farmer === 'Chat' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  const animatedAppointmentsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(appointmentsScale.value) }],
      backgroundColor: withTiming(activeTab.vet === 'Appointments' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  const animatedProfileStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(profileScale.value) }],
      backgroundColor: withTiming(activeTab.vet === 'Profile' || activeTab.farmer === 'Profile' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

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

  useEffect(() => {
    if (route.params?.activeTab) {
      const role = route.params?.role || 'farmer'; // Default to farmer if role not specified
      updateActiveTab(role, route.params.activeTab);
    }
  }, [route.params?.activeTab]);

  const handleTabPress = (tab, scaleValue, route, role) => {
    updateActiveTab(role, tab);
    scaleValue.value = 1.2;
    if (route) {
      navigation.navigate(route, { activeTab: tab, role });
    }
  };

  const role = route.params?.role || 'farmer'; // Default to farmer if role not specified

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
        <Text style={styles.title}>Profile Details</Text>
        <TouchableOpacity onPress={() => setShowNotifications(true)}>
          <MaterialIcons name="notifications" size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={moderateScale(60)} color="#666" />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.role}>{role === 'farmer' ? 'Rancher/Farmer' : 'Veterinarian'}</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value="John Doe"
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value="john.doe@example.com"
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value="+1 123-456-7890"
            editable={false}
          />
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>Go to Settings</Text>
        </TouchableOpacity>
      </ScrollView>

      {role === 'farmer' ? (
        <View style={styles.bottomNav}>
          <TouchableOpacity
            onPress={() => handleTabPress('Dashboard', dashboardScale, 'FarmerHome', 'farmer')}
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
            onPress={() => handleTabPress('AIAssistant', aiAssistantScale, 'AIAssistant', 'farmer')}
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
            onPress={() => handleTabPress('LiveMonitoring', liveMonitoringScale, 'LiveMonitoring', 'farmer')}
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
            onPress={() => handleTabPress('Chat', chatScale, 'Chat', 'farmer')}
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
            onPress={() => handleTabPress('Profile', profileScale, 'ProfileDetails', 'farmer')}
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
      ) : (
        <View style={styles.bottomNav}>
          <TouchableOpacity
            onPress={() => handleTabPress('Patients', patientsScale, 'Patients', 'vet')}
          >
            <Animated.View style={[styles.navItem, animatedPatientsStyle]}>
              <MaterialIcons
                name="pets"
                size={moderateScale(24)}
                color={activeTab.vet === 'Patients' ? '#fff' : '#666'}
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabPress('Chat', chatScale, 'Chat', 'vet')}
          >
            <Animated.View style={[styles.navItem, animatedChatStyle]}>
              <MaterialIcons
                name="chat"
                size={moderateScale(24)}
                color={activeTab.vet === 'Chat' ? '#fff' : '#666'}
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabPress('Appointments', appointmentsScale, 'Appointments', 'vet')}
          >
            <Animated.View style={[styles.navItem, animatedAppointmentsStyle]}>
              <MaterialIcons
                name="calendar-today"
                size={moderateScale(24)}
                color={activeTab.vet === 'Appointments' ? '#fff' : '#666'}
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabPress('Profile', profileScale, 'ProfileDetails', 'vet')}
          >
            <Animated.View style={[styles.navItem, animatedProfileStyle]}>
              <MaterialIcons
                name="person"
                size={moderateScale(24)}
                color={activeTab.vet === 'Profile' ? '#fff' : '#666'}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      )}
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
  profileSection: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  avatarContainer: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  name: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  role: {
    fontSize: scale(14),
    color: '#666',
  },
  formSection: {
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginBottom: verticalScale(10),
    fontSize: scale(14),
  },
  settingsButton: {
    backgroundColor: '#1e88e5',
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    alignItems: 'center',
  },
  settingsText: {
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

export default ProfileDetailsScreen;