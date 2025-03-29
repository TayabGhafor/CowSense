// screens/ProfileDetailsScreen.js
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
import CustomToast from '../components/CustomToast';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const ProfileDetailsScreen = ({ navigation }) => {
  // Fetch user data from global.users
  const user = global.users.find((u) => u.email === global.currentUserEmail) || {};
  const [profileImage, setProfileImage] = useState(user.profileImage || null);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [age, setAge] = useState(user.age || '');
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || '');
  const [gender, setGender] = useState(user.gender || '');
  const [phone, setPhone] = useState(user.phone || global.userPhone || '');
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isAgeEditable, setIsAgeEditable] = useState(false);
  const [isDateOfBirthEditable, setIsDateOfBirthEditable] = useState(false);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const userIndex = global.users.findIndex((u) => u.email === email);
    if (userIndex !== -1) {
      global.users[userIndex] = {
        ...global.users[userIndex],
        profileImage,
        name,
        age,
        dateOfBirth,
        gender,
      };
    }

    setShowToast(true);
    setIsNameEditable(false);
    setIsAgeEditable(false);
    setIsDateOfBirthEditable(false);
  };

  const handleLogout = () => {
    setShowLogoutPopup(false);
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setShowDone(true);
      setTimeout(() => {
        setShowDone(false);
        global.isFirstLogin = false;
        navigation.replace('Login');
      }, 1000);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Modal transparent visible={showLogoutPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupTitle}>Are you sure you want to log out?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.optionButton, styles.cancelButton]}
                onPress={() => setShowLogoutPopup(false)}
              >
                <Text style={styles.optionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Text style={styles.optionText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={showLoader || showDone} animationType="fade">
        <View style={styles.loaderOverlay}>
          {showLoader ? (
            <ActivityIndicator size="large" color="#d32f2f" />
          ) : (
            <MaterialIcons name="check" size={moderateScale(60)} color="#d32f2f" />
          )}
        </View>
      </Modal>

      <CustomToast
        visible={showToast}
        message="Profile Updated Successfully!"
        type="success"
        onClose={() => setShowToast(false)}
      />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Profile Details</Text>

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
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={isNameEditable}
        />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => setIsNameEditable(!isNameEditable)}
        >
          <MaterialIcons name="edit" size={moderateScale(20)} color="#666" />
        </TouchableOpacity>
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
          editable={isAgeEditable}
        />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => setIsAgeEditable(!isAgeEditable)}
        >
          <MaterialIcons name="edit" size={moderateScale(20)} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="calendar-today" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="date of birth (DD/MM/YYYY)"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          editable={isDateOfBirthEditable}
        />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => setIsDateOfBirthEditable(!isDateOfBirthEditable)}
        >
          <MaterialIcons name="edit" size={moderateScale(20)} color="#666" />
        </TouchableOpacity>
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
        <MaterialIcons name="phone" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput style={styles.input} value={phone} editable={false} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.settingsButton]}
          onPress={() => navigation.navigate('Settings')}
        >
          <MaterialIcons name="settings" size={moderateScale(24)} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.logoutButton]}
          onPress={() => setShowLogoutPopup(true)}
        >
          <MaterialIcons name="logout" size={moderateScale(24)} color="#fff" />
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
  editIcon: {
    marginLeft: moderateScale(10),
    padding: moderateScale(5),
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
  saveButton: {
    backgroundColor: '#d32f2f',
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  saveText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    width: '48%',
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    alignItems: 'center',
  },
  settingsButton: {
    backgroundColor: '#e0e0e0',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
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
  popupTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  optionButton: {
    flex: 1,
    padding: moderateScale(10),
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    borderTopLeftRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    borderTopRightRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  optionText: {
    fontSize: scale(14),
    color: '#fff',
  },
  loaderOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileDetailsScreen;