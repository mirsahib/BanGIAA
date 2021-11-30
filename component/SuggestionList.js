import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    View,
    TouchableOpacity
} from 'react-native';
import colors from '../assets/colors/colors';

const data = [
    "Tomatoes",
    "Mushroom",
    "Flower",
    "Cheese",
    "Wine",
    "V8",
    "Carrots ",
    "Table Cloth",
    "Pasta"
]


export default function SuggestionList({state,setState,name}) {

    const [classItem,setClassItem]= useState(data)

    useEffect(()=>{
        let newClassItem = []
        console.log('current',state[name])
        data.forEach(item=>{
            let statePropsLen = state[name].length
            console.log('item type',typeof item,'item substr',item.substr(0,statePropsLen).toLowerCase(),'state',state[name].toLowerCase())
            if(typeof item == 'string'&& item.substr(0,statePropsLen).toLowerCase()==state[name].toLowerCase()){
                //console.log("item",item.substr(0,statePropsLen).toLowerCase(),"state",state[name].toLowerCase())
                console.log('item after',item.substr(0,statePropsLen).toLowerCase(),'state',state[name].toLowerCase())
                newClassItem.push(item)
            }
        })
        console.log('newClassItem',newClassItem)
        setClassItem(newClassItem)
        
    },[state[name]])
    return (
        
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {classItem.map((item,index)=>{
                    return (
                        <TouchableOpacity key={index} style={{paddingHorizontal:2}} onPress={()=>setState({...state,[name]:item})}>
                            <Text style={{borderRadius:10,paddingHorizontal:5,backgroundColor:colors.primary,color:'white'}}>{item}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
    },
})