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
  });

  return (
    <StoreProvider store={store}>
        <AppNavContainer/>
    </StoreProvider>
  );
};


export default App;
