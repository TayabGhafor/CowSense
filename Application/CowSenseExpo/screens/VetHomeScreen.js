// screens/VetHomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import NotificationPopup from '../components/NotificationPopup';
import { scale, verticalScale, moderateScale } from '../utils/scale';
import { useNavigationContext } from '../context/NavigationContext';

const VetHomeScreen = ({ navigation, route }) => {
  const { activeTab, updateActiveTab } = useNavigationContext();
  const [showNotifications, setShowNotifications] = useState(false);

  const patientsScale = useSharedValue(1);
  const chatScale = useSharedValue(1);
  const appointmentsScale = useSharedValue(1);
  const profileScale = useSharedValue(1);

  const animatedPatientsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(patientsScale.value) }],
      backgroundColor: withTiming(activeTab.vet === 'Patients' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  const animatedChatStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(chatScale.value) }],
      backgroundColor: withTiming(activeTab.vet === 'Chat' ? '#ff9800' : 'transparent', { duration: 300 }),
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
      backgroundColor: withTiming(activeTab.vet === 'Profile' ? '#ff9800' : 'transparent', { duration: 300 }),
    };
  });

  useEffect(() => {
    if (route.params?.activeTab) {
      updateActiveTab('vet', route.params.activeTab);
    }
  }, [route.params?.activeTab]);

  const handleTabPress = (tab, scaleValue, route) => {
    updateActiveTab('vet', tab);
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
        <Text style={styles.title}>Veterinarian’s Homepage</Text>
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
          <TouchableOpacity style={[styles.featureButton, styles.brownButton]}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="list" size={moderateScale(24)} color="#fff" />
            </View>
            <Text style={styles.featureText}>view disease list</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.featureButton, styles.yellowButton]}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="psychology" size={moderateScale(24)} color="#fff" />
            </View>
            <Text style={styles.featureText}>generate prediction</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.featureButton, styles.blueButton]}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="feedback" size={moderateScale(24)} color="#fff" />
            </View>
            <Text style={styles.featureText}>view feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => handleTabPress('Patients', patientsScale, 'Patients')}
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
          onPress={() => handleTabPress('Chat', chatScale, 'Chat')}
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
          onPress={() => handleTabPress('Appointments', appointmentsScale, 'Appointments')}
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
          onPress={() => handleTabPress('Profile', profileScale, 'ProfileDetails')}
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
  brownButton: {
    backgroundColor: '#8d6e63',
  },
  yellowButton: {
    backgroundColor: '#ffb300',
  },
  blueButton: {
    backgroundColor: '#0288d1',
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

export default VetHomeScreen;