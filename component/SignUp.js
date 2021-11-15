import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../assets/colors/colors';
import welcomeImg from '../assets/images/welcome.png'

export default function SignUp() {
    const [isChecked, setChecked] = useState(false);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.welcomeImg} source={welcomeImg}></Image>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Enter Email Address'}
                            value={''}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'Enter Password'}
                            value={''}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'Confirm Password'}
                            value={''}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Checkbox
                                style={{ marginHorizontal: 15 }}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? colors.tertiary : undefined}
                            />
                            <Text style={{color:'white'}}>Anynomous Sign In</Text>
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
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15
    },
    welcomeImg: {
        width: 300,
        height: 260
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
        paddingLeft:15
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