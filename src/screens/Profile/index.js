import React from 'react';
import {ScrollView, Text,View} from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy'

const Profile=()=>{

    const isLoggedIn = useStoreState(state => state.isLoggedIn);
    const userEmail = useStoreState(state => state.userEmail);
    const userToken = useStoreState(state => state.userToken);

    return (
        <ScrollView>
            <View>
                <Text/>
                <Text style={{textAlign:"center"}}>This is Profile screen</Text>
                <Text/>
                <Text/>
                <Text>Currently LogIn as : {userEmail}</Text>
                <Text/>
                <Text>Access Token : {userToken}</Text>

            </View>
        </ScrollView>
    );
};

export default Profile;