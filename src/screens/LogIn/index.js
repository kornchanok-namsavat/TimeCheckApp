import React from 'react';
import {ScrollView , StyleSheet, Text,View,TextInput , Button ,Alert} from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy'
import axios from 'axios';
import { openDatabase } from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage'


//db = SQLite.openDatabase(
//    {
//      name: 'SQLite',
//      //createFromLocation: '..\\..\\..\\android\\app\\src\\main\\assets\\www\\SQLite.db',
//      createFromLocation: 1,
//    },
//    () => { console.log(db)},
//    error => {
//      console.log("ERROR: " + error);
//    }
//  );

//var  db = openDatabase({name: 'SQLite.db'});

//const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
//  db.transaction((trans) => {
//    trans.executeSql(sql, params, (trans, results) => {
//      resolve(results);
//    },
//      (error) => {
//        reject(error);
//      });
//  });
//});

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


const LogIn=()=>{

    const isLoggedIn = useStoreState(state => state.isLoggedIn);
    const isLoggedInChange = useStoreActions(actions => actions.isLoggedInChange);
    const userEmail = useStoreState(state => state.userEmail);
    const userEmailChange = useStoreActions(actions => actions.userEmailChange);
    const userToken = useStoreState(state => state.userToken);
    const userTokenChange = useStoreActions(actions => actions.userTokenChange);

    const [Email, onChangeEmail] = React.useState("");
    const [passWord, onChangepassWord] = React.useState("");


    return (

        <ScrollView>
            <View style={{height:10000}}>
                <Text/>
                <Text style={styles.HeaderLabel}>Please Login before use this app</Text>
                <Text/>
                <Text style={styles.UsernameLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Enter Email"}
                  onChangeText={Email => onChangeEmail(Email)}
                  value={Email}
                />
                <Text style={styles.UsernameLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Enter Password"}
                  onChangeText={passWord => onChangepassWord(passWord)}
                  value={passWord}
                  secureTextEntry={true}
                />
                <View style={styles.Button}>
                    <Button
                        title="Log In"
                        onPress={() => {

                            const postData = "userName=" + Email + "&password=" + passWord + "&grant_type=password&client_id=fd866b5d-eadf-412e-b6e8-78968cbf3da8" + "&client_secret=2~Pnm.v1WlIkt-OJ2S~9I0ERl6Jl1wz5NF&scope=https://graph.microsoft.com/Calendars.ReadWrite.Shared"; 

                            axios.post(`https://login.microsoftonline.com/57b9ca39-f573-430f-a7ac-0ef5e372b501/oauth2/v2.0/token`,postData)
                                .then(res => {
                                    console.log(res);
                                    userEmailChange(Email);
                                    userTokenChange(res.data.access_token);
                                    isLoggedInChange(true);
                                    
                                }).catch((error) =>{
                                    console.log("Api call error");
                                    Alert.alert("Invalid Username or Password");
                                })


                        }}
                    />
                </View>
                <View style={styles.Button} >
                    <Button title="TestDB" onPress={()=>{

                        //let prep = ExecuteQuery('CREATE TABLE IF NOT EXISTS LogInCache (UserEmail TEXT,UserToken TEXT)',[]);
                        //let prep2 = ExecuteQuery('INSERT INTO LogInCache (UserEmail,UserToken) VALUES (?,?)',["TestEmail","TestToken"]); 
                        let res = ExecuteQuery('SELECT * FROM LogInCache',[]);
                        console.log(res);

                    }}/>
                </View>

            </View>
        </ScrollView>
    );
};







//Styles

const styles = StyleSheet.create({

    HeaderLabel: {
        fontSize: 20,
        textAlign: "center"
    },
    UsernameLabel: {
        fontSize: 18,
        padding: 10,
    }
    ,
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    Button: {
        top: 20,
        margin: 10,
    }
  });

export default LogIn;