import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './SignUp';
import SignIn from './SignIn';
import CameraScreen from './CameraScreen';
import ImageList from './ImageList'

const Stack = createNativeStackNavigator();
export default function UnAuthorised(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown:false}}/>
            <Stack.Screen name='CameraScreen' component={CameraScreen} options={{headerShown:false}}/>
            <Stack.Screen name='ImageScreen' component={ImageList} options={{headerShown:false}}/> 
        </Stack.Navigator>
    )
}