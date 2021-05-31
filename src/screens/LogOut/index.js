import React from 'react';
import {ScrollView, Text,View} from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy'

async function ExecuteQuery(sql, params = []){
    return await new Promise((resolve, reject) => {
      db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
          resolve(results);
        },
          (error) => {
            console.log(error)
            reject(error);
          });
      });
    });
  };

const LogOut=()=>{
    const isLoggedInChange = useStoreActions(actions => actions.isLoggedInChange);
    const userEmailChange = useStoreActions(actions => actions.userEmailChange);
    const userTokenChange = useStoreActions(actions => actions.userTokenChange);

    ExecuteQuery('DELETE FROM LogInCache',[])
    userEmailChange("");
    userTokenChange("");
    isLoggedInChange(false);


    
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