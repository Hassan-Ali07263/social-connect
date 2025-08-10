import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ui from "../../screens/index";
import BottomTabs from '../BottomTabs';

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={ui.Splash} />
                <Stack.Screen name='Login' component={ui.Login} />
                <Stack.Screen name='Signup' component={ui.Signup} />
                <Stack.Screen name='ForgetPassword' component={ui.ForgetPassword} />
                <Stack.Screen name='EmailVerification' component={ui.EmailVerification} />
                <Stack.Screen name='OtpVerification' component={ui.OtpVerification} />
                <Stack.Screen name='BottomTabs' component={BottomTabs} />
                <Stack.Screen name='FollowerProfile' component={ui.FollowerProfile} />
                <Stack.Screen name='Uploading' component={ui.Uploading} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default StackNavigation;