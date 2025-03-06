import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {ComponentProps, forwardRef, ReactNode} from 'react';

type CustomButton = {
  rightIcon?: ReactNode;
  title: string;
  style?: StyleProp<ViewStyle>;
} & ComponentProps<typeof Pressable>;

const CustomButton = forwardRef<View, CustomButton>(
  ({rightIcon, title, style, ...pressableProps}, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={[styles.button, style]}
      testID={`${title}-button`}
      >
        <Text style={styles.buttonText}>{title}</Text>
        <View style={styles.rightIconContainer}>{rightIcon}</View>
      </Pressable>
    );
  },
);

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#005055',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 20,
  },
});
