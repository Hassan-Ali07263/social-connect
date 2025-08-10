import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../components/Input';
import { COLORS } from '../../enums/fontStyles';
import Buttons from '../../components/Buttons';
import { addPost } from '../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Uploading = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const { image } = route.params;

    const [caption, setCaption] = useState('');
    const [question, setQuestion] = useState('');
    const [hashtags, setHashTags] = useState('');

    const [captionErr, setCaptionErr] = useState('');
    const [questionErr, setQuestionErr] = useState('');
    const [hashtagsErr, setHashTagsErr] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (caption.trim() === "") {
            setCaptionErr("Enter some caption");
            setLoading(false)
            return
        }
        setCaptionErr("");

        if (question.trim() === "") {
            setQuestionErr("Enter the question")
            setLoading(false);
            return
        }
        setQuestionErr("");

        if (hashtags.trim() === "") {
            setHashTagsErr("Enter some hash tags")
            setLoading(false)
            return
        }
        setHashTagsErr("");

    }, [caption, question, hashtags])

    const shareFun = async () => {
        try {
            setLoading(true)
            if (captionErr != "" || questionErr != "" || hashtagsErr != "") {
                setLoading(false)
                return Alert.alert("Oops", "Enter all the data")
            }

            if (caption && question && hashtags) {
                let userData = await AsyncStorage.getItem("user")
                userData = await JSON.parse(userData);
                console.log(userData)

                const formdata = new FormData();

                formdata.append("userId", userData._id),
                    formdata.append("caption", caption),
                    formdata.append("question", question),
                    formdata.append("hashtags", hashtags),
                    formdata.append("name", userData.firstName + " " + userData.lastName),
                    formdata.append("image", userData.image),
                    formdata.append("post", {
                        uri: image,
                        name: "post.png",
                        type: "photo/png"
                    })
                console.log(formdata)

                let data = await fetch(addPost, {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: formdata
                })

                data = await data.json();
                if (data.response === "ok") {
                    setLoading(false);
                    Alert.alert("Congrats", data.result)
                    navigation.navigate("BottomTabs")
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", data.result)
                }
            }
            else {
                setLoading(false);
                Alert.alert("Oops", "Enter the missing data")
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
            <ImageBackground style={styles.backgroundImage} source={IMAGES.BackImage}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <Image style={styles.backImage} source={IMAGES.BackArrow} />
                </TouchableOpacity>
                <ScrollView>
                    <Image style={styles.imageStyle} source={{ uri: image }} />
                    <View style={styles.innerContainer}>
                        <TextInput style={styles.inputStyling}
                            placeholder='Caption...'
                            placeholderTextColor={COLORS.placeHolderColor}
                            multiline
                            value={caption}
                            onChangeText={(text) => setCaption(text)}
                        />
                        {caption && captionErr ? <Text style={styles.errText}>{captionErr}</Text> : null}

                        <TextInput style={styles.questionInputStyling}
                            placeholder='Any Question...'
                            placeholderTextColor={COLORS.placeHolderColor}
                            multiline
                            value={question}
                            onChangeText={(text) => setQuestion(text)}
                        />
                        {question && questionErr ? <Text style={styles.errText}>{questionErr}</Text> : null}

                        <TextInput style={styles.hashTagsInputStyling}
                            placeholder='Hashtags...'
                            placeholderTextColor={COLORS.placeHolderColor}
                            multiline
                            value={hashtags}
                            onChangeText={(text) => setHashTags(text)}
                        />
                        {hashtags && hashtagsErr ? <Text style={styles.errText}>{hashtagsErr}</Text> : null}

                    </View>
                </ScrollView>
                <Buttons onPress={shareFun} styleButton={styles.styleButton} title={"Share"} />
                {
                    loading ? <View style={styles.loadingStyle}>
                        <ActivityIndicator color={COLORS.blue} size={70} />
                    </View> : null
                }
            </ImageBackground>
        </View>
    );
}
export default Uploading;