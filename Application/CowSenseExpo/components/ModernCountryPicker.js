import React from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import { LogBox } from 'react-native';

// Suppress the specific defaultProps warnings
LogBox.ignoreLogs([
  'CountryItem: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  'CountryModal: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.'
]);

const ModernCountryPicker = ({ 
  withFilter = true,
  withCallingCode = true,
  withFlag = true,
  onSelect,
  countryCode,
  containerButtonStyle,
  withEmoji = true,
  withCountryNameButton = false,
  withCurrencyButton = false,
  withFlagButton = true,
  withCloseButton = true,
  withAlphaFilter = false,
  withCurrency = false,
  renderCountryFilter = null,
  filterProps = {},
  ...props 
}) => {
  return (
    <CountryPicker
      withFilter={withFilter}
      withCallingCode={withCallingCode}
      withFlag={withFlag}
      onSelect={onSelect}
      countryCode={countryCode}
      containerButtonStyle={containerButtonStyle}
      withEmoji={withEmoji}
      withCountryNameButton={withCountryNameButton}
      withCurrencyButton={withCurrencyButton}
      withFlagButton={withFlagButton}
      withCloseButton={withCloseButton}
      withAlphaFilter={withAlphaFilter}
      withCurrency={withCurrency}
      renderCountryFilter={renderCountryFilter}
      filterProps={filterProps}
      {...props}
    />
  );
};

export default ModernCountryPicker; 