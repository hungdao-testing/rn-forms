/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {ComponentProps} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {useController} from 'react-hook-form';

type CustomPicker = {name: string; label: string} & Omit<
  ComponentProps<typeof RNPickerSelect>,
  'onValueChange'
>;
const CustomPicker = ({name, label, ...pickerProps}: CustomPicker) => {
  const {
    field: {value, onBlur, onChange},
    fieldState: {error},
  } = useController({name});

  return (
    <View>
      <Text
        style={{
          fontWeight: '600',
          color: 'dimgray',
          marginBottom: 10,
        }}>
        {label}
      </Text>
      <RNPickerSelect
        value={value}
        itemKey={pickerProps.itemKey}
        onValueChange={onChange}
        onClose={onBlur}
        style={{
          inputIOSContainer: {
            ...pickerSelectStyles.inputIOSContainer,
            borderColor: error ? 'crimson' : 'gainsboro',
          },
          inputAndroidContainer: {
            ...pickerSelectStyles.inputAndroidContainer,
            borderColor: error ? 'crimson' : 'gainsboro',
          },
        }}
        useNativeAndroidPickerStyle={false}
        {...pickerProps}
        textInputProps={{
          accessibilityLabel: value
            ? `${value}`
            : JSON.parse(JSON.stringify(pickerProps.placeholder)).label,
          testID: 'testID-testInputProps',
        }}
      />
      <Text
        numberOfLines={1}
        style={{
          marginBottom: 10,
          color: 'crimson',
          height: 17,
        }}
        testID={`${name}-errorMsg`}>
        {error?.message}
      </Text>
    </View>
  );
};

export default CustomPicker;

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    marginBottom: 4,
    marginTop: 2,
  },

  inputIOSContainer: {
    width: '100%',
    borderColor: 'gainsboro',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    width: '100%',
    borderColor: 'gainsboro',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    paddingRight: 20, // to ensure the text is never behind the icon
  },
});
