/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type CustomDateTimePicker = {
  name: string;
};
const CustomDateTimePicker = ({name}: CustomDateTimePicker) => {
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({name});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const dateVal = new Date(date).toLocaleDateString();
    onChange(dateVal);
    hideDatePicker();
  };

  return (
    <View>
      <Text
        style={{
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          borderColor: 'gainsboro',
          marginTop: 10,
          marginBottom: 2,
        }}
        testID={`${name}-content`}
        onPress={showDatePicker}>
        {value ? value : 'Please select a date'}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        backdropStyleIOS={{backgroundColor: 'gray'}}
        cancelButtonTestID="cancelDateSelectionBtn"
        confirmButtonTestID="confirmDateSelectionBtn"
        testID="dateTimePickerTestId"
      />
      <Text
        style={{color: 'crimson'}}
        numberOfLines={1}
        testID={`${name}-errorMsg`}>
        {error?.message}
      </Text>
    </View>
  );
};

export default CustomDateTimePicker;
