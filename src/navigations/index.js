  
import React,{useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
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

const AppNavContainer = () => {

    const isLoggedIn = useStoreState(state => state.isLoggedIn);
    const isLoggedInChange = useStoreActions(actions => actions.isLoggedInChange);
    const userEmailChange = useStoreActions(actions => actions.userEmailChange);
    const userTokenChange = useStoreActions(actions => actions.userTokenChange);

    ExecuteQuery('SELECT * FROM LogInCache',[]).then(res =>{
        if(res.rows.length){
            userEmailChange(res.rows.item(0).UserEmail);
            userTokenChange(res.rows.item(0).UserToken);
            isLoggedInChange(true);
        }
    })


    return (
        <NavigationContainer>
            {isLoggedIn? <DrawerNavigator/>:<AuthNavigator/>}
        </NavigationContainer>
    );
};

// screens>>>Home>>>Drawer
// screens>>>Auth>>>

export default AppNavContainer;