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
import EmailInfoPopup from '../components/EmailInfoPopup';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  // Email validation
  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ['@gmail.com', '@yahoo.com'];
    return emailRegex.test(email) && validDomains.some((domain) => email.endsWith(domain));
  };

  const handleSendCode = () => {
    if (!isValidEmail()) {
      setShowAlert(true);
      return;
    }

    // Mock the API call to check if the user exists
    // Later, we'll integrate with Firebase to verify the email
    console.log('Sending code to:', email);

    // Navigate to EnterCodeScreen with the email
    navigation.navigate('EnterCode', { email });
  };

  return (
    <View style={styles.container}>
      {/* Custom Alert for Invalid Email */}
      <CustomAlert
        visible={showAlert}
        title="Invalid Email"
        message="Please enter a valid email address ending with @gmail.com or @yahoo.com."
        onClose={() => setShowAlert(false)}
        onConfirm={() => setShowAlert(false)}
      />

      {/* Email Info Popup */}
      <EmailInfoPopup
        visible={showEmailInfo}
        onClose={() => setShowEmailInfo(false)}
      />

      <Image
        source={require('../assets/icon.png')} // Replace with your logo
        style={styles.logo}
      />
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email, We will send you a verification code.
      </Text>

      {/* Email Input with Info Icon */}
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="email"
          size={moderateScale(20)}
          color="#666"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.infoIcon}
          onPress={() => setShowEmailInfo(true)}
        >
          <Text style={styles.infoIconText}>i</Text>
        </TouchableOpacity>
      </View>

      {/* Send Code Button */}
      <TouchableOpacity
        style={[
          styles.sendCodeButton,
          { opacity: isValidEmail() ? 1 : 0.5 },
        ]}
        onPress={handleSendCode}
        disabled={!isValidEmail()}
      >
        <Text style={styles.sendCodeText}>Send Code</Text>
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
  sendCodeButton: {
    backgroundColor: '#d32f2f',
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    width: '80%',
    alignItems: 'center',
  },
  sendCodeText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;