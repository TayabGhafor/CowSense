// screens/ProfileSetupScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import CountryPicker from 'react-native-country-picker-modal';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const ProfileSetupScreen = ({ navigation, route }) => {
  const { name, email, role } = route.params;
  const [profileImage, setProfileImage] = useState(null);
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('PK');
  const [countryCallingCode, setCountryCallingCode] = useState('+92');
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.photo,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleCountrySelect = (country) => {
    setCountryCode(country.cca2);
    setCountryCallingCode(`+${country.callingCode[0]}`);
    setPhone('');
  };

  const isValidPhone = () => {
    const phoneWithoutCode = phone.replace(countryCallingCode, '').replace(/\s/g, '');
    switch (countryCode) {
      case 'PK':
      case 'US':
      case 'CA':
      case 'IN':
      case 'GB':
        return /^\d{10}$/.test(phoneWithoutCode);
      case 'AU':
        return /^\d{9}$/.test(phoneWithoutCode);
      default:
        return /^\d{9,11}$/.test(phoneWithoutCode);
    }
  };

  const handleSave = () => {
    if (!age || !dateOfBirth || !gender || !isValidPhone()) {
      alert('Please fill all fields correctly.');
      return;
    }

    global.userPhone = `${countryCallingCode}${phone.replace(/\s/g, '')}`;

    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigation.replace(role === 'veterinarian' ? 'VetHome' : 'FarmerHome');
      }, 2000);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Modal transparent visible={showLoader} animationType="fade">
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#d32f2f" />
        </View>
      </Modal>

      <Modal transparent visible={showSuccessPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.checkCircle}>
              <MaterialIcons name="check" size={moderateScale(40)} color="#fff" />
            </View>
            <Text style={styles.popupTitle}>CONGRATULATIONS!</Text>
            <Text style={styles.popupMessage}>
              Your account is ready to use. You will be directed to the Home Page in a few seconds
            </Text>
            <ActivityIndicator size="small" color="#666" style={styles.popupLoader} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Fill Your Profile</Text>

      <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialIcons name="add" size={moderateScale(40)} color="#000" />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput style={styles.input} value={name} editable={false} />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput style={styles.input} value={email} editable={false} />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="cake" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="enter your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="calendar-today" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="date of birth (DD/MM/YYYY)"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
      </View>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowGenderPicker(!showGenderPicker)}
      >
        <MaterialIcons name="person-outline" size={moderateScale(20)} color="#666" style={styles.icon} />
        <Text style={[styles.input, gender ? styles.inputText : styles.placeholderText]}>
          {gender || 'gender'}
        </Text>
        <MaterialIcons
          name={showGenderPicker ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={moderateScale(20)}
          color="#666"
          style={styles.icon}
        />
      </TouchableOpacity>
      {showGenderPicker && (
        <View style={styles.genderPicker}>
          <TouchableOpacity onPress={() => { setGender('Male'); setShowGenderPicker(false); }}>
            <Text style={styles.genderOption}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setGender('Female'); setShowGenderPicker(false); }}>
            <Text style={styles.genderOption}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setGender('Other'); setShowGenderPicker(false); }}>
            <Text style={styles.genderOption}>Other</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <CountryPicker
          withFilter
          withCallingCode
          withFlag
          onSelect={handleCountrySelect}
          countryCode={countryCode}
          containerButtonStyle={styles.countryPicker}
        />
        <View style={styles.phoneInputContainer}>
          <Text style={styles.callingCode}>{countryCallingCode}</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="phone number"
            placeholderTextColor="#666"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={countryCode === 'AU' ? 9 : 11}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, { opacity: age && dateOfBirth && gender && isValidPhone() ? 1 : 0.5 }]}
        onPress={handleSave}
        disabled={!(age && dateOfBirth && gender && isValidPhone())}
      >
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
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
  imageContainer: {
    alignSelf: 'center',
    marginBottom: verticalScale(20),
  },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
  },
  placeholderImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(10),
    width: '100%',
  },
  icon: {
    marginRight: moderateScale(10),
  },
  input: {
    flex: 1,
    padding: moderateScale(10),
    fontSize: scale(14),
  },
  inputText: {
    color: '#000',
  },
  placeholderText: {
    color: '#666',
  },
  genderPicker: {
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginBottom: verticalScale(15),
  },
  genderOption: {
    fontSize: scale(14),
    paddingVertical: verticalScale(5),
  },
  countryPicker: {
    marginRight: moderateScale(10),
  },
  phoneInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
  callingCode: {
    fontSize: scale(14),
    color: '#666',
    marginRight: moderateScale(5),
  },
  phoneInput: {
    flex: 1,
    padding: moderateScale(10),
    fontSize: scale(14),
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#d32f2f',
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    width: '100%',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  loaderOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    width: '80%',
    alignItems: 'center',
  },
  checkCircle: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  popupTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  popupMessage: {
    fontSize: scale(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  popupLoader: {
    marginTop: verticalScale(10),
  },
});

export default ProfileSetupScreen;