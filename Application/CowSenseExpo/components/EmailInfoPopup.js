import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const EmailInfoPopup = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Text style={styles.title}>Email Requirements</Text>
          <Text style={styles.message}>
            Please input a valid email. See the examples below:
          </Text>
          <Text style={styles.example}>• Example@gmail.com</Text>
          <Text style={styles.example}>• Example@yahoo.com</Text>
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
  message: {
    fontSize: scale(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  example: {
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

export default EmailInfoPopup;