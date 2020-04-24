import React, {Component}from 'react';
import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity, Modal,ImageBackground} from 'react-native';
import {Actions} from "react-native-router-flux";
import Voice from "react-native-voice";
import Icons from  'react-native-vector-icons/FontAwesome'
import RadioForm from "react-native-simple-radio-button";
import TranslateIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import BG from '../images/homeBg.jpg'
import Menu from "./Menu";
import firebase from 'firebase'
var lang =[
    {label:'Türkçe',value:0},
    {label:'English',value:1},
    {label:'French',value:3},
    {label:'Italian',value:4},

]

var langList=['tr','en','fr','it']
class Home extends Component<{}>{

    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            dataSource:null,
            text:'',//the text you want to translate
            translatedText:'',//the text to be translated
            results:[],
            show:false,//select language modal
            lang1:'no language',//the language you want to translate
            lang2:'no language',//the language to be translated
            loggedIn:null

        }
        Voice.onSpeechResults=this.onSpeechResults.bind(this);

    }
    onSpeechResults(e){
        this.setState({
            results:e.value //speech to text
        })

    }
    //this function run when you click the microphone icon in the app
    onSpeechStart(){
        Voice.start('en-EN');//microphone language

    }


    translate=()=>  {
        var lang1=this.state.lang1;//the language you want to translate
        var lang2=this.state.lang2;//the language to be translated
        //check if a microphone is used
        if(this.state.results.length!=0){
            var text = this.state.results[0]
        }
        else{
            text =this.state.text;//the text you want to translate
        }

        return fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200418T052429Z.611d4a197395d161.d3e7032dc68cafb5d5e84629c304ebfc4abbf013&text='+text+'&lang='+lang1+'-'+lang2)
            .then( (response) => response.json())
            .then( (responseJson)=> {
                this.setState({
                    isLoading:false,
                    dataSource: responseJson.text,//in here,dataSource=translated text


                })
            })
            .catch((error)=>{
                console.log(error)
            });

    }

    logIn(){

        Actions.login()//open the login scene

    }
    logOut(){
        firebase.auth().signOut();
        Actions.Home()//open the home scene
    }



    render(){

        return (
            <ImageBackground style={styles.container} source={BG}>
                <Menu/>
                <View style={styles.container}>

                    <View style={styles.textInputContainer}>

                        <TextInput style={styles.input} onChangeText={text=>this.setState({text:text})}/>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{marginRight:60,color:'grey',fontSize:20}}>{this.state.lang1}</Text>
                            <TouchableOpacity style={{alignItems:'center'}} onPress={this.translate}>
                                <TranslateIcon name='translate' size={35} color='white'/>
                            </TouchableOpacity>
                            <Text style={{marginLeft:60,color:'grey',fontSize:20}}>{this.state.lang2}</Text>
                        </View>


                        <Text style={styles.translatedText}>{this.state.dataSource}</Text>
                        <View style={styles.microphones}>
                            <TouchableOpacity onPress={this.onSpeechStart} style={{flexDirection:'row'}}>
                                <Icons name='microphone' size={30} color='white'/>
                                <Text style={{fontSize:10,color:'grey',marginLeft:10}}>(sesle çeviri için dokunun ve lütfen anlaşılır bir şekilde konuşun.)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.translate}>
                                <Text style={styles.voiceText}>{this.state.results[0]}</Text>
                            </TouchableOpacity>
                        </View>
                        <Button title='select language' onPress={()=>{this.setState({show:true})}}></Button>
                        <Modal transparent={true} visible={this.state.show}>
                            <View style={{flex:1,margin:50,padding:40,backgroundColor:'#fff'}}>
                                <RadioForm
                                    radio_props={lang}
                                    onPress={(value1)=>{this.setState({lang1:langList[value1]})}}></RadioForm>
                                <Button title='select lang' onPress={()=>{this.setState({show:false})}}></Button>
                                <View style={{alignItems:'flex-start',margin:50,padding:40,backgroundColor:'#fff'}}>
                                    <RadioForm
                                        radio_props={lang}
                                        onPress={(value2)=>{this.setState({lang2:langList[value2]})}}></RadioForm>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </ImageBackground>

        )



    }

}

const styles = StyleSheet.create({
    icon:{
        marginLeft:10,


    },
    container:{
        flex:1,
        width: '100%',
        height: '100%',
        justifyContent:'center',


    },
    textInputContainer:{
        flex:2,
        padding:15,





    },
    dictionary:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',


    },
    input:{
        borderColor:'orange',
        borderBottomWidth:2,
        borderLeftWidth:5,
        margin:20,
        fontFamily: 'lucida grande',
        fontSize: 20,
        paddingHorizontal: 20,
        color:'white',
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        overflow:'hidden',
        opacity:0.7,
        height: '20%',
    },
    translatedText:{
        fontSize: 20,
        borderRightWidth:5,
        borderTopWidth:2,
        fontFamily: 'bold',
        borderColor:'orange',
        paddingVertical:10,
        paddingHorizontal: 20,
        margin:20,
        opacity:0.7,
        height: '20%',
        color:'white',
        alignItems:'center',
        justifyContent:'center',
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        overflow:'hidden',


    },
    microphones:{
        padding:10,
        justifyContent:'flex-start',
        width:'100%',
    },
    voiceText:{
        fontFamily: 'bold',
        width:'80%',
        marginLeft: 20,
        fontSize:20,
        paddingHorizontal: 20,
        color:'white',
        borderBottomWidth:2,
        borderColor:'orange',
        borderRadius:20,

    },


})

export default Home;