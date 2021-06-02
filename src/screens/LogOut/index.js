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

async function ClearCache(){
  const isLoggedInChange = useStoreActions(actions => actions.isLoggedInChange);
  const userEmailChange = useStoreActions(actions => actions.userEmailChange);
  const userTokenChange = useStoreActions(actions => actions.userTokenChange);
  const EmIDChange = useStoreActions(actions => actions.EmIDChange);

  await ExecuteQuery('DELETE FROM LogInCache',[])
  await userEmailChange("");
  await userTokenChange("");
  await EmIDChange("");
  await isLoggedInChange(false);
   
}

const LogOut=()=>{

  ClearCache()
  return null

};

export default LogOut;