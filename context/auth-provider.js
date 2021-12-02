import React,{createContext,useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext()

export const AuthProvider = (props)=>{
    const [auth,setAuth] = useState(false)

    const handleAuth = async ()=>{
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

    return (
        <AuthContext.Provider value={{auth,handleAuth}}>
            {props.children}
        </AuthContext.Provider>
    )

}
