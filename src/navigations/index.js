import React,{useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {useStoreState} from 'easy-peasy'

const AppNavContainer = () => {
    const isLoggedIn = useStoreState(state => state.isLoggedIn);

    return (
        <NavigationContainer>
            {isLoggedIn? <DrawerNavigator/>:<AuthNavigator/>}
        </NavigationContainer>
    );
};

// screens>>>Home>>>Drawer
// screens>>>Auth>>>

export default AppNavContainer;