import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const PasswordInfoPopup = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Text style={styles.title}>Password Requirements</Text>
          <Text style={styles.requirement}>• At least one uppercase letter (A-Z)</Text>
          <Text style={styles.requirement}>• At least one lowercase letter (a-z)</Text>
          <Text style={styles.requirement}>• At least one number (0-9)</Text>
          <Text style={styles.requirement}>• At least one special character (!@#$%^&*)</Text>
          <Text style={styles.requirement}>• Minimum 8 characters, maximum 15 characters</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  requirement: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(5),
  },
  closeButton: {
    backgroundColor: '#d32f2f',
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
    marginTop: verticalScale(20),
  },
  closeButtonText: {
    color: '#fff',
    fontSize: scale(14),
    fontWeight: 'bold',
  },
});

export default PasswordInfoPopup;