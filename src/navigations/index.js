  
import React,{useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useStoreState , useStoreActions } from 'easy-peasy'
import axios from 'axios';


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


function getEmID(userEmail,EmID,onChangeEmID){
  if(userEmail!=""&&EmID==""){
      
      let api = "http://api-intranet.dga.or.th/absentv1/GetAbsentemp.ashx?empemail="+userEmail
      console.log("Current Email : "+userEmail)
      //console.log("Try to connect api : "+api)
      axios.get(api).then(res => {
          console.log("Current EmID : "+JSON.parse(res.data).ResponseEmp)
          onChangeEmID(JSON.parse(res.data).ResponseEmp)
          //console.log(JSON.parse(res.data).ResponseEmp)
      }).catch((error) =>{
          console.log("Api call error : Get EmID "+error);
          Alert.alert("ไม่พบผู้ใช้");
      })
  }
}

const AppNavContainer = () => {

    const isLoggedIn = useStoreState(state => state.isLoggedIn);
    const EmID = useStoreState(state => state.EmID);
    const EmIDChange = useStoreActions(actions => actions.EmIDChange)
    const isLoggedInChange = useStoreActions(actions => actions.isLoggedInChange);
    const userEmailChange = useStoreActions(actions => actions.userEmailChange);
    const userTokenChange = useStoreActions(actions => actions.userTokenChange);

    ExecuteQuery('SELECT * FROM LogInCache',[]).then(res =>{
        if(res.rows.length){
            userEmailChange(res.rows.item(0).UserEmail)
            getEmID(res.rows.item(0).UserEmail,EmID,EmIDChange)
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