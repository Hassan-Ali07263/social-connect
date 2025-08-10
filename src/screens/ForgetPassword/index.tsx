import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import Input from '../../components/Input';
import { COLORS } from '../../enums/fontStyles';
import Feather from "react-native-vector-icons/Feather";
import Buttons from '../../components/Buttons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isStrongPassword } from '../../utills/Helper';
import { updatePassword } from '../../apis';

const ForgetPassword = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const { email } = route.params;
    console.log(email)

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (password.trim() === "") {
            setPasswordErr("Enter your password")
            setLoading(false);
            return
        }
        if (!isStrongPassword(password)) {
            setPasswordErr("Password must be at least 6 characters long");
            setLoading(false);
            return
        }
        setPasswordErr("");

        if (confirmPassword.trim() === "") {
            setConfirmPasswordErr("Enter your password")
            setLoading(false);
            return
        }
        if (!isStrongPassword(confirmPassword)) {
            setConfirmPasswordErr("Password must be at least 6 characters long");
            setLoading(false);
            return
        }
        setConfirmPasswordErr("");

        if (password != confirmPassword) {
            setPasswordErr("Password does not match")
            setConfirmPasswordErr("Password does not match");
            setLoading(false);
            return
        }
        setConfirmPasswordErr("");
        setPasswordErr("");
    }, [password, confirmPassword])

    const updateFun = async () => {
        try {
            setLoading(true);
            if (passwordErr != "" || confirmPassword != "") {
                Alert.alert("Oops", "Enter strong password")
            }
            if (email && password && confirmPassword) {
                let data = await fetch(updatePassword, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password, confirmPassword })
                })
                data = await data.json();
                if (data.response === "ok") {
                    setLoading(false)
                    Alert.alert("Congrats", "Password update successfully")
                    navigation.navigate("Login")
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", data.result)
                }
            }
            else {
                setLoading(false);
                Alert.alert("Oops", "Enter the data")
            }
        }
        catch (err) {
            setLoading(false)
            Alert.alert("Error" + err);
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={IMAGES.BackImage}>
                <ScrollView>
                    <View style={styles.innerContainer}>
                        <Image style={styles.imageStyle} resizeMode='contain' source={IMAGES.MainLogo} />

                        <Text style={styles.headingText}>Update Password</Text>
                        <Text style={styles.subHeadingText}>Enter the new password to update.</Text>

                        <Input inputViewStyle={styles.inputViewStyle}
                            placeholder={"Password"}
                            placeholderTextColor={COLORS.placeHolderColor}
                            addRight={<Feather name={showPassword ? "eye-off" : "eye"} color={COLORS.white} size={20} />}
                            onPressRight={() => setShowPassword(!showPassword)}
                            secureTextEntry={showPassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        {password && passwordErr ? <Text style={styles.errText}>{passwordErr}</Text> : null}

                        <Input inputViewStyle={styles.inputViewStyle} placeholder={"Confirm Password"} placeholderTextColor={COLORS.placeHolderColor} value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)}
                            addRight={<Feather name={showConfirmPassword ? "eye-off" : "eye"} color={COLORS.white} size={20} />}
                            onPressRight={() => setShowConfirmPassword(!showConfirmPassword)}
                            secureTextEntry={showConfirmPassword}
                        />
                        {confirmPassword && confirmPasswordErr ? <Text style={styles.errText}>{confirmPasswordErr}</Text> : null}

                        <Buttons styleButton={styles.styleButton} onPress={updateFun} title={"Update"} />

                    </View>
                </ScrollView>
                {
                    loading ? <View style={styles.loadingStyle}>
                        <ActivityIndicator color={COLORS.blue} size={70} />
                    </View> : null
                }
            </ImageBackground>
        </View>
    );
}
export default ForgetPassword;