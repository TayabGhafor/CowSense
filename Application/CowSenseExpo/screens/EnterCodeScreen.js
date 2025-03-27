import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import CustomToast from '../components/CustomToast';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const EnterCodeScreen = ({ navigation, route }) => {
  const { email, method } = route.params; // Get email and method (email or SMS)
  const [code, setCode] = useState(['', '', '', '']);
  const [showResend, setShowResend] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    if (!showTimer) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowTimer(false);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimer]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      refs[index + 1].focus();
    }
  };

  const refs = [];

  const handleVerify = () => {
    const enteredCode = code.join('');
    // Mock verification: assume the correct code is "1234"
    if (enteredCode === '1234') {
      setToastMessage('Code matched Successfully!');
      setToastType('success');
      setShowToast(true);
      // Navigate to PasswordRecoveryScreen after the toast disappears
      setTimeout(() => {
        navigation.navigate('PasswordRecovery', { email });
      }, 3000);
    } else {
      setToastMessage("Code didn't matched! Retry");
      setToastType('error');
      setShowToast(true);
      setShowResend(true);
      setTimer(60);
      setIsResendDisabled(true);
    }
  };

  const handleResendCode = () => {
    console.log(`Resending code via ${method} to:`, email);
    setCode(['', '', '', '']);
    setTimer(60);
    setShowTimer(true);
    setIsResendDisabled(true);
  };

  return (
    <View style={styles.container}>
      {/* Custom Toast for Success/Error */}
      <CustomToast
        visible={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>verify Code.</Text>
      <Text style={styles.subtitle}>
        Enter the Code, We just sent you on your {method}
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (refs[index] = ref)}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      {showResend && (
        <View style={styles.resendContainer}>
          <TouchableOpacity
            onPress={handleResendCode}
            disabled={isResendDisabled}
            style={styles.resendButton}
          >
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
          {showTimer && (
            <Text style={styles.timerText}>
              {`0:${timer < 10 ? `0${timer}` : timer}`}
            </Text>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: verticalScale(20),
  },
  codeInput: {
    width: scale(40),
    height: verticalScale(40),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(5),
    fontSize: scale(20),
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: verticalScale(20),
  },
  resendButton: {
    padding: moderateScale(5),
  },
  resendText: {
    color: '#1e88e5',
    fontSize: scale(14),
  },
  timerText: {
    fontSize: scale(14),
    color: '#666',
  },
  verifyButton: {
    backgroundColor: '#d32f2f',
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    width: '80%',
    alignItems: 'center',
  },
  verifyText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});

export default EnterCodeScreen;