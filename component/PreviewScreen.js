import React, { useState, useEffect } from 'react';
import {
    Platform,
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';
import colors from '../assets/colors/colors';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import SuggestionList from './SuggestionList';
import { NavigationContainer } from '@react-navigation/native';


const PreviewScreen = ({ photo}) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [keyboardStatus, setKeyboardStatus] = useState(false)

    useEffect(() => {
        const handleKeyboardShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(!keyboardStatus)
        });
        const handleKeyboardHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(!keyboardStatus)
        })
        //cleanup function
        return () => {
            handleKeyboardShow.remove()
            handleKeyboardHide.remove()
        };
    }, [keyboardStatus])

    const handleModelVisibility = () => {
        console.log('click')
        setModalVisible(!modalVisible)
    }
    const handleRetakeBtn = ()=>{
        console.log('retake')
        
    }

    return (

        <View style={styles.centeredView}>
            <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: photo && photo.uri }}>
                <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={handleModelVisibility}>
                    <View style={{
                        position: 'absolute',
                        left: '5%',
                        top: '10%',
                    }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor:'#FFF',
                                borderRadius: 50,
                                height: 25,
                                width: 25
                            }}
                        >
                            <FontAwesome size={24} style={{color:colors.tertiary}} name="eye"></FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <TouchableWithoutFeedback>
                            <View style={styles.centeredView}>
                                <View style={keyboardStatus ? styles.modalViewKbOn : styles.modalView}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Class Name'}
                                        value={''}
                                    />
                                    <SuggestionList/>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Product Name'}
                                        value={''}
                                    />
                                    <SuggestionList/>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Measuring Unit'}
                                        value={''}
                                    />
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.primary }}>
                                            <Text>Kg/g</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.primary }}>
                                            <Text>l/ml</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.primary }}>
                                            <Text>Dozen/Pcs</Text>
                                        </TouchableOpacity>

                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Pressable
                                            style={[styles.button]}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={styles.textStyle}>Save</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button]}
                                            onPress={handleRetakeBtn}>
                                            <Text style={styles.textStyle}>Retake</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: colors.secondary,
        width: Dimensions.get('window').width,
        height: '50%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        paddingTop: 20
    },
    modalViewKbOn: {
        backgroundColor: colors.secondary,
        width: Dimensions.get('window').width,
        height: '75%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        paddingTop: 20
    },
    button: {
        width: 110,
        height: 50,
        marginTop: 20,
        marginHorizontal: 55,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: colors.tertiary
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
});

export default PreviewScreen;