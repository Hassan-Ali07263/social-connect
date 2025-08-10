import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    signUpText: {
        fontFamily: FONTS.semibold,
        fontSize: 30,
        color: COLORS.white,
        marginVertical: "5%"
    },
    innerContainer: {
        marginHorizontal: "5%"
    },
    backImageStyle: {
        flex: 1
    },
    inputViewStyle: {
        marginTop: "6%"
    },
    styleButton: {
        marginTop: "10%"
    },
    imageStyle: {
        height: 120,
        width: "50%",
        alignSelf: "center",
        marginTop: "3%"
    },
    bottomSignUpText: {
        fontFamily: FONTS.regular,
        fontSize: 17,
        color: COLORS.blue
    },
    noAccountText: {
        fontFamily: FONTS.regular,
        fontSize: 17,
        color: COLORS.white
    },
    noAccountView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "5%",
        marginTop: "10%"
    },
    textStyle: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.buttonBlue
    },
    boxStyle: {
        height: 120,
        width: "40%",
        overflow: "hidden"
    },
    innerBoxStyle: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.buttonBlue,
        borderRadius: 10,
    },
    outerBoxStyle: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: "6%"
    },
    profileImageStyle: {
        height: "100%",
        width: "100%",
        overflow: "hidden"
    },
    errText: {
        width: "70%",
        marginHorizontal: "5%",
        color: COLORS.red,
        fontFamily: FONTS.regular,
        fontSize: 12
    },
    loadingStyle:{
        flex:1,
        position:"absolute",
        alignSelf:"center",
        top:"50%"
    }
})