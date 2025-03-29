// screens/PasswordRecoveryScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CustomAlert from '../components/CustomAlert';
import CustomToast from '../components/CustomToast';
import PasswordInfoPopup from '../components/PasswordInfoPopup';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const PasswordRecoveryScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewEyeIcon, setShowNewEyeIcon] = useState(false);
  const [showConfirmEyeIcon, setShowConfirmEyeIcon] = useState(false);

  const isValidPassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    return passwordRegex.test(newPassword);
  };

  const passwordsMatch = () => {
    return newPassword === confirmPassword;
  };

  const handleResetPassword = () => {
    if (!isValidPassword()) {
      setShowAlert(true);
      return;
    }

    if (!passwordsMatch()) {
      setShowAlert(true);
      return;
    }

    // Update password in global.users
    const userIndex = global.users.findIndex((u) => u.email === email);
    if (userIndex !== -1) {
      global.users[userIndex].password = newPassword;
    }

    setShowToast(true);
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={showAlert}
        title="Invalid Input"
        message={
          !isValidPassword()
            ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be 8-15 characters long.'
            : 'Passwords do not match.'
        }
        onClose={() => setShowAlert(false)}
        onConfirm={() => setShowAlert(false)}
      />

      <CustomToast
        visible={showToast}
        message="Password Reset Successfully!"
        type="success"
        onClose={() => setShowToast(false)}
      />

      <PasswordInfoPopup visible={showPasswordInfo} onClose={() => setShowPasswordInfo(false)} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#000" />
      </TouchableOpacity>

      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your new password below.</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="new password"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setShowNewEyeIcon(text.length > 0);
          }}
          secureTextEntry={!showNewPassword}
          selectTextOnFocus={false}
          contextMenuHidden={true}
        />
        {showNewEyeIcon ? (
          <TouchableOpacity style={styles.infoIcon} onPress={() => setShowNewPassword(true)}>
            <MaterialIcons
              name={showNewPassword ? 'visibility' : 'visibility-off'}
              size={moderateScale(20)}
              color="#666"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.infoIcon} onPress={() => setShowPasswordInfo(true)}>
            <Text style={styles.infoIconText}>i</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setShowConfirmEyeIcon(text.length > 0);
          }}
          secureTextEntry={!showConfirmPassword}
          selectTextOnFocus={false}
          contextMenuHidden={true}
        />
        {showConfirmEyeIcon ? (
          <TouchableOpacity style={styles.infoIcon} onPress={() => setShowConfirmPassword(true)}>
            <MaterialIcons
              name={showConfirmPassword ? 'visibility' : 'visibility-off'}
              size={moderateScale(20)}
              color="#666"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.infoIcon} onPress={() => setShowPasswordInfo(true)}>
            <Text style={styles.infoIconText}>i</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.resetButton, { opacity: isValidPassword() && passwordsMatch() ? 1 : 0.5 }]}
        onPress={handleResetPassword}
        disabled={!(isValidPassword() && passwordsMatch())}
      >
        <Text style={styles.resetText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(20),
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(40),
    left: moderateScale(20),
  },
  logo: {
    width: scale(120),
    height: verticalScale(60),
    resizeMode: 'contain',
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(14),
    color: '#666',
    textAlign: 'center',
    marginVertical: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(10),
    width: '80%',
  },
  icon: {
    marginRight: moderateScale(10),
  },
  input: {
    flex: 1,
    padding: moderateScale(10),
    fontSize: scale(14),
  },
  infoIcon: {
    marginLeft: moderateScale(10),
    padding: moderateScale(5),
  },
  infoIconText: {
    fontSize: scale(14),
    color: '#666',
    fontStyle: 'italic',
  },
  resetButton: {
    backgroundColor: '#d32f2f',
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    width: '80%',
    alignItems: 'center',
  },
  resetText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});

export default PasswordRecoveryScreen;