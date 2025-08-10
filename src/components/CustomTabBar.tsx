import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { IMAGES } from '../assets/images';
import { COLORS } from '../enums/fontStyles';

const { width } = Dimensions.get('window');
const height = 70;

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const centerIndex = 2;

    const icons = [
        { active: IMAGES.Home, inactive: IMAGES.Home },
        { active: IMAGES.Follow, inactive: IMAGES.Follow },
        { active: IMAGES.Add, inactive: IMAGES.Add },
        { active: IMAGES.Bell, inactive: IMAGES.Bell },
        { active: IMAGES.Profile, inactive: IMAGES.Profile },
    ];

    return (
        <View style={styles.wrapper}>
            {/* Background Curve */}
            <View style={styles.svgContainer}>
                <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                    <Path
                        d={`
    M0 0 
    H${width / 2 - 90}
    C${width / 2 - 30} 0, ${width / 2 - 30} 50, ${width / 2} 47
    C${width / 2 + 30} 50, ${width / 2 + 30} 0, ${width / 2 + 90} 0
    H${width} V${height} H0 Z
  `}
                        fill="#E7E7E7"
                        stroke="#CFAFE1"
                        strokeWidth={2}
                    />
                </Svg>
            </View>

            {/* Tab Items */}
            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const isCenter = index === centerIndex;
                    const onPress = () => {
                        const event = navigation.emit({ type: 'tabPress', target: route.key });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const icon = icons[index].active;
                    const isSideOfCenter = index === centerIndex - 1;
                    const isRightOfCenter = index === centerIndex + 1;

                    if (isCenter) {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={onPress}
                                style={styles.centerButton}
                            >
                                <Image source={icon} style={styles.centerIcon} />
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <TouchableOpacity key={index} onPress={onPress}
                            style={[styles.tab, isSideOfCenter && { marginRight: 30 }, isRightOfCenter && { marginLeft: 30 }]}>
                            <Image source={icon} style={styles.icon} />
                            {isFocused && <View style={styles.underline} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 70,
        alignItems: 'center',
    },
    svgContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: 'hidden',
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: "#CFAFE1"
    },
    tabContainer: {
        flexDirection: 'row',
        height: 70,
        width: width,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    icon: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
    },
    underline: {
        width: 21,
        height: 3,
        backgroundColor: COLORS.buttonBlue,
        borderRadius: 2,
        marginTop: "4%",
    },
    centerButton: {
        position: 'absolute',
        top: -37,
        backgroundColor: COLORS.buttonBlue,
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    centerIcon: {
        width: 45,
        height: 45,
        tintColor: '#fff',
        resizeMode: 'contain',
    },
});

export default CustomTabBar;