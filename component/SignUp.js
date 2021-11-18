import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Keyboard, Image, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../assets/colors/colors';
import welcomeImg from '../assets/images/welcome.png'

export default function SignUp({navigation}) {
    const [isChecked, setChecked] = useState(false);
    const [keyboardStatus,setKeyboardStatus] = useState(false)
    const [data,setData] = useState({email:'',password:'',confirmPassword:''})

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

    const handleSignUp = ()=>{
        console.log(data)
        navigation.navigate('SignIn')
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
                        <TextInput
                            style={keyboardStatus?styles.inputKbOn:styles.input}
                            placeholder={'Enter Email Address'}
                            onChangeText={text=>setData({...data,email:text})}
                            value={data.email}
                        />
                        <TextInput
                            style={keyboardStatus?styles.inputKbOn:styles.input}
                            placeholder={'Enter Password'}
                            secureTextEntry={true}
                            onChangeText={text=>setData({...data,password:text})}
                            value={data.password}
                        />
                        <TextInput
                            style={keyboardStatus?styles.inputKbOn:styles.input}
                            placeholder={'Confirm Password'}
                            secureTextEntry={true}
                            onChangeText={text=>setData({...data,confirmPassword:text})}
                            value={data.confirmPassword}
                        />
                        <TouchableOpacity style={styles.checkBoxContainer} onPress={redirectToSignIn}>
                            <Text style={{color:'white'}}>Already have an account ?</Text>
                        </TouchableOpacity>
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
        marginBottom:40
    },
    checkBoxContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop:10
    },
    checkBoxContainerKbOn:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop:10
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