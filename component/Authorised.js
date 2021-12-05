import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';
import ImageList from './ImageList'

const Stack = createNativeStackNavigator();
export default function Authorised(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='CameraScreen' component={CameraScreen} options={{headerShown:false}}/>
            <Stack.Screen name='ImageScreen' component={ImageList} options={{headerShown:false}}/> 
        </Stack.Navigator>
    )
}