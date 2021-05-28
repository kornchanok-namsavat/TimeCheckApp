import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import { CHECK_IN_OUT, HOME_NAVIGATOR, LOGOUT, PROFILE, SETTINGS, TIMETABLE } from '../constants/routeNames';
import Profile from '../screens/Profile';
import CheckIO from '../screens/Check In-Out';
import TimeTable from '../screens/TimeTable';
import Settings from '../screens/Settings';
import LogOut from '../screens/LogOut';


const DrawerNavigator=()=>{
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator}></Drawer.Screen>
            <Drawer.Screen name={PROFILE} component={Profile}></Drawer.Screen>
            <Drawer.Screen name={CHECK_IN_OUT} component={CheckIO}></Drawer.Screen>
            <Drawer.Screen name={TIMETABLE} component={TimeTable}></Drawer.Screen>
            <Drawer.Screen name={SETTINGS} component={Settings}></Drawer.Screen>
            <Drawer.Screen name={LOGOUT} component={LogOut}></Drawer.Screen>
        </Drawer.Navigator>
    );
};

// screens>>>Home>>>Drawer
// screens>>>Auth>>>

export default DrawerNavigator;