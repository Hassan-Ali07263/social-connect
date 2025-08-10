import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    innerContainer: {
        flex: 1,
        marginHorizontal: "5%"
    },
    imageStyle: {
        height: 250,
        width: "90%",
        alignSelf: "center"
    },
    backgroundImage: {
        flex: 1
    },
    backImage: {
        height: 24,
        width: 24
    },
    backButton: {
        marginHorizontal: "5%",
        marginVertical: "5%"
    },
    inputStyling: {
        width: "100%",
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 25,
        paddingHorizontal: "5%",
        minHeight: 51,
        maxHeight: 250,
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.white,
        marginTop: "5%"
    },
    hashTagsInputStyling: {
        width: "100%",
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 25,
        paddingHorizontal: "5%",
        minHeight: 51,
        maxHeight: 150,
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.white,
        marginTop: "5%"
    },
    questionInputStyling: {
        width: "100%",
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 25,
        paddingHorizontal: "5%",
        minHeight: 51,
        maxHeight: 100,
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.white,
        marginTop: "5%"
    },
    styleButton: {
        width: "90%",
        alignSelf: "center",
        marginVertical: "2%",
        elevation: 5,
        marginTop:"5%"
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