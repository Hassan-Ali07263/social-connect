import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import { COLORS } from '../../enums/fontStyles';
import Stories from '../../components/Stories';
import HomePosts from '../../components/HomePosts';

const Home = () => {
    const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backIMageStyle} source={IMAGES.BackImage}>
                <ScrollView>
                    <View style={styles.innerContainer}>

                        <View style={styles.headerView}>
                            <View style={styles.inputView}>
                                <Image style={styles.logoIMage} resizeMode='contain' source={IMAGES.MainLogo} />
                            </View>
                            <TouchableOpacity>
                                <Image style={styles.bellStyle} source={IMAGES.BellWhite} />
                            </TouchableOpacity>
                        </View>

                        <Stories />

                        <HomePosts />

                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
export default Home;