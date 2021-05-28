import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text,View} from 'react-native';
import { LOGIN, REGISTER } from '../constants/routeNames';
import LogIn from '../screens/LogIn';


const AuthNavigator=()=>{
    const AuthStack = createStackNavigator();
    return (
        <AuthStack.Navigator screenOptions={{headerShown:false}}>
            <AuthStack.Screen name={LOGIN} component={LogIn}></AuthStack.Screen>
        </AuthStack.Navigator>
    );
};


export default AuthNavigator;