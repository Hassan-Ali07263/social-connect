import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    innerContainer: {
        marginHorizontal: "5%"
    },
    backImageStyle: {
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
        backgroundColor: COLORS.buttonBlue,
        borderRadius: 25,
        width: "85%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "5%"
    },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: "5%"
    },
    storyImage: {
        height: 41,
        width: 41,
        borderRadius: 58,
    },
    gradientBorder: {
        padding: 1.5,
        borderRadius: 50,
        marginRight: "4%"
    },
    imageWrapper: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    descriptionText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.white,
        lineHeight: 15
    },
    nameText: {
        fontFamily: FONTS.medium,
        fontSize: 15,
        color: COLORS.white,
        lineHeight: 18
    },
    leftView: {
        flexDirection: "row",
        alignItems: "center"
    },
    followText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.white
    },
    followButton: {
        backgroundColor: COLORS.buttonBlue,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "3%",
        paddingVertical: ".5%"
    },
    followers: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "2%",
        borderBottomWidth: .4,
        borderColor: COLORS.white
    },
    registeredText: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.white_2
    },
    noDataText: {
        fontFamily: FONTS.semibold,
        fontSize: 16,
        color: COLORS.white,
        marginVertical: "40%"
    },
    noDataView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})