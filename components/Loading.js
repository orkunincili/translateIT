import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator} from 'react-native';

const Loading = () =>{
    return(
        <View style={styles.container}>
            <ActivityIndicator size='large'></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        marginTop:10,
        width:'100%',
        borderColor:'#eee',
        borderBottomWidth:2,
    },

})

export default Loading;