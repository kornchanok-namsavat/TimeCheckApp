import React from 'react';
import {ScrollView , StyleSheet, Text,View,TextInput , Button ,Alert} from 'react-native';
import axios from 'axios';
import { useStoreState , useStoreActions } from 'easy-peasy'
import { DataTable } from 'react-native-paper';

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

function getData (x){
  var xrow = x.rows;
  for (let i = 0; i < xrow.length; i++) {
    var item = xrow.item(i);
    console.log(item);
  }
}

const CheckIO=()=>{
    const userEmail = useStoreState(state => state.userEmail);
    const [SearchResultArray,onChangeSRA] = React.useState([]);
    const [HideHeader,onChangeHideHeader] = React.useState(true);
    return (
        <ScrollView>
            <View style={{height:100}}>
                <Text/>
                <Text style={{textAlign:"center"}}>This is Check In or Check Out screen</Text>
            </View>

            <Button
                title="Check In"
                onPress={()=>{
                    let api = "http://api-intranet.dga.or.th/absentv1/GetAbsentTAD_Covid.ashx?empemail="+userEmail
                    //console.log("Now EmID is : "+EmID)
                    console.log("Try to connect api : "+api)
                    axios.get(api).then(res =>{
                        console.log(res.data.split(","))
                        const status = res.data.split(",")[0].split('"IsSuccess": "')[1].slice(0,4)
                        if(status=="true"){
                            const Date = res.data.split(",")[3].split(": ")[1].split(" ")[0]
                            const Time = res.data.split(",")[3].split(": ")[1].split(" ")[1].slice(0,8)
                            //console.log(Date+" : "+Time)
                            ExecuteQuery('CREATE TABLE IF NOT EXISTS InAppUserLog (UserEmail TEXT,CheckType TEXT,Date TEXT,Time TEXT)',[]);
                            ExecuteQuery('INSERT INTO InAppUserLog (UserEmail,CheckType,Date,Time) VALUES (?,?,?,?)',[userEmail,"Check-In",Date,Time])
                            Alert.alert("เช็คอินสำเร็จ! \nวันที่ : ("+Date+") เวลา : ("+Time+")")
                        }
                        else{
                            Alert.alert("เช็คอินล้มเหลว! กรุณาลองใหม่ภายหลัง \nวันที่ : ("+Date+") เวลา : ("+Time+")")
                        }
                    
                    }).catch((error) =>{
                    
                        console.log("Api call error : Get Result error with "+error);
                    
                    })
                }}
            />

            <View style={{height:20}}/>

            <Button
                title="Show Log"
                onPress={()=>{
                    onChangeSRA([])
                    onChangeHideHeader(true)
                    ExecuteQuery('SELECT * FROM InAppUserLog WHERE UserEmail=(?)',[userEmail]).then((x)=>{
                        //console.log(x.rows._array)
                        onChangeSRA(x.rows._array)
                        onChangeHideHeader(false)
                    });
                }}
            />

            <DataTable >
                {!HideHeader? (
                    <DataTable.Header style={{height:40,top:20}}>
                        <View style={{width:110,padding: 2 ,margin: 5}}><Text style={{textAlign: "center"}}>วันที่</Text></View>
                        <View style={{width:100 ,padding: 2 ,margin: 5}}><Text style={{textAlign: "center"}}>เวลา</Text></View>
                        <View style={{width:140 ,padding: 2 ,margin: 5}}><Text style={{textAlign: "center"}}>การดำเนินการ</Text></View>
                    </DataTable.Header>
                ) : (<View/>)
                }
                
                {   
                    SearchResultArray.map((item,index)=>{
                        const Date = item.Date
                        const Time = item.Time
                        const Process = item.CheckType
                
                        return(
                            <DataTable.Row key={index} style={{top:20,bottom:10}}>
                                <View style={{width:120,padding: 10 ,margin: 5,}}><Text>{Date}</Text></View>
                                <View style={{width:120,padding: 10 ,margin: 5,}}><Text>{Time}</Text></View>
                                <View style={{width:140,padding: 10 ,margin: 5,}}><Text>{Process}</Text></View>
                            </DataTable.Row>
                        )
                    })
                     
                    
                }
            </DataTable>

            <View style={{height:60}}/>
        </ScrollView>
    );
};

export default CheckIO;