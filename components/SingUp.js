import React, {Component}from 'react';
import { StyleSheet, Text, View, TextInput, Button,ImageBackground} from 'react-native';
import Logo from "../Logo";
import EmailandPassword from "./EmailandPassword";
import BG from '../images/247.jpg'


const SignUp = () =>{
    return(
        <ImageBackground style={styles.container} source={BG}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo/>
                </View>
                <View style={styles.form}>
                    <EmailandPassword type='Signup'/>
                </View>
            </View>
        </ImageBackground>



    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        width:'100%',
        justifyContent:'center',

    },
    logoContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',

    },
    form:{
        flex:2,
        alignItems:'center',
        justifyContent:'center',
    }

})

export default SignUp;