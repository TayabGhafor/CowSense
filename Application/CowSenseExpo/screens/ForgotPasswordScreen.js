import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import CustomAlert from '../components/CustomAlert';
import { MaterialIcons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Email validation
  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check
    const validDomains = ['@gmail.com', '@yahoo.com']; // Add more domains as needed
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

      <Image
        source={require('../assets/icon.png')} // Replace with your logo
        style={styles.logo}
      />
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email, We will send you a verification code.
      </Text>

      {/* Email Input */}
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