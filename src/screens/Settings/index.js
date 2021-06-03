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
    const [Date, onChangeDate] = React.useState("");
    const [Time, onChangeTime] = React.useState("");
    const [CheckType, onChangeChecktype] = React.useState("");
    return (
        <ScrollView>
            <View style={{height:500}}>
                <Text/>
                <Text style={{fontSize : 20,textAlign:"center"}}>Settings</Text>
                <Text/>
                <Text>  # สำหรับทดสอบการทำงาน #</Text>
                <Text/>
                <Text>  Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"dd/mm/yyyy"}
                  onChangeText={Date => onChangeDate(Date)}
                  value={Date}
                />
                <Text>  Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"hh:mm:ss"}
                  onChangeText={Time => onChangeTime(Time)}
                  value={Time}
                />
                <Text>  CheckType</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Check-In or Check-Out"}
                  onChangeText={CheckType => onChangeChecktype(CheckType)}
                  value={CheckType}
                />
                <Text/>

                <Button
                    title="Add log"
                    onPress={()=>{
                      ExecuteQuery('INSERT INTO InAppUserLog (UserEmail,CheckType,Date,Time) VALUES (?,?,?,?)',[userEmail,CheckType,Date,Time])
                    }}
                />

            </View>

            <Button
                title="Delete log (This user only)"
                onPress={()=>{
                    ExecuteQuery('DELETE FROM InAppUserLog WHERE UserEmail=(?)',[userEmail])
                }}
            />

            <View style={{height:20}}/>
                

            <Button
                title="Delete log (All users)"
                onPress={()=>{
                    ExecuteQuery('DELETE FROM InAppUserLog',[])
                }}
            />
        </ScrollView>
    );
};


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

export default Settings;