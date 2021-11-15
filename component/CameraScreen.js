import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Platform, View,TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';


export default function CameraScreen() {
    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);


    useEffect(async () => {
        const { status } = await Camera.requestPermissionsAsync()
        setCameraPermission(status === 'granted')
    }, [])

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                </View>
            </Camera>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
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