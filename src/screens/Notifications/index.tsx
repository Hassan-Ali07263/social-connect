import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import { COLORS } from '../../enums/fontStyles';

const Notifications = () => {
    const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImageStyle} source={IMAGES.BackImage}>
                <ScrollView>
                    <View style={styles.innerContainer}>

                        <View style={styles.headerView}>
                            <View style={styles.inputView}>
                                <Image style={styles.searchImage} source={IMAGES.SearchIcon} />
                                <TextInput style={styles.inputStyle}
                                    placeholder='Notifications...'
                                    placeholderTextColor={COLORS.white}
                                    value={search}
                                    onChangeText={(text) => setSearch(text)}
                                />
                            </View>
                            <TouchableOpacity>
                                <Image style={styles.bellStyle} source={IMAGES.BellWhite} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.noNotificationText}>No notification yet.</Text>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
export default Notifications;