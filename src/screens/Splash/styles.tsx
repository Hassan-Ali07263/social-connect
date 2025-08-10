import { StyleSheet } from "react-native";
import { COLORS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    logoImage: {
        height: 120,
        width: "50%"
    },
    backImageStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})