import React from 'react';
import {
    Text,
    ScrollView,
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



export default function SuggestionList({inputState,setInputState,list,name}) {

    //console.log('prevScreen list',list)
    return (
        
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {list.map((item,index)=>{
                    return (
                        <TouchableOpacity key={index} style={{paddingHorizontal:2}} onPress={()=>setInputState({...inputState,[name]:item})}>
                            <Text style={{borderRadius:10,paddingHorizontal:5,backgroundColor:colors.primary,color:'white'}}>{item}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
    )
}

