import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image, FlatList, Modal, Alert } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, getProfilePosts } from '../../apis';

const Profile = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [profileImg, setProfileImg] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const [userName, setUserName] = useState('');
    const [description, setdescription] = useState('');

    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState([]);
    const [followersCount, setFollowersCount] = useState('');
    const [followingCount, setFollowingCount] = useState('');

    const getProfileData = async () => {
        try {
            setLoading(true);
            let userData = await AsyncStorage.getItem("user")
            userData = await JSON.parse(userData);
            const profilepic = baseUrl + `/${userData.image.replace("\\", "/")}`;
            const coverPic = baseUrl + `/${userData.coverImage.replace("\\", "/")}`
            setProfileImg(profilepic);
            setCoverImg(coverPic)
            setUserName(userData.firstName + " " + userData.lastName);
            setdescription(userData.description);
            setFollowersCount(userData.followers.length);
            setFollowingCount(userData.following.length)
            let getData = await fetch(getProfilePosts + `/${userData._id}`, {
                method: "GET"
            })

            getData = await getData.json();
            if (getData.response === "ok") {
                setLoading(false)
                setPostData(getData.result);
            }
            else {
                setLoading(false)
            }
        }
        catch (err) {
            setLoading(false);
            Alert.alert("Error" + err);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfileData();
    }, [])


    const renderItems = ({ item }) => {
        const image = baseUrl + `/${item.post.replace("\\", "/")}`;
        return (
            <TouchableOpacity onPress={() => {
                setSelectedImage(image);
                setModalVisible(true);
            }}
                style={styles.postButton}>
                <Image style={styles.postImageStyle} source={{ uri: image }} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={IMAGES.BackImage}>
                <ScrollView>
                    <View style={{ flex: 1 }}>

                        <View style={styles.coverIMageView}>
                            <ImageBackground source={coverImg ? { uri: coverImg } : IMAGES.CoverPhoto} style={styles.coverIMageStyle}>
                            </ImageBackground>
                            <Image style={styles.profileImage} source={profileImg ? { uri: profileImg } : IMAGES.UploadedImage} />
                        </View>

                        <Text style={styles.nameText}>{userName}</Text>
                        <Text style={styles.descriptionText}>{description.length > 30
                            ? `${description.substring(0, 35)}...`
                            : description}</Text>


                        <View style={styles.outerCountView}>
                            <View style={styles.countView}>
                                <Text style={styles.headerText}>{postData.length > 0 ? postData.length : 0}</Text>
                                <Text style={styles.subHeadingText}>Post</Text>
                            </View>
                            <View style={styles.countCenterView}>
                                <Text style={styles.headerText}>{followersCount}</Text>
                                <Text style={styles.subHeadingText}>Followers</Text>
                            </View>
                            <View style={styles.countView}>
                                <Text style={styles.headerText}>{followingCount}</Text>
                                <Text style={styles.subHeadingText}>Following</Text>
                            </View>
                        </View>

                        <View style={styles.bottomLineView} />

                        <View>
                            {
                                postData.length > 0 ? <FlatList
                                    data={postData}
                                    renderItem={renderItems}
                                    keyExtractor={(item) => item._id.toString()}
                                    numColumns={2}
                                    contentContainerStyle={{ marginHorizontal: "3%", marginTop: "3%", marginBottom: "32%" }}
                                />:<Text style={styles.noPostText}>No posts yet.</Text>
                            }
                        </View>

                        {
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <View style={styles.modalContainer}>
                                    <TouchableOpacity
                                        style={styles.closeArea}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        }

                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
export default Profile;