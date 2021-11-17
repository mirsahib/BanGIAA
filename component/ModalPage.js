import React, { useState, useEffect } from 'react';
import { Platform, Alert, Modal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback, Keyboard, TextInput, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import colors from '../assets/colors/colors';

const ModalPage = () => {
    const [modalVisible, setModalVisible] = useState(false);
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

    return (

        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback onPress={()=>setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView}>
                        <View style={keyboardStatus ? styles.modalViewKbOn : styles.modalView}>
                            <TextInput
                                style={styles.input}
                                placeholder={'Class Name'}
                                value={''}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Oil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Water</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Paste</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Paste</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Paste</Text>
                                </TouchableOpacity>

                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder={'Product Name'}
                                value={''}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Oil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Water</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Paste</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Paste</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Paste</Text>
                                </TouchableOpacity>

                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder={'Measuring Unit'}
                                value={''}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>Kg/g</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
                                    <Text>l/ml</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 3, marginHorizontal: 2, borderRadius: 5, backgroundColor: colors.tertiary }}>
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
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Preview</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
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

export default ModalPage;