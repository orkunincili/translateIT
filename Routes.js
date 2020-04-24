import React, {Component} from 'react';
import {Router, Stack, Scene} from "react-native-router-flux";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import SignUp from "./components/SingUp";
export default class Routes extends Component<{}>{
    render(){
        return(
            <Router>
                <Stack key={"root"} hideNavBar={true}>
                    <Scene key="Home" component={Home} initial/>
                    <Scene key="login" component={LoginForm} />
                    <Scene key="signup" component={SignUp} />
                </Stack>

            </Router>

        )
    }
}