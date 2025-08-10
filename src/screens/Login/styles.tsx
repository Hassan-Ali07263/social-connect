import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoImageStyle: {
        height: 80,
        width: "50%",
        alignSelf: "center",
        marginTop: "30%"
    },
    backImageStyle: {
        flex: 1
    },
    innerView: {
        flex: 1,
        marginHorizontal: "5%"
    },
    signInText: {
        fontFamily: FONTS.semibold,
        fontSize: 30,
        color: COLORS.white,
        marginTop: "8%",
        marginBottom: "5%"
    },
    forgetPasswordText: {
        fontFamily: FONTS.regular,
        fontSize: 17,
        color: COLORS.blue
    },
    forgetButton: {
        alignSelf: "flex-end",
        marginVertical: "5%"
    },
    inputViewStyle: {
        marginTop: "5%"
    },
    signUpText: {
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
        marginTop: "20%"
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