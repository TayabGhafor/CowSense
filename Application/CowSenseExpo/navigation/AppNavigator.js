// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens with the correct relative path
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import EnterCodeScreen from '../screens/EnterCodeScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import VetHomeScreen from '../screens/VetHomeScreen';
import FarmerHomeScreen from '../screens/FarmerHomeScreen';
import ChatScreen from '../screens/ChatScreen';
import CameraScreen from '../screens/CameraScreen';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="EnterCode" component={EnterCodeScreen} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="VetHome" component={VetHomeScreen} />
        <Stack.Screen name="FarmerHome" component={FarmerHomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;