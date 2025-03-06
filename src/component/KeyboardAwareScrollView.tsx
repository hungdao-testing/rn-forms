/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const KeyboardAwareScrollView = ({children}: PropsWithChildren) => {
  const keyboardVerticalOffset = 110;
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{backgroundColor: 'white'}}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
          gap: 10,
        }}
        keyboardShouldPersistTaps="handled">
        <SafeAreaView edges={['bottom']} style={{flex: 1}}>
          {children}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareScrollView;

const styles = StyleSheet.create({});

/**
 * Notes:
 * if the container style `contentContainerStyle` has `flex:1` => the [Next] button could not be seen in case the screen has
 * many fields in verticall because:
 * `flex: 1` means the whole forms consume all screen's height, and margin-top=auto in this case is 0
 * therefore, user could not see the button
 *
 * So to satisfy the condition: 'user always see the Next btn in any cases' and 'the button' is at the bottom
 * => flexGrows: 1
 */

/**
 *  // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
 * => in iOS (iPhone7) the softkeyboard hides the last text input
 * so using `keyboardVerticalOffset={keyboardVerticalOffset}`
 */
