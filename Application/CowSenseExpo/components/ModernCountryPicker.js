import React from 'react';
import CountryPicker from 'react-native-country-picker-modal';

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