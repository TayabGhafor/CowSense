// screens/EnterCodeScreen.js
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
import CustomAlert from '../components/CustomAlert';
import CustomToast from '../components/CustomToast';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const EnterCodeScreen = ({ navigation, route }) => {
  const { email, method } = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      refs[index + 1].focus();
    }
  };

  const refs = Array(6)
    .fill()
    .map(() => React.createRef());

  const handleResendCode = () => {
    setTimer(60);
    setCode(['', '', '', '', '', '']);
    setShowToast(true);
  };

  const handleVerifyCode = () => {
    const enteredCode = code.join('');
    if (enteredCode.length !== 6 || !/^\d{6}$/.test(enteredCode)) {
      setShowAlert(true);
      return;
    }

    console.log('Verifying code:', enteredCode);
    navigation.navigate('PasswordRecovery', { email });
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={showAlert}
        title="Invalid Code"
        message="Please enter a valid 6-digit code."
        onClose={() => setShowAlert(false)}
        onConfirm={() => setShowAlert(false)}
      />

      <CustomToast
        visible={showToast}
        message="Code Resent Successfully!"
        type="success"
        onClose={() => setShowToast(false)}
      />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#000" />
      </TouchableOpacity>

      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Enter Code</Text>
      <Text style={styles.subtitle}>
        We have sent a 6-digit code to {method === 'email' ? 'your email' : 'your phone'}.
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

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {timer > 0 ? `Resend code in ${timer}s` : 'Resend code now'}
        </Text>
        {timer === 0 && (
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.verifyButton, { opacity: code.join('').length === 6 ? 1 : 0.5 }]}
        onPress={handleVerifyCode}
        disabled={code.join('').length !== 6}
      >
        <Text style={styles.verifyText}>Verify Code</Text>
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: verticalScale(20),
  },
  codeInput: {
    width: scale(40),
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    fontSize: scale(20),
    textAlign: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  timerText: {
    fontSize: scale(14),
    color: '#666',
  },
  resendLink: {
    fontSize: scale(14),
    color: '#1e88e5',
    marginLeft: moderateScale(5),
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