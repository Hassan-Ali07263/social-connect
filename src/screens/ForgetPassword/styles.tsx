import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white
    },
    imageStyle:{
        height:120,
        width:"50%",
        alignSelf:"center",
        marginTop:"15%"
    },
    innerContainer:{
        marginHorizontal:"5%"
    },
    backgroundImage:{
        flex:1
    },
    subHeadingText:{
        fontFamily:FONTS.regular,
        fontSize:14,
        color:COLORS.white
    },
    headingText:{
        fontFamily:FONTS.semibold,
        fontSize:30,
        color:COLORS.white,
        marginTop:"5%"
    },
    inputViewStyle:{
        marginTop:"7%"
    },
    styleButton:{
        width:"80%",
        marginVertical:"5%",
        marginTop:"20%"
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