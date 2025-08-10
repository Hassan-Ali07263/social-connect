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
    imageStyle: {
        height: 24,
        width: 24
    },
    backButton: {
        alignSelf: "flex-start",
        padding: "5%"
    },
    coverIMageStyle: {
        height: "95%",
        width: "100%",
        overflow: "hidden"
    },
    coverIMageView: {
        height: 280,
        width: "100%",
        overflow: "hidden"
    },
    profileImage: {
        height: 73,
        width: 73,
        borderRadius: 73,
        borderWidth: 2,
        borderColor: COLORS.buttonBlue,
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        elevation: 2
    },
    descriptionText: {
        alignSelf: "center",
        fontFamily: FONTS.regular,
        fontSize: 17,
        color: COLORS.white,
        lineHeight: 20
    },
    nameText: {
        alignSelf: "center",
        marginTop: "2%",
        color: COLORS.blue,
        fontFamily: FONTS.semibold,
        fontSize: 21,
    },
    subHeadingText: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: "rgba(255,255,255,.7)"
    },
    headerText: {
        fontFamily: FONTS.semibold,
        fontSize: 28,
        color: COLORS.white,
        lineHeight: 37
    },
    countView: {
        alignItems: "center",
        paddingHorizontal: "4%"
    },
    outerCountView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: "7%"
    },
    countCenterView: {
        borderLeftWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: COLORS.white,
        alignItems: "center",
        paddingHorizontal: "6%"
    },
    styleButton: {
        width: "50%",
        alignSelf: "center"
    },
    bottomLineView: {
        alignSelf: "center",
        width: "90%",
        borderWidth: .4,
        borderColor: COLORS.white,
        marginTop: "4%"
    },
    postImageStyle: {
        width: "100%",
        height: 125
    },
    postButton: {
        width: "48%",
        margin:"1%"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    fullImage: {
        width: "90%",
        height: "80%",
    },
    closeArea: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
})