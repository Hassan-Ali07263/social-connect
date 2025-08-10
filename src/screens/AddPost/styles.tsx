import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backgroundImage: {
        flex: 1
    },
    styleNextButton: {
        width: "90%",
        alignSelf: "center"
    },
    styleButton: {
        width: "45%",
        height: 45
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginHorizontal: "5%",
        marginVertical: "15%"
    },
    selectText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.buttonBlue
    },
    imageView: {
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        elevation: 5
    },
    titleStyle: {
        fontFamily: FONTS.medium,
        fontSize: 17,
        color: COLORS.white
    },
    imageStyle: {
        height: "100%",
        width: "100%"
    },
    errorText: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.white,
        marginHorizontal: "5%"
    }
})