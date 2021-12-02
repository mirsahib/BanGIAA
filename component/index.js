import React, {useContext, useEffect}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
// import { AuthContext } from '../context/auth-provider';
// import { AuthProvider } from '../context/auth-provider';
import CameraScreen from './CameraScreen';
import ImageList from './ImageList';
import { AuthProvider } from '../context/auth-provider';
import {useDidMountEffect} from './helper'

const Stack = createNativeStackNavigator();
export default function AppContainer(){
    
    const [auth,setAuth] = useState(false)

    useEffect(()=>{
        async function handleAuth(){
            try {
                let data = await AsyncStorage.getItem('userId')
                if(data!=null){
                    console.log('auth',data)
                    setAuth(true)
                }
            } catch (error) {
                console.log('auth load error',error)
            }
        }
        handleAuth()
    },[])


    return(
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator>
                                <Stack.Screen name='SignUp' options={{headerShown:false}}>
                                    {props => <SignUp {...props} setAuth={setAuth} />}
                                </Stack.Screen>
                                <Stack.Screen name='SignIn' component={SignIn} options={{headerShown:false}}>
                                    {props => <SignIn {...props} setAuth={setAuth} />}
                                </Stack.Screen>  
                        
                                <Stack.Screen name='CameraScreen' component={CameraScreen} options={{headerShown:false}}/>
                                <Stack.Screen name='ImageScreen' component={ImageList} options={{headerShown:false}}/>   
                    
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
}