import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../enums/fontStyles';

const Buttons = (props: any) => {
    const { title, titleStyle, styleButton,onPress,disabled } = props;
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress}
        style={[styles.buttonStyle, styleButton]}>
            <Text style={[styles.textStyle, titleStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: FONTS.semibold,
        fontSize: 22,
        color: COLORS.white
    },
    buttonStyle: {
        height: 51,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 25,
        elevation: 5,
        backgroundColor: COLORS.buttonBlue
    }
})
export default Buttons;