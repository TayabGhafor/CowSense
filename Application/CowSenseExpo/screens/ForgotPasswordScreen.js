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
  const [method, setMethod] = useState('email'); // Email or SMS
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  // Email validation
  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ['@gmail.com', '@yahoo.com'];
    return emailRegex.test(email) && validDomains.some((domain) => email.endsWith(domain));
  };

  // Phone validation (basic: 10 digits)
  const isValidPhone = () => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSendCode = () => {
    if (method === 'email' && !isValidEmail()) {
      setShowAlert(true);
      return;
    }

    if (method === 'SMS' && !isValidPhone()) {
      setShowAlert(true);
      return;
    }

    // Mock the API call to send the code
    console.log(`Sending code via ${method} to:`, method === 'email' ? email : phone);

    // Navigate to EnterCodeScreen with the email/phone and method
    navigation.navigate('EnterCode', { email: method === 'email' ? email : phone, method });
  };

  return (
    <View style={styles.container}>
      {/* Custom Alert for Invalid Input */}
      <CustomAlert
        visible={showAlert}
        title="Invalid Input"
        message={
          method === 'email'
            ? 'Please enter a valid email address ending with @gmail.com or @yahoo.com.'
            : 'Please enter a valid 10-digit phone number.'
        }
        onClose={() => setShowAlert(false)}
        onConfirm={() => setShowAlert(false)}
      />

      {/* Email Info Popup */}
      <EmailInfoPopup
        visible={showEmailInfo}
        onClose={() => setShowEmailInfo(false)}
      />

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Select how you would like to receive your verification code.
      </Text>

      {/* Method Selection (Email or SMS) */}
      <View style={styles.methodContainer}>
        <TouchableOpacity
          style={[
            styles.methodButton,
            method === 'email' && styles.activeMethodButton,
            { borderTopLeftRadius: moderateScale(20), borderBottomLeftRadius: moderateScale(20) },
          ]}
          onPress={() => setMethod('email')}
        >
          <Text
            style={
              method === 'email'
                ? styles.activeMethodText
                : styles.methodText
            }
          >
            Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.methodButton,
            method === 'SMS' && styles.activeMethodButton,
            { borderTopRightRadius: moderateScale(20), borderBottomRightRadius: moderateScale(20) },
          ]}
          onPress={() => setMethod('SMS')}
        >
          <Text
            style={
              method === 'SMS' ? styles.activeMethodText : styles.methodText
            }
          >
            SMS
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Input Field (Email or Phone) */}
      {method === 'email' ? (
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
      ) : (
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="phone"
            size={moderateScale(20)}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
      )}

      {/* Send Code Button */}
      <TouchableOpacity
        style={[
          styles.sendCodeButton,
          {
            opacity:
              method === 'email'
                ? isValidEmail()
                  ? 1
                  : 0.5
                : isValidPhone()
                ? 1
                : 0.5,
          },
        ]}
        onPress={handleSendCode}
        disabled={method === 'email' ? !isValidEmail() : !isValidPhone()}
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
  methodContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(20),
    width: '80%',
  },
  methodButton: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  activeMethodButton: {
    backgroundColor: '#d32f2f',
  },
  methodText: {
    color: '#000',
    fontSize: scale(14),
  },
  activeMethodText: {
    color: '#fff',
    fontSize: scale(14),
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