import React from 'react';
import {ScrollView , StyleSheet, Text,View,TextInput , Button ,Alert} from 'react-native';
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

const Settings=()=>{
    const userEmail = useStoreState(state => state.userEmail);
    return (
        <ScrollView>
            <View style={{height:600}}>
                <Text/>
                <Text style={{textAlign:"center"}}>This is Settings screen</Text>
            </View>

            <Button
                title="Delete Log"
                onPress={()=>{
                    ExecuteQuery('DELETE FROM InAppUserLog WHERE UserEmail=(?)',[userEmail]).then((x)=>{
                        //console.log(x.rows._array)

                    });
                }}
            />
        </ScrollView>
    );
};

export default Settings;