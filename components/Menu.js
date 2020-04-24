import MenuIcon from "react-native-vector-icons/Entypo";
import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import Login from 'react-native-vector-icons/Entypo';
import Logout from 'react-native-vector-icons/MaterialCommunityIcons'
import SingUpIcon from 'react-native-vector-icons/MaterialIcons'
import {Actions} from "react-native-router-flux";
import firebase from 'firebase'

class Menu extends Component<{}>{

    state={
            login:false,//if user logs in with firebase, this value is true
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            //I used setTimeout because ı get this WARNING:
            // ""Can't perform a React state update on an unmounted component""
            //ı am sure it has a real solution but ı haven't find it yet.
            if (user) {

                setTimeout(() => {this.setState({login:true})}, 2000)
            }

        });
    }
    logOut(){
        firebase.auth().signOut();
        setTimeout(() => {this.setState({login:false})}, 2000)//same reason
    }

    render(){
        if(this.state.login){//if user logs in
            var login='none'//login icon becomes invisible
            var logout='flex'//logout icon becomes visible
        }
        else{//if not user logs in
            var login='flex' //login icon becomes visible
            var logout='none'//logout icon becomes invisible
        }
        return(

            <View style={styles.container}>

                <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>Actions.signup()}>
                   <SingUpIcon name='person-add' size={28} color='white'/>
                    <Text style={styles.text}>Signup!</Text>
                </TouchableOpacity>

                <Text style={styles.title}>translateIT</Text>

                <View style={{justifyContent:'flex-end'}}>

                    <TouchableOpacity onPress={()=>Actions.login()}style={{display:login,flexDirection:'row'}}>
                        <Login name='login' size={28} color='white'/>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.logOut()} style={{display:logout,flexDirection:'row'}}>
                        <Logout name='logout' size={28} color='white'/>
                        <Text style={styles.text}>Logout</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }







}

const styles = StyleSheet.create({
    container: {
        padding:10,
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'#181818',
    },
    text:{
        color:'grey',
        padding:5,
    },
    title:{
        color:'white',
        fontWeight: "bold",
        fontSize:20,
    }



});

export default Menu;