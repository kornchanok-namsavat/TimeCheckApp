/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import AppNavContainer from './src/navigations';
import { createStore , StoreProvider , action } from 'easy-peasy';
//import SQLite from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-2';
import {LogBox } from 'react-native';
//LogBox.ignoreLogs(['Reanimated 2']);
//LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

global.db = SQLite.openDatabase(
  {
    name: 'SQLite.db',
    createFromLocation: './android/app/src/main/assets/www/SQLite.db',
  },
  () => { console.log("DB opened"); },
  error => {
    console.log("ERROR: " + error);
  }
);

const App = () => {

  const store = createStore({
    isLoggedIn : false ,
    isLoggedInChange : action((state,payload) => {
      state.isLoggedIn = payload;
    }),
    userEmail : "TestEmail" ,
    userEmailChange : action((state,payload) => {
      state.userEmail = payload;
    }),
    userToken : "TestToken" , 
    userTokenChange : action((state,payload) => {
      state.userToken = payload;
    }),
    EmID : "",
    EmIDChange : action((state,payload) => {
      state.EmID = payload;
    }),
  });

  return (
    <StoreProvider store={store}>
        <AppNavContainer/>
    </StoreProvider>
  );
};


export default App;
