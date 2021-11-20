import React, { useState, useEffect } from 'react';
import { Keyboard, Text, TextInput, StyleSheet, View } from 'react-native';

const Example = () => {
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    
    useEffect(() => {
        const _keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus('Keyboard Shown')
        });
        const _keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus('Keyboard Hidden')
        });
        // cleanup function
        return () => {
            _keyboardDidShow.remove()
            _keyboardDidHide.remove()
        };
    }, []);



    return (
        <View style={style.container}>
            <TextInput style={style.input} placeholder="Click here…" onSubmitEditing={Keyboard.dismiss} />
            <Text style={style.status}>{keyboardStatus}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 36,
    },
    input: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 4,
    },
    status: {
        padding: 10,
        textAlign: 'center',
    },
});

export default Example;
