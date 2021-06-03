import React from 'react';
import {ScrollView, Text,View} from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy'


const Profile=()=>{

    const isLoggedIn = useStoreState(state => state.isLoggedIn);
    const userEmail = useStoreState(state => state.userEmail);
    const EmID = useStoreState(state => state.EmID);
    const userToken = useStoreState(state => state.userToken);

    return (
        <ScrollView>
            <View>
                <Text/>
                <Text style={{fontSize : 20,textAlign:"center"}}>Profile</Text>
                <Text/>
                <Text/>
                <Text style={{textAlign: "left"}} >    Currently LogIn as  :  {userEmail}</Text>
                <Text/>
                <Text style={{textAlign: "left"}} >    Employer ID  :  {EmID}</Text>
                {/*<Text>Access Token : {userToken}</Text>*/}

            </View>
        </ScrollView>
    );
};

export default Profile;