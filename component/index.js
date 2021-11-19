import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CameraScreen from './CameraScreen';
import PreviewScreen from './PreviewScreen';
import colors from '../assets/colors/colors';
import ImageList from './ImageList';

const Stack = createNativeStackNavigator();
export default function AppContainer(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
                <Stack.Screen name='SignIn' component={SignIn} options={{headerShown:false}}/>
                <Stack.Screen name='CameraScreen' component={CameraScreen} options={{headerShown:false}}/>
                <Stack.Screen name='ImageScreen' component={ImageList} options={{headerShown:false}}/>                
            </Stack.Navigator>
        </NavigationContainer>
    )
}