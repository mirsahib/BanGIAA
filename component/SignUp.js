import React,{useState} from 'react';
import { StyleSheet, Text, View,Image,TextInput, Button} from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../assets/colors/colors';
import welcomeImg from '../assets/images/welcome.png'

export default function SignUp(){
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.welcomeImg} source={welcomeImg}></Image>    
            </View>{/** image */}
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={'Enter Email Address'}
                />
                <TextInput
                    style={styles.input}
                    value={'Enter Password'}
                />
                <TextInput
                    style={styles.input}
                    value={'Confirm Password'}
                />
            </View>{/** sign up form */}
            <View style={styles.annynomousContainer}>
                <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>Anynomous Sign In</Text>


            </View>{/**anynomous checkbox */}
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.buttonStyle}
                    title="Sign Up"
                    color="#841584"
                />
                <Button
                    style={styles.buttonStyle}
                    title="Clear"
                    color="#841584"
                />
            </View>{/**signin button */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily:'Poppins',
      fontWeight:'bold'
    },
    imageContainer:{
        flex:2,
        paddingTop:50
    },
    formContainer:{
        flex:1,
    },
    annynomousContainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    buttonContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    welcomeImg:{
        width:300,
        height:260
    },
    input: {
        height: 50,
        width:340,
        margin: 12,
        borderRadius:20,
        borderWidth:1,
        borderColor:colors.tertiary,
        backgroundColor:'white',
        padding: 10,
        fontWeight:"bold",
        fontSize:18,
        color:"#2F2E41",
        opacity:60
      },
    inputFocused:{
        backgroundColor:colors.tertiary
    },
    buttonStyle:{
        height:10,
        width:150,
    }
  });