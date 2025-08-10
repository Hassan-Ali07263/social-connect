import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import { useNavigation, useRoute } from '@react-navigation/native';
import Buttons from '../../components/Buttons';
import { PostData } from '../../constants';
import { baseUrl, getProfilePosts } from '../../apis';

const FollowerProfile = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { item } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState('');
  const [cover, setCover] = useState('');
  const [profilePics, setProfilePics] = useState('');

  const getImages = async () => {
    let data = await fetch(getProfilePosts + `/${item._id}`);
    data = await data.json();

    if (data.response === "ok") {
      setProfilePics(data.result)
    }
  }

  useEffect(() => {
    const img = baseUrl + `/${item.image.replace("\\", "/")}`;
    const cover = baseUrl + `/${item.coverImage.replace("\\", "/")}`;
    setCover(cover);
    setImage(img);

    getImages();

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
              <ImageBackground source={{ uri: cover }} style={styles.coverIMageStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                  style={styles.backButton}>
                  <Image style={styles.imageStyle} source={IMAGES.BackArrow} />
                </TouchableOpacity>
              </ImageBackground>
              <Image style={styles.profileImage} source={{ uri: image }} />
            </View>

            <Text style={styles.nameText}>{item.firstName + " " + item.lastName}</Text>
            <Text style={styles.descriptionText}>{item.description.length > 30
              ? `${item.description.substring(0, 35)}...`
              : item.description}</Text>

            <View style={styles.outerCountView}>
              <View style={styles.countView}>
                <Text style={styles.headerText}>{profilePics.length}</Text>
                <Text style={styles.subHeadingText}>Post</Text>
              </View>
              <View style={styles.countCenterView}>
                <Text style={styles.headerText}>{item.followers.length}</Text>
                <Text style={styles.subHeadingText}>Followers</Text>
              </View>
              <View style={styles.countView}>
                <Text style={styles.headerText}>{item.following.length}</Text>
                <Text style={styles.subHeadingText}>Following</Text>
              </View>
            </View>

            <Buttons styleButton={styles.styleButton} title={"Follow"} />
            <View style={styles.bottomLineView} />

            <View>
              {
                <FlatList
                  data={profilePics}
                  renderItem={renderItems}
                  keyExtractor={(item) => item._id.toString()}
                  numColumns={2}
                  contentContainerStyle={{ marginHorizontal: "3%", marginVertical: "3%" }}
                />
              }

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

          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
export default FollowerProfile