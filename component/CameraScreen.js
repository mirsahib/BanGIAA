import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Platform, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { uploadImage,uploadData } from './api';
import formValidation from './helper'
import {UPLOAD_IMAGE_API,UPLOAD_DATA_API} from "@env"
import colors from '../assets/colors/colors';
import PreviewScreen from './PreviewScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';



export default function CameraScreen({ navigation }) {
    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [captureImage, setCapturedImage] = useState(null)
    const [flashMode, setFlashMode] = useState('off')
    const [data,setData] = useState({className:'',productName:'',measuringUnit:''})
    const cameraRef = useRef(null)
    const [spinner,setSpinner] = useState(false)

    useEffect(async () => {
        try {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setCameraPermission(status === 'granted')
        } catch (error) {
            console.log(error)
        }
    }, [])
    

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const option =  { quality: 0.7, base64: true };
                const data = await cameraRef.current.takePictureAsync(option)
                console.log('image', data.uri)
                setPreviewVisible(true)
                setCapturedImage(data)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handlePicture = async()=>{
        try {
            setSpinner(true)//spinner on
            let result = await takePicture()
            if(result){
                console.log('result',result)
                setSpinner(false)//spinner off
            }
        } catch (error) {
            console.log('handlePicture',error)
        }
    }
    const handleFlashMode = () => {
        console.log(flashMode)
        if (flashMode === 'on') {
            setFlashMode('off')
        } else if (flashMode === 'off') {
            setFlashMode('on')
        } else {
            setFlashMode('auto')
        }
    }

    const handleRetakeBtn = ()=>{
        setCapturedImage(null)
        setPreviewVisible(false)
        console.log('camera retake')
    }
    const handleSaveBtn = async ()=>{
        console.log(data)
        try {
            if(formValidation.isEmpty(data)){
                const cloudRes = await uploadImage(UPLOAD_IMAGE_API,captureImage.base64)
                console.log('cloud response',cloudRes.public_id)
                if(cloudRes){
                    data.image = cloudRes.public_id
                    data.userId = await AsyncStorage.getItem('userId')
                    console.log('data',data)
                    const realmRes = await uploadData(UPLOAD_DATA_API,data)
                    console.log('realm res',realmRes)
                    const {image,measuringUnit,userId,...suggestionList}= data
                    // append data to AsyncStorage
                    let prevStoredData = await AsyncStorage.getItem('suggestionList')
                    if(prevStoredData){
                        let prevParseData = JSON.parse(prevStoredData)
                        console.log('prevParseData',prevParseData)
                        prevParseData.push(suggestionList)
                        await AsyncStorage.setItem('suggestionList',JSON.stringify(prevParseData))
                    }else{
                        await AsyncStorage.setItem('suggestionList',JSON.stringify([suggestionList]))
                    }

                    setData({className:'',productName:'',measuringUnit:''})
                    setPreviewVisible(false)
                    //navigation.navigate('ImageScreen')
                }
            }else{
                console.log("Field is empty")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            {previewVisible && captureImage ?
                (<PreviewScreen photo={captureImage} state={data} setState={setData} handleSaveBtn={handleSaveBtn} handleRetake={handleRetakeBtn}/>) :
                <Camera
                    flashMode={flashMode}
                    style={{ flex: 1 }}
                    ref={cameraRef}
                >
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: 'transparent',
                            flexDirection: 'row'
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                left: '5%',
                                top: '10%',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleFlashMode}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 50,
                                    height: 25,
                                    width: 25
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 16
                                    }}
                                >
                                    ⚡️
                                </Text>
                            </TouchableOpacity>
                        </View>{/** end flash mode */}
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                flexDirection: 'row',
                                flex: 1,
                                width: '100%',
                                padding: 20,
                                justifyContent: 'space-between'
                            }}
                        >
                            <View
                                style={{
                                    alignSelf: 'center',
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={handlePicture}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        bottom: 0,
                                        borderRadius: 50,
                                        borderWidth: 5,
                                        borderColor: colors.secondary,
                                        backgroundColor: colors.tertiary
                                    }}
                                />
                            </View>
                        </View>{/** end camera capture  */}
                    </View>{/**end wrapper */}
                </Camera>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
});