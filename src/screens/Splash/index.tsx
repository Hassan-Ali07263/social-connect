import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Login")
        }, 1500);
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={IMAGES.BackImage} style={styles.backImageStyle}>
                <Image source={IMAGES.MainLogo} resizeMode='contain' style={styles.logoImage} />
            </ImageBackground>
        </View>
    );
}
export default Splash;