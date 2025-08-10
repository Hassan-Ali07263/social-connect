import React, { useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import Buttons from '../../components/Buttons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const AddPost = () => {
    const navigation = useNavigation();

    const [img, setImg] = useState("");
    const [imgErr, setImgErr] = useState(false);

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

    const nextFun = async () => {
        if (img) {
            setImgErr(false)
            navigation.navigate("Uploading", { image: img })
        }
        else {
            setImgErr(true)
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={IMAGES.BackImage}>
                <View style={styles.imageView}>
                    {
                        img ? <Image style={styles.imageStyle} source={{ uri: img }} /> : <Text style={styles.selectText}>Select an image</Text>
                    }
                </View>
                {
                    imgErr && <Text style={styles.errorText}>Please select an image.</Text>
                }

                <View style={styles.buttonContainer}>
                    <Buttons onPress={handleCameraLaunch} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Camera"} />
                    <Buttons onPress={openImagePicker} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Gallery"} />
                </View>
                <Buttons onPress={nextFun} titleStyle={styles.titleStyle} styleButton={styles.styleNextButton} title={"Next"} />
            </ImageBackground>
        </View>
    );
}
export default AddPost;