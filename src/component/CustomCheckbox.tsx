/* eslint-disable react-native/no-inline-styles */
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {useController} from 'react-hook-form';

type CustomCheckbox = {name: string; label?: string; size?: number};

const CustomCheckbox = ({name, label, size}: CustomCheckbox) => {
  const {
    field: {value, onChange},
  } = useController({name, defaultValue: false});
  const [androidCheckbox, setAndroidCheckbox] = useState(value);

  function handleCheckbox() {
    const updateVal = !value;
    setAndroidCheckbox(updateVal);
    onChange(updateVal);
  }

  const isAndroid = Platform.OS === 'android';
  return isAndroid ? (
    <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 3,
          borderColor: 'black',
        }}>
        <TouchableOpacity
          onPress={handleCheckbox}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          accessible={true}
          >
          <View
            style={{
              width: '75%',
              height: '75%',
              backgroundColor: androidCheckbox === false ? 'white' : 'black',
            }}
            testID={`${name}-checkbox`}
            accessibilityLabel={
              androidCheckbox === false ? 'off' : 'on'
            }
          />
        </TouchableOpacity>
      </View>
      <Text>{label}</Text>
    </View>
  ) : (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
      <CheckBox
        disabled={false}
        value={value}
        onValueChange={onChange}
        boxType={'square'}
        lineWidth={1}
        style={{width: size ?? 10, height: size ?? 10}}
        testID={`${name}-checkbox`}
      />
      <Text>{label}</Text>
    </View>
  );
};

export default CustomCheckbox;
