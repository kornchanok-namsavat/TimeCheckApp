import React from 'react';
import {ScrollView, Text,View} from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy'

const Home=()=>{
    const userToken = useStoreState(state => state.userToken);

    return ( 
        <ScrollView>
            <View>
                <Text/>
                <Text style={{textAlign:"center"}}>This is TimeCheckingApp for this organization</Text>
            </View>
        </ScrollView>
    );
};

export default Home;