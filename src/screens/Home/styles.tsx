import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    innerContainer: {
        flex: 1
    },
    backIMageStyle: {
        flex: 1
    },
    bellStyle: {
        width: 33,
        height: 36
    },
    inputStyle: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: COLORS.white,
        paddingHorizontal: "5%",
        marginTop: "2%"
    },
    searchImage: {
        height: 16,
        width: 16,
    },
    inputView: {
        height: 53,
        borderRadius: 25,
        width: "85%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "5%",
    },
    logoIMage: {
        height: 45,
        width: "35%"
    },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: "5%",
        marginVertical: "5%"
    },
})