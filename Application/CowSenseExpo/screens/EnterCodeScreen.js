import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const EnterCodeScreen = ({ navigation, route }) => {
  const { email } = route.params; // Get the email from the previous screen
  const [code, setCode] = useState(['', '', '', '']); // Array to store 4 digits
  const [showResend, setShowResend] = useState(false); // Toggle Resend UI
  const [timer, setTimer] = useState(60); // 1-minute timer
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable Resend button during timer

  // Start the timer when showResend is true
  useEffect(() => {
    if (!showResend) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showResend]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus the next input
    if (text && index < 3) {
      refs[index + 1].focus();
    }
  };

  const refs = [];

  const handleVerify = () => {
    const enteredCode = code.join('');
    // Mock verification: assume the correct code is "1234"
    // Later, we'll integrate with Firebase to verify the code
    if (enteredCode === '1234') {
      Alert.alert('Success', 'Code verified successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Invalid Code', 'The code you entered is incorrect.');
      setShowResend(true); // Show the Resend UI
      setTimer(60); // Reset the timer
      setIsResendDisabled(true); // Disable the Resend button
    }
  };

  const handleResendCode = () => {
    // Mock resending the code
    console.log('Resending code to:', email);
    Alert.alert('Code Resent', 'A new code has been sent to your email.');

    // Reset the code inputs
    setCode(['', '', '', '']);

    // Reset the timer and disable the button
    setTimer(60);
    setIsResendDisabled(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')} // Replace with your logo
        style={styles.logo}
      />
      <Text style={styles.title}>verify Code.</Text>
      <Text style={styles.subtitle}>
        Enter the Code, We just sent you on your
      </Text>

      {/* Code Inputs */}
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

      {/* Conditionally render Resend Code and Timer */}
      {showResend && (
        <View style={styles.resendContainer}>
          <TouchableOpacity
            onPress={handleResendCode}
            disabled={isResendDisabled}
            style={styles.resendButton}
          >
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
          <Text style={styles.timerText}>
            {`0:${timer < 10 ? `0${timer}` : timer}`}
          </Text>
        </View>
      )}

      {/* Verify Button */}
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