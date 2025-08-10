import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import Input from '../../components/Input';
import { COLORS } from '../../enums/fontStyles';
import { useNavigation } from '@react-navigation/native';
import Feather from "react-native-vector-icons/Feather";
import Buttons from '../../components/Buttons';
import { launchImageLibrary } from 'react-native-image-picker';
import { isEmailValid, isStrongPassword } from '../../utills/Helper';
import { SignupApi } from '../../apis';

const Signup = () => {
    const navigation = useNavigation();

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const [loading, setLoading] = useState(false);

    const [firstErr, setFirstErr] = useState("");
    const [lastErr, setLastErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [descriptionErr, setDescriptionErr] = useState("");
    const [profileErr, setProfileErr] = useState("");
    const [coverErr, setCoverErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

    useEffect(() => {
        if (first.trim() === "") {
            setFirstErr("Enter first name");
            setLoading(false);
            return
        }
        setFirstErr("");

        if (last.trim() === "") {
            setLastErr("Enter last name");
            setLoading(false);
            return
        }
        setLastErr("");


        if (email.trim() === "") {
            setEmailErr("Enter your email")
            setLoading(false);
            return
        }
        if (!isEmailValid(email)) {
            setEmailErr("Enter valid email")
            setLoading(false);
            return
        }
        setEmailErr("");

        if (description.trim() === "") {
            setDescriptionErr("Write your bio");
            setLoading(false);
            return;
        }
        setDescriptionErr("");

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
    }, [first, last, email, description, profileImg, coverImg, password, confirmPassword])

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setProfileImg(imageUri);
            }
        });
    };

    const openImagePickerCover = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setCoverImg(imageUri);
            }
        });
    };

    const signUpFun = async () => {
        try {
            setLoading(true)
            if (firstErr || lastErr || emailErr || descriptionErr || passwordErr || confirmPasswordErr || !profileImg || !coverImg) {
                setLoading(false);
                return Alert.alert("Oops", "Check the errors")
            }
            if (first && last && email && description && profileImg && coverImg && password && confirmPassword) {
                const formdata = new FormData();
                formdata.append("firstName", first),
                    formdata.append("lastName", last),
                    formdata.append("email", email),
                    formdata.append("description", description),
                    formdata.append("image", {
                        uri: profileImg,
                        name: "profile.png",
                        type: "photo/png"
                    }),
                    formdata.append("coverImage", {
                        uri: coverImg,
                        name: "cover.png",
                        type: "photo/png"
                    }),
                    formdata.append("password", password),
                    formdata.append("confirmPassword", confirmPassword)
                console.log(formdata)
                console.log(SignupApi)
                const response = await fetch(SignupApi, {
                    method: "post",
                    headers: {
                        'Content-type': 'multipart/form-data'
                    },
                    body: formdata
                })
                console.log(response)
                const data = await response.json();
                console.log(data)

                if (data.response === "ok") {
                    setLoading(false);
                    navigation.navigate("Login")
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", data.result)
                }

            }
            else {
                setLoading(false);
                Alert.alert("Oops", "some data is missing")
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
            <ImageBackground style={styles.backImageStyle} source={IMAGES.BackImage}>
                <ScrollView>
                    <View style={styles.innerContainer}>
                        <Image style={styles.imageStyle} resizeMode='contain' source={IMAGES.MainLogo} />
                        <Text style={styles.signUpText}>Sign up</Text>

                        <Input inputViewStyle={styles.inputViewStyle} placeholder={"First name"} placeholderTextColor={COLORS.placeHolderColor} value={first} onChangeText={(text) => setFirst(text)} />
                        {first && firstErr ? <Text style={styles.errText}>{firstErr}</Text> : null}
                        <Input inputViewStyle={styles.inputViewStyle} placeholder={"Last name"} placeholderTextColor={COLORS.placeHolderColor} value={last} onChangeText={(text) => setLast(text)} />
                        {last && lastErr ? <Text style={styles.errText}>{lastErr}</Text> : null}
                        <Input inputViewStyle={styles.inputViewStyle} placeholder={"Email/phone number"} placeholderTextColor={COLORS.placeHolderColor} value={email} onChangeText={(text) => setEmail(text)} />
                        {email && emailErr ? <Text style={styles.errText}>{emailErr}</Text> : null}
                        <Input inputViewStyle={styles.inputViewStyle} placeholder={"Bio..."} placeholderTextColor={COLORS.placeHolderColor} value={description} onChangeText={(text) => setDescription(text)} />
                        {description && descriptionErr ? <Text style={styles.errText}>{descriptionErr}</Text> : null}

                        <View style={styles.outerBoxStyle}>
                            <View style={styles.boxStyle}>
                                <TouchableOpacity onPress={openImagePicker}
                                    style={styles.innerBoxStyle}>
                                    {profileImg ? <Image style={styles.profileImageStyle} source={{ uri: profileImg }} /> : <Text style={styles.textStyle}>Profile Photo</Text>}
                                </TouchableOpacity>
                                {profileErr != "" ? <Text style={styles.errText}>{profileErr}</Text> : null}
                            </View>
                            <View style={styles.boxStyle}>
                                <TouchableOpacity onPress={openImagePickerCover}
                                    style={styles.innerBoxStyle}>
                                    {coverImg ? <Image style={styles.profileImageStyle} source={{ uri: coverImg }} /> : <Text style={styles.textStyle}>Cover Photo</Text>}
                                </TouchableOpacity>
                                {coverErr ? <Text style={styles.errText}>{coverErr}</Text> : null}
                            </View>
                        </View>
                        <Input inputViewStyle={styles.inputViewStyle} placeholder={"Password"} placeholderTextColor={COLORS.placeHolderColor} value={password} onChangeText={(text) => setPassword(text)}
                            addRight={<Feather name={showPassword ? "eye-off" : "eye"} color={COLORS.white} size={20} />}
                            onPressRight={() => setShowPassword(!showPassword)}
                            secureTextEntry={showPassword}
                        />
                        {password && passwordErr ? <Text style={styles.errText}>{passwordErr}</Text> : null}

                        <Input inputViewStyle={styles.inputViewStyle} placeholder={"Confirm Password"} placeholderTextColor={COLORS.placeHolderColor} value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)}
                            addRight={<Feather name={showConfirmPassword ? "eye-off" : "eye"} color={COLORS.white} size={20} />}
                            onPressRight={() => setShowConfirmPassword(!showConfirmPassword)}
                            secureTextEntry={showConfirmPassword}
                        />
                        {confirmPassword && confirmPasswordErr ? <Text style={styles.errText}>{confirmPasswordErr}</Text> : null}


                        <Buttons onPress={signUpFun} styleButton={styles.styleButton} title={"Sign up"} />

                        <View style={styles.noAccountView}>
                            <Text style={styles.noAccountText}>Already have an account ?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.bottomSignUpText}>Sign in</Text>
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
export default Signup;