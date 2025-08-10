import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import Input from '../../components/Input';
import { COLORS } from '../../enums/fontStyles';
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import Buttons from '../../components/Buttons';
import { isEmailValid, isStrongPassword } from '../../utills/Helper';
import { LoginApi } from '../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (email.trim() === "") {
            setEmailErr("Enter your email");
            setLoading(false)
            return
        }
        if (!isEmailValid(email)) {
            setEmailErr("Invalid email");
            setLoading(false)
            return
        }
        setEmailErr("");

        if (password.trim() === "") {
            setPasswordErr("Enter your password")
            setLoading(false)
            return
        }
        if (!isStrongPassword(password)) {
            setPasswordErr("Password must be at least 6 characters long");
            setLoading(false);
            return
        }
        setPasswordErr("");

    }, [email, password])

    const loginFun = async () => {
        try {
            setLoading(true)
            if (email === "" || password === "") {
                setLoading(false);
                return Alert.alert("Oops", "Some data is missing")
            }

            if (emailErr || passwordErr) {
                setLoading(false);
                return Alert.alert("Oops", "Enter correct data")
            }

            if (email && password) {
                let data = await fetch(LoginApi, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                })
                data = await data.json();
                console.log(data)

                if (data.response === "ok") {
                    await AsyncStorage.setItem("user", JSON.stringify(data.result));
                    await AsyncStorage.setItem("token", data.auth);
                    setLoading(false)
                    navigation.navigate("BottomTabs")
                }
                else {
                    setLoading(false)
                    return Alert.alert("Oops", data.result)
                }

            }
            else {
                setLoading(false)
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
            <ImageBackground style={styles.backImageStyle} source={IMAGES.BackImage}>
                <ScrollView>
                    <View style={styles.innerView}>

                        <Image style={styles.logoImageStyle} resizeMode='contain' source={IMAGES.MainLogo} />

                        <Text style={styles.signInText}>Sign in</Text>
                        <Input value={email} onChangeText={(text) => setEmail(text)} placeholder={"Email/phone number"} placeholderTextColor={COLORS.placeHolderColor} />
                        {email && emailErr ? <Text style={styles.errText}>{emailErr}</Text> : null}
                        <Input inputViewStyle={styles.inputViewStyle} value={password} onChangeText={(text) => setPassword(text)} placeholder={"Password"} placeholderTextColor={COLORS.placeHolderColor} secureTextEntry={show}
                            addRight={<Feather name={show ? "eye-off" : "eye"} color={COLORS.white} size={20} />}
                            onPressRight={() => setShow(!show)}
                        />
                        {password && passwordErr ? <Text style={styles.errText}>{passwordErr}</Text> : null}

                        <TouchableOpacity onPress={() => navigation.navigate("EmailVerification")}
                            style={styles.forgetButton}>
                            <Text style={styles.forgetPasswordText}>Forgot password</Text>
                        </TouchableOpacity>

                        <Buttons onPress={loginFun} title={"Sign in"} />

                        <View style={styles.noAccountView}>
                            <Text style={styles.noAccountText}>Don’t have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <Text style={styles.signUpText}>Sign up</Text>
                            </TouchableOpacity>
                        </View>

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
export default Login;