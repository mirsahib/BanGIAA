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
import SuggestionList from './SuggestionList';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import AsyncStorage from '@react-native-async-storage/async-storage';



const PreviewScreen = ({ photo, handleSaveBtn, handleRetake, state, setState }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [keyboardStatus, setKeyboardStatus] = useState(false)
    const [suggestionList,setSuggestionList] = useState([])
    const [classList,setClassList] = useState([])
    const [productList,setProductList] = useState([])

    useEffect(()=>{
        //console.log('component called')
        async function getSuggestedData(){
            try {
                let data = await AsyncStorage.getItem('suggestionList')
                console.log('async data',data)
                return await JSON.parse(data)
            } catch (error) {
                console.log('async error',error)
            }
        }
        try {
            getSuggestedData().then((data)=>{
                setSuggestionList(data)
                console.log('didMount suggestionList',suggestionList)
                let newClassList = data.map(item=>item.className)
                console.log('didMount newClassList',newClassList)
                setClassList(newClassList)
            }).catch(error=>console.log('error callback',error))
        } catch (error) {
            console.log('error componentDidMount',error)
        }
    },[])


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

    useEffect(()=>{
        if(suggestionList.length>0){
            console.log(suggestionList.length)
            try {
                let newProductList = suggestionList.filter((item)=>item.className===state.className)
                                                .map(item=>item.productName)

                let newClassList = []
                suggestionList.forEach(item=>{
                    let stateClassNameLen = state.className.length
                    if(item.className.substr(0,stateClassNameLen).toLowerCase()===state.className.toLowerCase()){
                        if(!newClassList.includes(item.className)){
                            newClassList.push(item.className)
                        }
                    }
                })
                setClassList(newClassList)
                setProductList(newProductList)
            } catch (error) {
                console.log('error on propsChange',error)
            }
        }
    },[state.className])

    const handleModelVisibility = () => {
        setModalVisible(!modalVisible)
    }

    const onSelect = (index, value) => {
        console.log(`Selected index: ${index} , value: ${value}`)
        setState({...state,measuringUnit:value})
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
                                    <View style={{marginBottom:10}}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={text => setState({ ...state, className: text })}
                                            placeholder={'Class Name'}
                                            value={state.className}
                                        />
                                    </View>
                                    <SuggestionList name={"className"} inputState={state} setInputState = {setState} list={classList} />
                                    <View style={{marginBottom:10}}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={text => setState({ ...state, productName: text })}
                                            placeholder={'Product Name'}
                                            value={state.productName}
                                        />
                                    </View>
                                    <SuggestionList name={"productName"} inputState={state} setInputState={setState} list={productList}/>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: "#FFF", paddingTop: 5 }}>Unit :</Text>
                                        <RadioGroup style={{ flexDirection: 'row', }} color={colors.tertiary}
                                            onSelect={(index, value) => onSelect(index, value)}
                                        >
                                            <RadioButton value={'Kg/g'} >
                                                <Text>Kg/g</Text>
                                            </RadioButton>

                                            <RadioButton value={'L/ml'}>
                                                <Text>L/ml</Text>
                                            </RadioButton>

                                            <RadioButton value={'Dozen/PCs'}>
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
        height: '50%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    modalViewKbOn: {
        backgroundColor: colors.secondary,
        width: Dimensions.get('window').width,
        height: '75%',
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
        paddingLeft: 15,
    },
});

export default PreviewScreen;