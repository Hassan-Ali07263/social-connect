import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../enums/fontStyles';

const Input = (props: any) => {
  const { value, onChangeText,onBlur,multiline, placeholder,onFocus, secureTextEntry, keyboardType, placeholderTextColor, inputStyle, addRight, onPressRight, inputViewStyle } = props;
  return (
    <View style={[styles.inputView, inputViewStyle]}>
      <TextInput style={[styles.styleInput, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        multiline={multiline}
      />
      <TouchableOpacity onPress={onPressRight}>
        {addRight}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  styleInput: {
    width: "85%",
    fontFamily: FONTS.regular,
    fontSize: 17,
    color: COLORS.white
  },
  inputView: {
    width: "100%",
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 25,
    height: 53,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "4%"

  }
})
export default Input;