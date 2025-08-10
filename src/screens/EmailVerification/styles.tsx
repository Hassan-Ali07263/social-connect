import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    innerContainer: {
        marginHorizontal: "5%",
        paddingTop: "7%"
    },
    backgroundImageStyle: {
        flex: 1
    },
    arrowBackStyle: {
        height: 24,
        width: 24
    },
    backButtonStyle: {
        alignSelf: "flex-start"
    },
    subHeadingText: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.white,
        width: "85%"
    },
    headingText: {
        fontFamily: FONTS.semibold,
        fontSize: 30,
        color: COLORS.white,
        marginTop: "3%"
    },
    inputStyle: {
        marginTop: "10%",
        borderBottomColor: COLORS.buttonBlue,
        borderWidth: 0,
        borderBottomWidth: 2,
        height: 45
    },
    styleButton: {
        width: "80%",
        marginTop: "20%",
    },
    errText: {
        width: "70%",
        marginHorizontal: "5%",
        color: COLORS.red,
        fontFamily: FONTS.regular,
        fontSize: 12
    },
    loadingStyle: {
        flex: 1,
        position: "absolute",
        alignSelf: "center",
        top: "50%"
    }
})