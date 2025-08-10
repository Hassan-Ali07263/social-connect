import React from 'react';
import * as ui from "../../screens/index";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../components/CustomTabBar';

const BottomTabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false}}
        tabBar={(props) => <CustomTabBar {...props} />}>
            
            <Tab.Screen name='Home' component={ui.Home} />
            <Tab.Screen name='ListFollowers' component={ui.ListFollowers} />
            <Tab.Screen name='AddPost' component={ui.AddPost} />
            <Tab.Screen name='Notifications' component={ui.Notifications} />
            <Tab.Screen name='Profile' component={ui.Profile} />
        </Tab.Navigator>
    );
}
export default BottomTabs;