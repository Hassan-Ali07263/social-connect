import React, { useMemo, useRef, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import { useNavigation, useRoute } from '@react-navigation/native';
import Buttons from '../../components/Buttons';
import Input from '../../components/Input';
import { COLORS } from '../../enums/fontStyles';
import LinearGradient from 'react-native-linear-gradient';
import { verifyOtp } from '../../apis';

const OtpVerification = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;
    const [loading, setLoading] = useState(false);

    const length = 4;
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const fullOtp = useMemo(() => otp.join(''), [otp]);
    const inputs = useRef([]);

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const nextFun = async () => {
        try {
            setLoading(true)
            if (fullOtp && email) {
                let data = await fetch(verifyOtp, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ otp: fullOtp, email })
                })
                data = await data.json();

                if (data.response === "ok") {
                    setLoading(false)
                    navigation.navigate("ForgetPassword", { email })
                }
                else if (data.response === "failed") {
                    setLoading(false);
                    Alert.alert("Oops", data.result)
                    navigation.goBack();
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", data.result)
                }
            }
            else {
                return Alert.alert("Oops", "Some data is missing")
            }
        }
        catch (err) {
            setLoading(false)
            Alert.alert("Error" + err)
        }
        finally {
            setLoading(false)
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

                        <Text style={styles.headingText}>Enter code</Text>
                        <Text style={styles.subHeadingText}>Enter the 4-digit code we sent you at</Text>
                        <Text style={styles.subHeadingText}>{email}</Text>

                        <View style={styles.inputContainer}>
                            {otp.map((digit, index) => (
                                <LinearGradient
                                    key={index}
                                    colors={['#3B21BA', '#8E63D6', '#CB98EB']}
                                    style={styles.gradientBorder}
                                >
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            ref={el => (inputs.current[index] = el)}
                                            style={styles.input}
                                            keyboardType="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChangeText={text => handleChange(text, index)}
                                            onKeyPress={e => handleKeyPress(e, index)}
                                            textAlign="center"
                                        />
                                    </View>
                                </LinearGradient>
                            ))}
                        </View>

                        <Buttons onPress={() => nextFun()} styleButton={styles.styleButton} title={"Next"} />
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
export default OtpVerification;