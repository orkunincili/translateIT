import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,Image} from 'react-native';
import logo from '../translateIT/images/logo.png'
const Logo = () =>{
    return(
        <View>
            <Image style={{width:300,height:200}}
                   source={logo}/>
        </View>
    )
}



export default Logo;