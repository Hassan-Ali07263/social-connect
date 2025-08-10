import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Modal, Alert } from 'react-native';
import { storiesData } from '../constants';
import { COLORS, FONTS } from '../enums/fontStyles';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../assets/images';
import { allStories, baseUrl, getYourStory, postStory } from '../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from './Buttons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const Stories = () => {
    const [profilePic, setProfilePic] = useState('');
    const [open, setOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [storyImage, setStoryImage] = useState('');
    const [storyList, setStoryList] = useState([]);
    const [modalImg, setModalImg] = useState('');
    const [storyModal, setStoryModal] = useState(false);

    const getProfilePic = async () => {
        let userData = await AsyncStorage.getItem("user")
        userData = await JSON.parse(userData);
        console.log(userData)
        const profilepic = baseUrl + `/${userData.image.replace("\\", "/")}`;
        setProfilePic(profilepic)
        const userId = userData._id;

        let data = await fetch(getYourStory + `/${userId}`, {
            method: "GET"
        })
        data = await data.json();
        if (data.response === "ok") {
            const image = baseUrl + `/${data.result.image.replace("\\", "/")}`;
            console.log(image)
            setStoryImage(image)
        }
        else {
            setStoryImage("");
        }
    }

    const getAllStories = async () => {
        let userData = await AsyncStorage.getItem("user")
        userData = await JSON.parse(userData);
        console.log(userData)
        const userId = userData._id;
        console.log(userId)

        let data = await fetch(allStories + `/${userId}`, {
            method: "GET"
        });
        data = await data.json();
        console.log(data)
        if (data.response === "ok") {
            setStoryList(data.result)
            console.log(data.result)
        }
        else {
            setStoryList([])
        }
    }

    useEffect(() => {
        getProfilePic();
        getAllStories();
    }, [])

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
                setImg(imageUri);
            }
        });
    };

    const handleCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImg(imageUri);
                console.log(imageUri);
            }
        });
    }

    const uploadFun = async () => {
        try {
            setLoading(true)
            if (!img) {
                setLoading(false);
                return Alert.alert("Oops", "Looks like you don;t select an image")
            }
            let userData = await AsyncStorage.getItem("user")
            userData = await JSON.parse(userData);
            console.log(userData)

            const formdata = new FormData();

            formdata.append("userId", userData._id),
                formdata.append("name", userData.firstName + " " + userData.lastName),
                formdata.append("image", {
                    uri: img,
                    name: "image.png",
                    type: "image/png"
                })

            let data = await fetch(postStory, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: formdata
            })
            console.log(data)
            data = await data.json();
            console.log(data)
            if (data.response === "ok") {
                setLoading(false);
                setOpen(false);
                setImg('');
                getProfilePic();
                getAllStories();
                Alert.alert("Congrats", "Story uploaded successfully")
            }
            else {
                setLoading(false);
                Alert.alert("Oops", data.result);
            }
        }
        catch (err) {
            setLoading(false);
            Alert.alert("Error" + err)
        }
        finally {
            setLoading(false)
        }
    }

    const renderItems = ({ item }) => {
        const image = baseUrl + `/${item.image.replace("\\", "/")}`;
        return (
            <TouchableOpacity onPress={() => openModalFun(image)}
                style={styles.buttonStyle}>
                <LinearGradient
                    colors={COLORS.gradientColor}
                    start={COLORS.gradientStart}
                    end={COLORS.gradientEnd}
                    style={styles.gradientBorder}
                >
                    <View style={styles.imageWrapper}>
                        <Image style={styles.storyImage} source={{ uri: image }} />
                    </View>
                </LinearGradient>
                <Text style={styles.nameText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const openModalFun = (image) => {
        setModalImg(image);
        setStoryModal(true);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={storyImage ? () => setIsModalVisible(true) : () => setOpen(true)}
                style={styles.buttonStyle}>
                <LinearGradient
                    colors={storyImage ? COLORS.storyColor : COLORS.gradientColor}
                    start={COLORS.gradientStart}
                    end={COLORS.gradientEnd}
                    style={styles.gradientBorder}
                >
                    <View style={styles.imageWrapper}>
                        <Image style={styles.storyImage} source={storyImage ? { uri: storyImage } : { uri: profilePic }} />
                    </View>
                </LinearGradient>
                <Text style={styles.nameText}>You</Text>
                <Image style={styles.addImage} resizeMode='contain' source={IMAGES.AddStory} />
            </TouchableOpacity>
            {
                <FlatList
                    data={storyList}
                    renderItem={renderItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10, marginLeft: "5%", paddingRight: "10%", elevation: 5 }}
                />
            }
            {
                <Modal visible={open} transparent animationType={'slide'}>
                    <View style={styles.outerModalView}>
                        <View style={styles.innerModalView}>
                            <TouchableOpacity onPress={() => {
                                setOpen(false)
                                setLoading(false)
                                setImg('')
                            }}
                                style={styles.closeButton}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>

                            <View style={styles.imageView}>
                                {img ? <Image style={styles.imageStyle} source={{ uri: img }} /> : <Text style={styles.selectImageText}>Select an image</Text>}
                            </View>

                            <View style={styles.buttonView}>
                                <Buttons onPress={handleCameraLaunch} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Camera"} />
                                <Buttons onPress={openImagePicker} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Gallery"} />
                            </View>

                            <Buttons disabled={loading} onPress={uploadFun} title={loading ? "Uploading..." : "Upload"} />
                        </View>
                    </View>
                </Modal>
            }
            {
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <TouchableOpacity
                            style={styles.closeArea}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Image
                                source={{ uri: storyImage }}
                                style={styles.fullScreenImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            }
            {
                <Modal
                    visible={storyModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setStoryModal(false)}
                >
                    <View style={styles.modalBackground}>
                        <TouchableOpacity
                            style={styles.closeArea}
                            onPress={() => setStoryModal(false)}
                        >
                            <Image
                                source={{ uri: modalImg }}
                                style={styles.fullScreenImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginLeft: "5%",
        marginVertical: "1%"
    },
    storyImage: {
        height: 58,
        width: 58,
        borderRadius: 58,
    },
    gradientBorder: {
        padding: 2.5,
        borderRadius: 50,
    },
    imageWrapper: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    nameText: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.white,
        marginTop: "5%"
    },
    buttonStyle: {
        alignItems: "center"
    },
    addImage: {
        height: 16,
        width: 16,
        position: "absolute",
        bottom: "23%"
    },
    innerModalView: {
        backgroundColor: COLORS.white,
        height: "75%",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.buttonBlue,
        paddingHorizontal: "5%",
        paddingVertical: "5%"
    },
    outerModalView: {
        flex: 1,
        justifyContent: "flex-end"
    },
    closeText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.white
    },
    closeButton: {
        backgroundColor: COLORS.buttonBlue,
        alignSelf: "flex-end",
        borderRadius: 5,
        paddingHorizontal: "2%",
        paddingVertical: ".5%"
    },
    imageStyle: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
    },
    imageView: {
        height: "50%",
        borderRadius: 15,
        overflow: "hidden",
        marginVertical: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.buttonBlue
    },
    styleButton: {
        width: "45%",
        height: 45
    },
    titleStyle: {
        fontFamily: FONTS.medium,
        fontSize: 15,
        color: COLORS.white
    },
    buttonView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: "12%"
    },
    selectImageText: {
        fontFamily: FONTS.semibold,
        fontSize: 15,
        color: COLORS.buttonBlue
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeArea: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    fullScreenImage: {
        width: '90%',
        height: '80%',
    },

})
export default Stories;