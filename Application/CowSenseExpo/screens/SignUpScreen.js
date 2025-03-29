// screens/SignUpScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import CustomAlert from '../components/CustomAlert';
import PasswordInfoPopup from '../components/PasswordInfoPopup';
import EmailInfoPopup from '../components/EmailInfoPopup';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('veterinarian');
  const [showAlert, setShowAlert] = useState(false);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);

  useEffect(() => {
    if (showPassword) {
      const timer = setTimeout(() => {
        setShowPassword(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showPassword]);

  const isValidName = () => {
    return name.trim().length > 0;
  };

  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ['@gmail.com', '@yahoo.com'];
    return emailRegex.test(email) && validDomains.some((domain) => email.endsWith(domain));
  };

  const isValidPassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = () => {
    if (!isValidName()) {
      setShowAlert(true);
      return;
    }

    if (!isValidEmail()) {
      setShowAlert(true);
      return;
    }

    if (!isValidPassword()) {
      setShowAlert(true);
      return;
    }

    console.log('SignUp:', { name, email, password, role });
    global.isFirstLogin = true; // Set first-time login flag
    navigation.navigate('ProfileSetup', { name, email, role });
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={showAlert}
        title="Invalid Input"
        message={
          !isValidName()
            ? 'Please enter your name.'
            : !isValidEmail()
            ? 'Please enter a valid email address ending with @gmail.com or @yahoo.com.'
            : 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be 8-15 characters long.'
        }
        onClose={() => setShowAlert(false)}
        onConfirm={() => setShowAlert(false)}
      />

      <PasswordInfoPopup visible={showPasswordInfo} onClose={() => setShowPasswordInfo(false)} />
      <EmailInfoPopup visible={showEmailInfo} onClose={() => setShowEmailInfo(false)} />

      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>We are here to help you!</Text>

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'veterinarian' && styles.activeRoleButton,
            { borderTopLeftRadius: moderateScale(20), borderBottomLeftRadius: moderateScale(20) },
          ]}
          onPress={() => setRole('veterinarian')}
        >
          <Text style={role === 'veterinarian' ? styles.activeRoleText : styles.roleText}>
            Veterinarian
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'farmer' && styles.activeRoleButton,
            { borderTopRightRadius: moderateScale(20), borderBottomRightRadius: moderateScale(20) },
          ]}
          onPress={() => setRole('farmer')}
        >
          <Text style={role === 'farmer' ? styles.activeRoleText : styles.roleText}>
            Rancher
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput style={styles.input} placeholder="your name" value={name} onChangeText={setName} />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={moderateScale(20)} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.infoIcon} onPress={() => setShowEmailInfo(true)}>
          <Text style={styles.infoIconText}>i</Text>
        </TouchableOpacity>
      </View>

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
          <TouchableOpacity style={styles.infoIcon} onPress={() => setShowPassword(true)}>
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
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
        style={[styles.signInButton, { opacity: isValidName() && isValidEmail() && isValidPassword() ? 1 : 0.5 }]}
        onPress={handleSignUp}
        disabled={!(isValidName() && isValidEmail() && isValidPassword())}
      >
        <Text style={styles.signInText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="facebook" size={moderateScale(20)} color="#fff" style={styles.socialIcon} />
        <Text style={styles.socialText}>Sign In with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <AntDesign name="google" size={moderateScale(20)} color="#000" style={styles.socialIcon} />
        <Text style={styles.googleText}>Sign In with Google</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an account yet? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles remain unchanged
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
    marginBottom: verticalScale(20),
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(20),
    width: '80%',
  },
  roleButton: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  activeRoleButton: {
    backgroundColor: '#d32f2f',
  },
  roleText: {
    color: '#000',
    fontSize: scale(14),
  },
  activeRoleText: {
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
  signInButton: {
    backgroundColor: '#d32f2f',
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    width: '80%',
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(20),
    width: '80%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: moderateScale(10),
    color: '#666',
    fontSize: scale(14),
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#3b5998',
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  socialIcon: {
    marginRight: moderateScale(10),
  },
  socialText: {
    color: '#fff',
    fontSize: scale(16),
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  googleText: {
    color: '#000',
    fontSize: scale(16),
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  signUpText: {
    color: '#666',
    fontSize: scale(14),
  },
  link: {
    color: '#1e88e5',
    fontSize: scale(14),
  },
});

export default SignUpScreen;