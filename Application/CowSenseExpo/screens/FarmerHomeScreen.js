// screens/FarmerHomeScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const FarmerHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rancher’s Homepage</Text>
        <TouchableOpacity>
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

        <Text style={styles.featuresTitle}>Features:</Text>

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
        <TouchableOpacity>
          <MaterialIcons name="home" size={moderateScale(24)} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="camera-alt" size={moderateScale(24)} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="person" size={moderateScale(24)} color="#666" />
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
  featuresTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
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
    paddingVertical: verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default FarmerHomeScreen;