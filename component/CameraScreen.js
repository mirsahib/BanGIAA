import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Platform, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import colors from '../assets/colors/colors';
import PreviewScreen from './PreviewScreen';


export default function CameraScreen({ navigation }) {
    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [captureImage, setCapturedImage] = useState(null)
    const [flashMode, setFlashMode] = useState('off')
    const [data,setData] = useState({className:'',productName:'',measuringUnit:''})
    const cameraRef = useRef(null)

    useEffect(async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setCameraPermission(status === 'granted')
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync()
            console.log('image', data.uri)
            setPreviewVisible(true)
            setCapturedImage(data)
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
    const handleSaveBtn = ()=>{
        console.log('data',data)
        navigation.navigate('ImageScreen')
    }

    return (
        <View style={styles.container}>
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
                                    onPress={takePicture}
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