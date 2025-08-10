import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { comment, posts } from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS } from '../enums/fontStyles';
import { IMAGES } from '../assets/images';
import Input from './Input';
import Feather from "react-native-vector-icons/Feather";
import { baseUrl, getPosts, likeDislikePost, postComment } from '../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePosts = () => {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState('');
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [modalImg, setModalImg] = useState('');
    const [modalPost, setModalPost] = useState('');
    const [message, setMessage] = useState('');


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getPostData = async () => {
        try {
            setLoading(true)
            let getId = await AsyncStorage.getItem("user");
            getId = await JSON.parse(getId);
            console.log("logined user", getId)
            setUserId(getId._id)

            const token = await AsyncStorage.getItem("token");
            let data = await fetch(getPosts, {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            data = await data.json();
            if (data.response === "ok") {
                setLoading(false)
                const shuffledPosts = shuffleArray(data.result);
                setPostData(shuffledPosts);
            }
            else {
                setLoading(false)
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

    useEffect(() => {
        getPostData();
    }, [])

    const handleLikeToggle = async (postId) => {
        try {
            const res = await fetch(likeDislikePost + `/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId })
            });

            const result = await res.json();
            if (result.response === "ok") {
                // Update likes locally
                const updatedPosts = postData.map(post => {
                    if (post._id === postId) {
                        return { ...post, likes: result.likes };
                    }
                    return post;
                });
                setPostData(updatedPosts);
            }
        } catch (error) {
            console.log("Like error:", error);
        }
    }

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const renderItems = ({ item }) => {
        const image = baseUrl + `/${item.image.replace("\\", "/")}`;
        const postImage = baseUrl + `/${item.post.replace("\\", "/")}`;

        return (
            <View style={styles.mainContainer}>

                <View style={styles.imageContainer}>
                    <View style={styles.innerImageContainer}>
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
                        <View style={styles.nameView}>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <Text style={styles.timeStyle}>{formatTime(item.time)}</Text>
                        </View>
                    </View>
                    {/* <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity> */}
                </View>

                <Text style={styles.descriptionText}>{item.caption}</Text>
                <Text style={styles.descriptionText}>{item.question}</Text>

                <Text style={styles.hashTagsText}>{item.hashtags}</Text>

                <Image style={styles.uploadedImageStyle} source={{ uri: postImage }} />

                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={() => handleLikeToggle(item._id)}>
                        <Image style={styles.heartImageStyle} source={item.likes.includes(userId) ? IMAGES.Like : IMAGES.DisLike} />
                    </TouchableOpacity>
                    <Text style={styles.likeText}>{item.likes.length}</Text>
                    <TouchableOpacity onPress={() => modalFun({ item })}>
                        <Image style={styles.commentImage} source={IMAGES.Comments} />
                    </TouchableOpacity>
                    <Text style={styles.likeText}>{item.comments.length}</Text>
                </View>

            </View>
        )
    }

    const commentsFun = ({ item }) => {
        const image = baseUrl + `/${item.image.replace("\\", "/")}`;
        return (
            <View style={styles.commentContainer}>
                <LinearGradient
                    colors={COLORS.gradientColor}
                    start={COLORS.gradientStart}
                    end={COLORS.gradientEnd}
                    style={styles.gradientCommentBorder}
                >
                    <View style={styles.imageWrapper}>
                        <Image style={styles.commenterImage} source={{ uri: image }} />
                    </View>
                </LinearGradient>

                <View style={styles.commentOuterView}>
                    <View style={styles.commentView}>
                        <Text style={styles.commenterNameText}>{item.name}</Text>
                        <Text style={styles.commentDescription}>{item.text}</Text>
                    </View>
                    <Text style={styles.timeText}>{formatTime(item.timestamp)}</Text>
                </View>
            </View>
        )
    }

    const modalFun = ({ item }) => {
        setOpen(true)
        console.log(item)
        setModalData(item)
        const image = baseUrl + `/${item.image.replace("\\", "/")}`;
        const postImage = baseUrl + `/${item.post.replace("\\", "/")}`;
        setModalImg(image);
        setModalPost(postImage);
    }

    const handleAddComment = async (modalData, text) => {
        try {
            if (text.trim() === "") {
                return Alert.alert("write some comment")
            }
            // const token = await AsyncStorage.getItem("token");
            const postId = modalData._id;
            const getData = await AsyncStorage.getItem("user");
            const getId = await JSON.parse(getData);

            const name = getId.firstName + " " + getId.lastName;
            const image = getId.image

            const res = await fetch(postComment + `/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // authorization: `Bearer ${token}` // Optional if using auth
                },
                body: JSON.stringify({
                    userId,
                    name,
                    image,
                    text
                })
            });

            const result = await res.json();
            if (result.response === "ok") {
                const updatedPosts = postData.map(post => {
                    if (post._id === postId) {
                        return { ...post, comments: result.comments };
                    }
                    return post;
                });
                setPostData(updatedPosts);

                if (modalData._id === postId) {
                    setModalData(prev => ({
                        ...prev,
                        comments: result.comments
                    }));
                }

                setMessage(''); // Clear input
            } else {
                console.warn(result.message);
            }
        } catch (err) {
            console.error("Comment failed:", err);
        }
    }


    return (
        <View>
            {
                postData.length > 0 ? <FlatList
                    data={postData}
                    renderItem={renderItems}
                    contentContainerStyle={{ gap: 15, marginHorizontal: "5%", marginBottom: "30%", marginTop: "5%" }}
                /> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.noDataText}>No data found</Text>
                </View>
            }
            {
                <Modal visible={open} transparent animationType={"slide"}>
                    <KeyboardAvoidingView style={styles.modalOuterContainer}>
                        <View style={styles.modalTopInnerContainer}>
                            <View style={styles.imageContainer}>
                                <View style={styles.innerImageContainer}>
                                    <LinearGradient
                                        colors={COLORS.gradientColor}
                                        start={COLORS.gradientStart}
                                        end={COLORS.gradientEnd}
                                        style={styles.gradientBorder}
                                    >
                                        <View style={styles.imageWrapper}>
                                            <Image style={styles.storyImage} source={{ uri: modalImg }} />
                                        </View>
                                    </LinearGradient>
                                    <View style={styles.nameView}>
                                        <Text style={styles.nameText}>{modalData.name}</Text>
                                        <Text style={styles.timeStyle}>{formatTime(modalData.time)}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => setOpen(false)}
                                    style={styles.followButton}>
                                    <Text style={styles.followText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                            <Image style={styles.coverImage} source={{ uri: modalPost }} />
                        </View>
                        <View style={styles.modalInnerContainer}>
                            {
                                modalData.comments?.length > 0 ? (
                                    <FlatList
                                        data={modalData.comments}
                                        renderItem={commentsFun}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                ) : (
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.noCommentTExt}>No comments</Text>
                                    </View>
                                )
                            }
                            <View style={styles.sendView}>
                                <Input inputViewStyle={styles.inputViewStyle}
                                    placeholder={"Massage..."}
                                    placeholderTextColor={COLORS.placeHolderColor}
                                    value={message}
                                    onChangeText={(text) => setMessage(text)}
                                />
                                <TouchableOpacity onPress={() => handleAddComment(modalData, message)}
                                    style={styles.sendButton}>
                                    <Feather name={"send"} color={COLORS.white} size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            }
            {
                loading ? <View style={styles.loadingStyle}>
                    <ActivityIndicator color={COLORS.blue} size={70} />
                </View> : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    imageContainer: {
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "5%"
    },
    innerImageContainer: {
        flexDirection: "row",
    },
    mainContainer: {
        backgroundColor: "rgba(109,74,205,.5)",
        borderRadius: 20,
        paddingHorizontal: "5%",
        paddingVertical: "4%"
    },
    storyImage: {
        height: 46,
        width: 46,
        borderRadius: 58,
    },
    commenterImage: {
        height: 41,
        width: 41,
        borderRadius: 58,
    },
    gradientBorder: {
        padding: 1.5,
        borderRadius: 50,
    },
    gradientCommentBorder: {
        padding: 1.5,
        borderRadius: 50,
        alignSelf: "flex-start"
    },
    imageWrapper: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    timeStyle: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.white
    },
    nameText: {
        fontFamily: FONTS.medium,
        fontSize: 15,
        color: COLORS.white
    },
    nameView: {
        marginHorizontal: "3%"
    },
    followText: {
        fontFamily: FONTS.medium,
        fontSize: 12,
        color: COLORS.white
    },
    followButton: {
        height: 30,
        backgroundColor: COLORS.buttonBlue,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "5%",
        borderRadius: 8,
    },
    descriptionText: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.white,
        lineHeight: 15
    },
    hashTagsText: {
        fontFamily: FONTS.medium,
        fontSize: 11,
        color: COLORS.white_1,
        marginTop: "2%"
    },
    uploadedImageStyle: {
        height: 210,
        width: "100%",
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 20,
        marginVertical: "4%"
    },
    commentImage: {
        height: 24,
        width: 24
    },
    likeText: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.white,
        marginLeft: "2%",
        marginRight: "3%",
        lineHeight: 26
    },
    heartImageStyle: {
        height: 24,
        width: 24
    },
    bottomView: {
        flexDirection: "row",
        alignItems: "center"
    },
    modalInnerContainer: {
        // height: "65%",
        backgroundColor: COLORS.blue_2,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: "5%",
        flex: 1,
    },
    modalOuterContainer: {
        flex: 1,
        backgroundColor: COLORS.blue_1,
        justifyContent: "space-between",
        // marginTop: "10%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderWidth: 1,
        borderColor: COLORS.white_1,
        elevation: 10
    },
    modalTopInnerContainer: {
        paddingHorizontal: "5%",
        paddingTop: "5%"
    },
    commentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: "5%",
    },
    timeText: {
        fontFamily: FONTS.regular,
        fontSize: 13,
        color: COLORS.white_2,
        marginVertical: "2%",
        marginLeft: "3%"
    },
    commentDescription: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.blue_1
    },
    commenterNameText: {
        fontFamily: FONTS.semibold,
        fontSize: 13,
        color: COLORS.blue_1
    },
    commentView: {
        backgroundColor: COLORS.white_3,
        paddingHorizontal: "3%",
        width: "90%",
        paddingVertical: "2%",
        borderRadius: 17
    },
    commentOuterView: {
        marginLeft: "3%",
        width: "90%",
    },
    sendButton: {
        height: 53,
        width: 53,
        borderRadius: 53,
        backgroundColor: COLORS.buttonBlue,
        justifyContent: "center",
        alignItems: "center"
    },
    sendView: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "5%",
        justifyContent: "space-between",
        marginVertical: "1%",
    },
    inputViewStyle: {
        width: "81%",
    },
    loadingStyle: {
        flex: 1,
        position: "absolute",
        alignSelf: "center",
        top: "50%"
    },
    noDataText: {
        fontFamily: FONTS.medium,
        fontSize: 18,
        color: COLORS.white,
        marginVertical: "50%"
    },
    coverImage: {
        height: 150,
        width: "100%",
        alignSelf: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.white,
        overflow: "hidden",
        marginBottom: "2%"
    },
    noCommentTExt: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.white,
        alignSelf: "center",
        marginVertical: "10%"
    }

})
export default HomePosts;