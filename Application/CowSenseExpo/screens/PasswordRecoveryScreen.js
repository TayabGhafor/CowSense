import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CustomToast from '../components/CustomToast';
import PasswordInfoPopup from '../components/PasswordInfoPopup';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const PasswordRecoveryScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);
  const [showConfirmEyeIcon, setShowConfirmEyeIcon] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Timer for password visibility
  useEffect(() => {
    if (showPassword) {
      const timer = setTimeout(() => {
        setShowPassword(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showPassword]);

  useEffect(() => {
    if (showConfirmPassword) {
      const timer = setTimeout(() => {
        setShowConfirmPassword(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmPassword]);

  // Password validation
  const isValidPassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    return passwordRegex.test(password);
  };

  const doPasswordsMatch = () => {
    return password === confirmPassword && password.length > 0;
  };

  const handleResetPassword = () => {
    if (!isValidPassword() || !doPasswordsMatch()) {
      return;
    }

    // Mock password reset
    console.log('Password reset to:', password);

    // Show success toast and navigate to Login after 3 seconds
    setShowToast(true);
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {/* Success Toast */}
      <CustomToast
        visible={showToast}
        message="Password Reset Successfully"
        type="success"
        onClose={() => setShowToast(false)}
      />

      {/* Password Info Popup */}
      <PasswordInfoPopup
        visible={showPasswordInfo}
        onClose={() => setShowPasswordInfo(false)}
      />

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.subtitle}>
        Your new password must be different from your previously used passwords.
      </Text>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setShowEyeIcon(text.length > 0);
          }}
          secureTextEntry={!showPassword}
          selectTextOnFocus={false}
          contextMenuHidden={true}
        />
        {showEyeIcon ? (
          <TouchableOpacity
            style={styles.infoIcon}
            onPress={() => setShowPassword(true)}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={moderateScale(20)}
              color="#666"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.infoIcon}
            onPress={() => setShowPasswordInfo(true)}
          >
            <Text style={styles.infoIconText}>i</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Confirm Password Input */}
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
          <TouchableOpacity
            style={styles.infoIcon}
            onPress={() => setShowConfirmPassword(true)}
          >
            <MaterialIcons
              name={showConfirmPassword ? 'visibility' : 'visibility-off'}
              size={moderateScale(20)}
              color="#666"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.infoIcon}
            onPress={() => setShowPasswordInfo(true)}
          >
            <Text style={styles.infoIconText}>i</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Reset Password Button */}
      <TouchableOpacity
        style={[
          styles.resetButton,
          { opacity: isValidPassword() && doPasswordsMatch() ? 1 : 0.5 },
        ]}
        onPress={handleResetPassword}
        disabled={!(isValidPassword() && doPasswordsMatch())}
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