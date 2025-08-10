import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import Buttons from '../../components/Buttons';
import Input from '../../components/Input';
import { COLORS } from '../../enums/fontStyles';
import { isEmailValid } from '../../utills/Helper';
import { sendOtp } from '../../apis';

const EmailVerification = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (email.trim() === "") {
            setEmailErr("Enter your email")
            setLoading(false)
            return
        }
        if (!isEmailValid(email)) {
            setEmailErr("Invalid email")
            setLoading(false);
            return;
        }
        setEmailErr("")
    }, [email])

    const recoverFun = async () => {
        try {
            setLoading(true)
            if (email && emailErr === "") {
                let data = await fetch(sendOtp, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                })
                data = await data.json();

                if (data.response === "ok") {
                    setLoading(false)
                    navigation.navigate("OtpVerification", { email })
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", data.result)
                }
            }
            else {
                Alert.alert("Oops", "Enter correct email")
            }
        }
        catch (err) {
            setLoading(false);
            Alert.alert("Error" + err)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImageStyle} source={IMAGES.BackImage}>
                <ScrollView>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}
                            style={styles.backButtonStyle}>
                            <Image style={styles.arrowBackStyle} source={IMAGES.BackArrow} />
                        </TouchableOpacity>

                        <Text style={styles.headingText}>Forgot password?</Text>
                        <Text style={styles.subHeadingText}>Enter your email and we’ll send you the Otp and instructions on how to reset your password.</Text>

                        <Input inputViewStyle={styles.inputStyle}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder={"Enter your email address"}
                            placeholderTextColor={COLORS.placeHolderColor}
                        />
                        {email && emailErr ? <Text style={styles.errText}>{emailErr}</Text> : null}

                        <Buttons onPress={recoverFun} styleButton={styles.styleButton} title={"Recover Password"} />
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
export default EmailVerification;