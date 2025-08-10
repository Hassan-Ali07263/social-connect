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
        marginBottom: "20%",
        borderBottomColor: COLORS.buttonBlue,
        borderWidth: 0,
        borderBottomWidth: 2,
        height: 45
    },
    styleButton: {
        width: "80%"
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        marginVertical: "15%",
    },
    gradientBorder: {
        padding: 3,
        borderRadius: 10.5,
        elevation: 5
    },
    inputWrapper: {
        backgroundColor: '#D9D9D9',
        borderRadius: 10.5,
        width: 41,
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontFamily: FONTS.medium,
        fontSize: 20,
        color: COLORS.blue
    },
    loadingStyle: {
        flex: 1,
        position: "absolute",
        alignSelf: "center",
        top: "50%"
    }
})