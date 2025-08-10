import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import { COLORS } from '../../enums/fontStyles';
import { followers } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { baseUrl, followerApi, getUsers, searchUsers } from '../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListFollowers = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [followStates, setFollowStates] = useState({}); // { userId: true/false }

    const handleFollowToggle = async ({ item }) => {
        try {
            const targetUserId = item._id;
            let userData = await AsyncStorage.getItem("user");
            userData = JSON.parse(userData);
            const currentUserId = userData._id;

            const res = await fetch(followerApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    targetUserId,
                    currentUserId
                })
            });

            const data = await res.json();
            if (res.ok) {
                setFollowStates(prev => ({
                    ...prev,
                    [targetUserId]: data.followed
                }));
                await AsyncStorage.setItem(`follow_${targetUserId}`, JSON.stringify(data.followed));
            } else {
                Alert.alert("Oops", data.message);
            }
        } catch (err) {
            console.log("Follow API error:", err);
        }
    };

    useEffect(() => {
        const loadFollowStates = async () => {
            let states = {};
            for (let user of listUsers) {
                const stored = await AsyncStorage.getItem(`follow_${user._id}`);
                if (stored !== null) {
                    states[user._id] = JSON.parse(stored);
                }
            }
            setFollowStates(states);
        };
        if (listUsers.length > 0) loadFollowStates();
    }, [listUsers]);

    const getUserData = async () => {
        try {
            setLoading(true)
            let data = await fetch(getUsers);
            data = await data.json();
            console.log(data)
            if (data.response === "ok") {
                setLoading(false);
                setListUsers(data.result)
            }
            else {
                setLoading(false)
                Alert.alert("Oops", data.result)
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
        if (!search) {
            getUserData();
        }
    }, [search])

    const searchItems = async (text) => {
        setLoading(true)
        setSearch(text)
        if (text) {
            let data = await fetch(searchUsers + `/${text}`);
            data = await data.json();

            if (data.response === "ok") {
                setLoading(false);
                setListUsers(data.result)
            }
            else {
                setLoading(false)
                setListUsers([])
            }
        }
    }

    const renderItem = ({ index, item }) => {
        const image = baseUrl + `/${item.image.replace("\\", "/")}`;
        return (
            <TouchableOpacity onPress={() => navigation.navigate("FollowerProfile", { item })}
                style={[styles.followers, index === listUsers.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.leftView}>
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

                    <View>
                        <Text style={styles.nameText}>{item.firstName + " " + item.lastName}</Text>
                        <Text style={styles.descriptionText}>{item.description.length > 30
                            ? `${item.description.substring(0, 35)}...`
                            : item.description}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleFollowToggle({ item })}
                    style={styles.followButton}>
                    <Text style={styles.followText}>{followStates[item._id] ? "Following" : "Follow"}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImageStyle} source={IMAGES.BackImage}>
                <ScrollView>
                    <View style={styles.innerContainer}>

                        <View style={styles.headerView}>
                            <View style={styles.inputView}>
                                <Image style={styles.searchImage} source={IMAGES.SearchIcon} />
                                <TextInput style={styles.inputStyle}
                                    placeholder='Explore...'
                                    placeholderTextColor={COLORS.white}
                                    value={search}
                                    onChangeText={(text) => searchItems(text)}
                                />
                            </View>
                            <TouchableOpacity>
                                <Image style={styles.bellStyle} source={IMAGES.BellWhite} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.registeredText}>Registered users</Text>

                        <View>
                            {
                                listUsers.length > 0 ? <FlatList
                                    data={listUsers}
                                    renderItem={renderItem}
                                    contentContainerStyle={{ gap: 10, marginTop: "4%", marginBottom: "32%" }}
                                /> : <View style={styles.noDataView}>
                                    <Text style={styles.noDataText}>{search ? "No data found in search" : "No data found"}</Text>
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
export default ListFollowers;