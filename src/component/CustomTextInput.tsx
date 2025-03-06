import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {ComponentProps} from 'react';
import {useController} from 'react-hook-form';

type CustomTextInput = {
  label?: string;
  name: string;
  containerStyle?: StyleProp<ViewStyle>;
} & ComponentProps<typeof TextInput>;

const CustomTextInput = ({
  label,
  name,
  containerStyle,
  ...textInputProps
}: CustomTextInput) => {
  const {
    field: {value, onBlur, onChange},
    fieldState: {error},
  } = useController({name});

  const formatToString = typeof value === 'number' ? value.toString() : value;

  return (
    <View style={[containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...textInputProps}
        value={formatToString}
        onBlur={onBlur}
        onChangeText={onChange}
        style={[
          styles.input,
          textInputProps.style,
          error ? styles.errorInput : {},
        ]}
        testID={`${name}-content`}
      />
      <Text numberOfLines={1} style={styles.error} testID={`${name}-errorMsg`}>
        {error?.message}
      </Text>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: 'gainsboro',
    marginTop: 10,
    marginBottom: 2,
  },
  errorInput: {
    borderColor: 'crimson',
  },
  label: {
    fontWeight: '600',
    color: 'dimgray',
  },
  error: {
    marginBottom: 10,
    color: 'crimson',
    height: 17,
  },
});

// if not `toString` for value, when editing mode (from Submit to Payment), the field `cvv` is empty because input mode is numeric but rendering is string
