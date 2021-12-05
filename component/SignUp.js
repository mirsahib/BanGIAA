import React, { useEffect, useState } from 'react';
import { ToastAndroid,StyleSheet, Text, View, Keyboard, Image, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import formValidation from './helper';
import {createUser} from './api'
import {CREATE_USER_API} from "@env"
import colors from '../assets/colors/colors';
import welcomeImg from '../assets/images/welcome.png'

export default function SignUp({navigation}) {
    const [isChecked, setChecked] = useState(false);
    const [keyboardStatus,setKeyboardStatus] = useState(false)
    const [data,setData] = useState({email:'',password:'',confirmPassword:''})
    const [errorMessage,setErrorMessage] = useState("")

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

    const redirectToSignIn = ()=>{
        navigation.navigate('SignIn')
    }

    const handleSignUp = async ()=>{
        try {
            if(!formValidation.isEmpty(data)){
                setErrorMessage("Field is empty")
                console.log("Field is empty")
            }else if(!formValidation.validateEmail(data.email)){
                setErrorMessage("Not a valid email")
                console.log("Not a valid email")
            }else if(data.password<6){
                setErrorMessage("Field is empty")
                console.log("Password must be 6 character long")
            }else if(data.password!=data.confirmPassword){
                setErrorMessage("Password does not match")
                console.log("Password does not match")
            }else{
                //make api call
                const {confirmPassword,...userData} = data
                createUser(CREATE_USER_API,userData).then(async (response)=>{
                    console.log('save',response)
                    if(response && response.userId){
                        ToastAndroid.show('SignUp Successful', ToastAndroid.SHORT);
                        await AsyncStorage.setItem('userId',response.userId)
                        navigation.navigate('CameraScreen')
                    }else{
                        setErrorMessage("Email already exist")
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClearBtn = ()=>{
        setData({email:'',password:'',confirmPassword:''})   
    }
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={keyboardStatus?styles.welcomeImgKbOn:styles.welcomeImgKbOff} source={welcomeImg}></Image>
                    </View>
                    <View style={keyboardStatus?styles.formContainerKbOn:styles.formContainer}>
                        <View style={{alignItems:'center'}}>
                            <TextInput
                                style={keyboardStatus?styles.inputKbOn:styles.input}
                                placeholder={'Enter Email Address'}
                                onChangeText={text=>setData({...data,email:text})}
                                value={data.email}
                            />
                            {/* onchange form validation here*/}
                            {/* {errorMessage ? <Text style={{color:'white'}}>{errorMessage}</Text>:<Text style={{color:'white'}}></Text>} */}
                        </View>
                        <View style={{alignItems:'center'}}>
                            <TextInput
                                style={keyboardStatus?styles.inputKbOn:styles.input}
                                placeholder={'Enter Password'}
                                secureTextEntry={true}
                                onChangeText={text=>setData({...data,password:text})}
                                value={data.password}
                            />
                            {/* onchange form validation here*/}
                            {/* {errorMessage ? <Text style={{color:'white'}}>{errorMessage}</Text>:<Text style={{color:'white'}}></Text>} */}
                        </View>
                        <View style={{alignItems:'center'}}>
                            <TextInput
                                style={keyboardStatus?styles.inputKbOn:styles.input}
                                placeholder={'Confirm Password'}
                                secureTextEntry={true}
                                onChangeText={text=>setData({...data,confirmPassword:text})}
                                value={data.confirmPassword}
                            />
                            {errorMessage ? <Text style={{color:'white'}}>{errorMessage}</Text>:<Text style={{color:'white'}}></Text>}
                        </View>
                        {keyboardStatus? <Text></Text>:
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={redirectToSignIn}>
                                <Text style={{color:'white'}}>Already have an account ?</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={{ paddingHorizontal: 10 }} >
                            <TouchableOpacity style={styles.buttonStyle} onPress={handleSignUp}>
                                <Text style={{ color: 'white' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={handleClearBtn}>
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
        flex: 2,
        justifyContent: "center"
    },
    formContainer: {
        flex: 2,
    },
    formContainerKbOn: {
        flex: 2,
        marginBottom:55
    },
    checkBoxContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop:10,
    },
    checkBoxContainerKbOn:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop:10,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    welcomeImgKbOn: {
        width: 200,
        resizeMode:'contain'
    },
    welcomeImgKbOff: {
        width: 300,
        resizeMode:'contain'
    }
    ,
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
    inputKbOn: {
        height: 50,
        width: 340,
        margin: 5,
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
    },
});