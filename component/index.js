import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Authorised from './Authorised';
import UnAuthorised from './UnAuthorised';

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
        <NavigationContainer>
            {
                auth?(<Authorised/>):(<UnAuthorised/>)
            }
        </NavigationContainer>
    )
}