// screens/ForgotPasswordScreen.js
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
import EmailInfoPopup from '../components/EmailInfoPopup';
import CountryPicker from 'react-native-country-picker-modal';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const ForgotPasswordScreen = ({ navigation }) => {
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('PK');
  const [countryCallingCode, setCountryCallingCode] = useState('+92');
  const [showAlert, setShowAlert] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ['@gmail.com', '@yahoo.com'];
    return emailRegex.test(email) && validDomains.some((domain) => email.endsWith(domain));
  };

  const isValidPhone = () => {
    const phoneWithoutCode = phone.replace(countryCallingCode, '').replace(/\s/g, '');
    let isFormatValid = false;
    switch (countryCode) {
      case 'PK':
      case 'US':
      case 'CA':
      case 'IN':
      case 'GB':
        isFormatValid = /^\d{10}$/.test(phoneWithoutCode);
        break;
      case 'AU':
        isFormatValid = /^\d{9}$/.test(phoneWithoutCode);
        break;
      default:
        isFormatValid = /^\d{9,11}$/.test(phoneWithoutCode);
    }

    const fullPhone = `${countryCallingCode}${phoneWithoutCode}`;
    return isFormatValid && fullPhone === global.userPhone;
  };

  const handleCountrySelect = (country) => {
    setCountryCode(country.cca2);
    setCountryCallingCode(`+${country.callingCode[0]}`);
    setPhone('');
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

    const destination = method === 'email' ? email : `${countryCallingCode}${phone.replace(/\s/g, '')}`;
    console.log(`Sending code via ${method} to:`, destination);
    setShowToast(true);
    setTimeout(() => {
      navigation.navigate('EnterCode', { email: destination, method });
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={showAlert}
        title="Invalid Input"
        message={
          method === 'email'
            ? 'Please enter a valid email address ending with @gmail.com or @yahoo.com.'
            : `Please enter a valid phone number for ${countryCode} (e.g., ${countryCallingCode} followed by ${countryCode === 'PK' ? '10 digits' : 'appropriate length'}). It must match your registered number.`
        }
        onClose={() => setShowAlert(false)}
        onConfirm={() => setShowAlert(false)}
      />

      <CustomToast
        visible={showToast}
        message="Code Sent Successfully!"
        type="success"
        onClose={() => setShowToast(false)}
      />

      <EmailInfoPopup visible={showEmailInfo} onClose={() => setShowEmailInfo(false)} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#000" />
      </TouchableOpacity>

      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Select how you would like to receive your verification code.
      </Text>

      <View style={styles.methodContainer}>
        <TouchableOpacity
          style={[
            styles.methodButton,
            method === 'email' && styles.activeMethodButton,
            { borderTopLeftRadius: moderateScale(20), borderBottomLeftRadius: moderateScale(20) },
          ]}
          onPress={() => setMethod('email')}
        >
          <Text style={method === 'email' ? styles.activeMethodText : styles.methodText}>
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
          <Text style={method === 'SMS' ? styles.activeMethodText : styles.methodText}>
            SMS
          </Text>
        </TouchableOpacity>
      </View>

      {method === 'email' ? (
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={moderateScale(20)} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.infoIcon} onPress={() => setShowEmailInfo(true)}>
            <Text style={styles.infoIconText}>i</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
      )}

      <TouchableOpacity
        style={[
          styles.sendCodeButton,
          {
            opacity: method === 'email' ? (isValidEmail() ? 1 : 0.5) : (isValidPhone() ? 1 : 0.5),
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
    paddingHorizontal: moderateScale(10),
    width: '80%',
    marginBottom: verticalScale(15),
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
  icon: {
    marginRight: moderateScale(10),
  },
  input: {
    flex: 1,
    padding: moderateScale(10),
    fontSize: scale(14),
    color: '#000',
  },
  phoneInput: {
    flex: 1,
    padding: moderateScale(10),
    fontSize: scale(14),
    color: '#000',
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