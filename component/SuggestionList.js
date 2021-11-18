import React from 'react';
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
    "Mushroom",
    "Pasta"
]


export default function SuggestionList() {
    return (
        
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {data.map(item=>{
                    return (
                        <TouchableOpacity style={
                            {paddingHorizontal:2}
                            }>
                            <Text style={{borderRadius:10,paddingHorizontal:5,backgroundColor:colors.primary}}>{item}</Text>
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
        paddingTop: 40
    },
})