import React, { useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput,TouchableWithoutFeedback,Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from './helper';
import colors from '../assets/colors/colors';
import loginImg from '../assets/images/login.png'

export default function SignIn({navigation}) {
    const [keyboardStatus,setKeyboardStatus] = useState(false)
    const [data,setData] = useState({email:'',password:''})

    useEffect(()=>{
        const handleKeyboardShow =  Keyboard.addListener('keyboardDidShow',()=>{
                setKeyboardStatus(!keyboardStatus)
            });
        const handleKeyboardHide = Keyboard.addListener('keyboardDidHide',()=>{
                setKeyboardStatus(!keyboardStatus)
            })
        //cleanup function
        return () => {
            handleKeyboardShow.remove()
            handleKeyboardHide.remove()
          };      
    },[keyboardStatus])

    const handleSignIn = async()=>{
        try {
            if(isEmpty(data)){
                const jsonVal = JSON.stringify(data)
                await AsyncStorage.setItem('user',jsonVal)
                console.log(jsonVal)
                navigation.navigate('CameraScreen')
            }else{
                console.log('field empty')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={keyboardStatus?styles.loginImgKbOn:styles.loginImg} source={loginImg}></Image>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Enter Email Address'}
                            onChangeText={text=>setData({...data,email:text})}
                            value={data.email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'Enter Password'}
                            secureTextEntry={true}
                            onChangeText={text=>setData({...data,password:text})}
                            value={data.password}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={{ paddingHorizontal: 10 }} >
                            <TouchableOpacity style={styles.buttonStyle} onPress={handleSignIn}>
                                <Text style={{ color: 'white' }}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={{ color: 'white' }}>Clear</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        paddingTop: 40
    },
    imageContainer: {
        flex: 3,
        justifyContent: "center"
    },
    formContainer: {
        flex: 2,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15
    },
    loginImgKbOn:{
        width:300,
        resizeMode:'contain'
    },
    loginImg: {
        width: 370,
    },
    input: {
        height: 50,
        width: 340,
        margin: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.tertiary,
        backgroundColor: 'white',
        padding: 10,
        fontSize: 18,
        color: "#2F2E41",
        opacity: 60,
        paddingLeft: 15
    },
    inputFocused: {
        backgroundColor: colors.tertiary
    },
    buttonStyle: {
        width: 150,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: colors.tertiary
    }

});