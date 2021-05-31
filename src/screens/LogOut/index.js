import React from 'react';
import {ScrollView, Text,View} from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy'

const LogOut=()=>{
    const isLoggedIn = useStoreState(state => state.isLoggedIn);
    const isLoggedInChange = useStoreActions(actions => actions.isLoggedInChange);
    const userEmail = useStoreState(state => state.userEmail);
    const userEmailChange = useStoreActions(actions => actions.userEmailChange);
    const userToken = useStoreState(state => state.userToken);
    const userTokenChange = useStoreActions(actions => actions.userTokenChange);

    isLoggedInChange(false);
    userEmailChange("");
    userTokenChange("");
    return null
    //return (
    //    <ScrollView>
    //        <View>
    //            <Text/>
    //            <Text style={{textAlign:"center"}}>This is Log out screen</Text>
    //        </View>
    //    </ScrollView>
    //);
};

export default LogOut;