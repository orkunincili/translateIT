import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import firebase from "firebase";
import {Actions} from "react-native-router-flux";
import Login from 'react-native-vector-icons/AntDesign'
import Lock from 'react-native-vector-icons/Feather'
import Person from 'react-native-vector-icons/Ionicons'
var firebaseConfig = {
    apiKey: "AIzaSyDqIDN1VSdXiYP-sZrPZK-xTpLAFSG0kk4",
    authDomain: "translateit-1f7d0.firebaseapp.com",
    databaseURL: "https://translateit-1f7d0.firebaseio.com",
    projectId: "translateit-1f7d0",
    storageBucket: "translateit-1f7d0.appspot.com",
    messagingSenderId: "64410132159",
    appId: "1:64410132159:web:09ae4885deea282ab2b00a",
    measurementId: "G-R5D7WL6KJ2"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


class EmailandPassword extends Component<{}>{
    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
            error:'',
            loading:false

        }
    }
    ///Signup and Login
    signUpUser = (email,password)=>{
        try{
            if(this.state.password.length<8){
                alert("Parola 8 karakterden az olamaz!")
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email,password)
            alert('Hesap başarılı bir şekilde oluşturuldu.')
            Actions.Home()

        }
        catch (e) {
            console.log(e.toString())

        }

    }
    loginUser = (email,password)=>{
        try{
            firebase.auth().signInWithEmailAndPassword(email,password).then(function (user) {
                console.log(user)
            })
            Actions.Home()

        }
        catch (e) {
            console.log(e.toString())


        }
    }
    //////

    ///Check type is Login or not because i used same scene for login an signup
    loginOrSignup=()=>{
        if(this.props.type=='Login'){
            this.loginUser(this.state.email,this.state.password)
        }else{
            this.signUpUser(this.state.email,this.state.password)

        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.inputTitleContainer}>
                    <Person name='md-person' size={28} color='white'/>
                    <Text style={{padding:5,color:'white'}}>Email</Text>
                </View>
                    <TextInput  style={styles.input}
                                value={this.state.email}
                                onChangeText={email=> this.setState({email})}
                    />
                <View style={styles.inputTitleContainer}>
                    <Lock name='unlock' size={28} color='white'/>
                    <Text style={{padding:5,color:'white'}}>Password</Text>
                </View>
                    <TextInput  style={styles.input}
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={password=> this.setState({password})} />


                <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.loginOrSignup()}>
                    <Login name='login' size={40} color='white'/>
                    <Text style={styles.buttonText} >{this.props.type}</Text>
                </TouchableOpacity>
                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        padding:20,
        width:'90%',

    },
    inputTitleContainer:{
      flexDirection: 'row',
    },
    inputText:{
        color:'#fff',
        marginBottom: 5,
        fontSize:15,
    },
    input:{
        marginTop:10,
        height:40,
        backgroundColor:'#181818',
        borderWidth:1,
        borderColor:'orange',
        paddingLeft:10,
        marginBottom:15,
        borderRadius:5,
        fontSize:15,
        color:'white',
    },
    errorText:{
        fontSize:15,
        color:'red',
        alignSelf:'center',
        marginTop:10,
    },
    buttonText:{

        color:'#fff',
        padding:5,
        fontSize:20,
    },
    buttonContainer:{
        flexDirection:'row',
        padding:10,
        borderRadius:8,
    },


})

export default EmailandPassword;