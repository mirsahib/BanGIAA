import React, { useState, useEffect } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import colors from '../assets/colors/colors';
import { FontAwesome } from '@expo/vector-icons';
import SuggestionList from './SuggestionList';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'


const PreviewScreen = ({ photo, handleSaveBtn, handleRetake, state, setState }) => {
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
        setModalVisible(!modalVisible)
    }
    const handlePreview = () => {
        console.log('click')
    }

    const onSelect = (index, value) => {
        console.log(`Selected index: ${index} , value: ${value}`)
    }

    return (

        <View style={styles.centeredView}>
            <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: photo && photo.uri }}>
                <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={handleModelVisibility}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        {/* <View style={{
                            position: 'absolute',
                            left: '5%',
                            top: '10%',
                        }}>
                            <TouchableOpacity
                                onPress={()=>{console.log('click')}}
                                style={{
                                    backgroundColor: '#FFF',
                                    borderRadius: 50,
                                    height: 25,
                                    width: 25
                                }}
                            >
                                <FontAwesome size={24} style={{ color: colors.tertiary }} name="eye"></FontAwesome>
                            </TouchableOpacity>
                        </View> */}
                        <TouchableWithoutFeedback onPress={()=>{setModalVisible(!modalVisible)}}>
                            <View style={styles.centeredView}>
                                <View style={keyboardStatus ? styles.modalViewKbOn : styles.modalView}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={text => setState({ ...state, className: text })}
                                        placeholder={'Class Name'}
                                        value={state.className}
                                    />
                                    <SuggestionList />
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={text => setState({ ...state, productName: text })}
                                        placeholder={'Product Name'}
                                        value={state.productName}
                                    />
                                    <SuggestionList />
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: "#FFF", paddingTop: 5 }}>Unit :</Text>
                                        <RadioGroup style={{ flexDirection: 'row', }} color={colors.tertiary}
                                            onSelect={(index, value) => onSelect(index, value)}
                                        >
                                            <RadioButton value={'item1'} >
                                                <Text>Kg/g</Text>
                                            </RadioButton>

                                            <RadioButton value={'item2'}>
                                                <Text>L/ml</Text>
                                            </RadioButton>

                                            <RadioButton value={'item3'}>
                                                <Text>Dozen/PCs</Text>
                                            </RadioButton>

                                        </RadioGroup>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={handleSaveBtn}>
                                            <Text style={styles.textStyle}>Save</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={handleRetake}>
                                            <Text style={styles.textStyle}>Retake</Text>
                                        </TouchableOpacity>
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
        height: '45%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    modalViewKbOn: {
        backgroundColor: colors.secondary,
        width: Dimensions.get('window').width,
        height: '65%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
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