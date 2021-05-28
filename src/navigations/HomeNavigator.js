import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text,View} from 'react-native';
import { CHECK_IN_OUT, CONTACT_DETAIL, CONTACT_LIST, CREATE_CONTACT, HOME, LOGOUT, PROFILE, SETTINGS, TIMETABLE } from '../constants/routeNames';
import Profile from '../screens/Profile';
import CheckIO from '../screens/Check In-Out';
import TimeTable from '../screens/TimeTable';
import Settings from '../screens/Settings';
import Home from '../screens/Home';
import LogOut from '../screens/LogOut';


const HomeNavigator=()=>{
    const HomeStack = createStackNavigator();
    return (
        <HomeStack.Navigator initialRouteName={HOME}>
            <HomeStack.Screen name={HOME} component={Home}></HomeStack.Screen>
            <HomeStack.Screen name={PROFILE} component={Profile}></HomeStack.Screen>
            <HomeStack.Screen name={CHECK_IN_OUT} component={CheckIO}></HomeStack.Screen>
            <HomeStack.Screen name={TIMETABLE} component={TimeTable}></HomeStack.Screen>
            <HomeStack.Screen name={SETTINGS} component={Settings}></HomeStack.Screen>
            <HomeStack.Screen name={LOGOUT} component={LogOut}></HomeStack.Screen>
        </HomeStack.Navigator>
    );
};

// screens>>>Home>>>Drawer
// screens>>>Auth>>>

export default HomeNavigator;