import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';

const CustomAlert = ({ visible, title, message, onClose, onConfirm }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
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
  alertContainer: {
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
    marginBottom: verticalScale(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
    flex: 1,
    alignItems: 'center',
    marginRight: moderateScale(10),
  },
  buttonText: {
    color: '#000',
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#d32f2f',
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
    flex: 1,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: scale(14),
    fontWeight: 'bold',
  },
});

export default CustomAlert;