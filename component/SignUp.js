import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Keyboard, Image, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../assets/colors/colors';
import welcomeImg from '../assets/images/welcome.png'

export default function SignUp() {
    const [isChecked, setChecked] = useState(false);
    const [keyboardStatus,setKeyboardStatus] = useState(false)

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
                            value={''}
                        />
                        <TextInput
                            style={keyboardStatus?styles.inputKbOn:styles.input}
                            placeholder={'Enter Password'}
                            value={''}
                        />
                        <TextInput
                            style={keyboardStatus?styles.inputKbOn:styles.input}
                            placeholder={'Confirm Password'}
                            value={''}
                        />
                        <View style={keyboardStatus?styles.checkBoxContainerKbOn:styles.checkBoxContainer}>
                            <Checkbox
                                style={{ marginHorizontal: 15 }}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? colors.tertiary : undefined}
                            />
                            <Text style={{ color: 'white' }}>Anynomous Sign In</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={{ paddingHorizontal: 10 }} >
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={{ color: 'white' }}>Sign Up</Text>
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
        justifyContent: 'center' 
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