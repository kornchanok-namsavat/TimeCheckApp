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
                <Text style={{fontSize : 20,textAlign:"center"}}>{"ลงชื่อเข้า-ออกงาน\n"}</Text>
                <Text style={{textAlign:"center"}}>{"การลงชื่อเข้างานต้องทำก่อนเวลา 9.30 น.\n"+" และการลงชื่อออกงานต้องทำหลังเวลา 17.30 น."}</Text>
            </View>

            <View style={{height:60}}/>

            <Button
                title="Check In / Check Out"
                onPress={()=>{
                    let api = "http://api-intranet.dga.or.th/absentv1/GetAbsentTAD_Covid.ashx?empemail="+userEmail
                    //console.log("Now EmID is : "+EmID)
                    console.log("Try to connect api : "+api)
                    axios.get(api).then(res =>{
                        //console.log(res.data.split(","))
                        const status = res.data.split(",")[0].split('"IsSuccess": "')[1].slice(0,4)
                        if(status=="true"){
                            const Date = res.data.split(",")[3].split(": ")[1].split(" ")[0]
                            const Time = res.data.split(",")[3].split(": ")[1].split(" ")[1].slice(0,8)
                            //console.log(Date+" : "+Time)
                            ExecuteQuery('CREATE TABLE IF NOT EXISTS InAppUserLog (UserEmail TEXT,CheckType TEXT,Date TEXT,Time TEXT)',[])
                            ExecuteQuery('SELECT * FROM InAppUserLog WHERE UserEmail=(?) AND Date=(?)',[userEmail,Date]).then((x)=>{
                               if(x.rows.length==0 ){
                                    if((parseInt(Time.slice(0,2))<9) || ((parseInt(Time.slice(0,2))==9) && (parseInt(Time.slice(3,5))<30))){
                                        ExecuteQuery('INSERT INTO InAppUserLog (UserEmail,CheckType,Date,Time) VALUES (?,?,?,?)',[userEmail,"Check-In",Date,Time])
                                        Alert.alert("ลงชื่อเข้างานสำเร็จ! \nวันที่ : ("+Date+") เวลา : ("+Time+")")
                                    }
                                    else{
                                        Alert.alert("ลงชื่อเข้างานล้มเหลว! \n  ไม่สามารถลงชื่อเข้างานหลัง 9.30 น.")
                                    }
                               }
                               else if(x.rows.length==1){
                                    if((parseInt(Time.slice(0,2))==17) && (parseInt(Time.slice(3,5))>=30) || (parseInt(Time.slice(0,2))>17)){
                                        ExecuteQuery('INSERT INTO InAppUserLog (UserEmail,CheckType,Date,Time) VALUES (?,?,?,?)',[userEmail,"Check-Out",Date,Time])
                                        Alert.alert("ลงชื่อออกงานสำเร็จ! \nวันที่ : ("+Date+") เวลา : ("+Time+")")
                                    }
                                    else{
                                        console.log( parseInt(Time.slice(0,2)) +" "+ (parseInt(Time.slice(3,5))) )
                                        Alert.alert("ลงชื่อออกงานล้มเหลว! \n  ไม่สามารถลงชื่อออกงานก่อน 17.30 น.")
                                    }
                               }
                               else{
                                    Alert.alert("ลงชื่อล้มเหลว! \n  ผู้ใช้ได้ลงชื่อออกงานไปแล้ว")
                               }
                            })
                            //ExecuteQuery('INSERT INTO InAppUserLog (UserEmail,CheckType,Date,Time) VALUES (?,?,?,?)',[userEmail,"Check-In",Date,Time])
                            //Alert.alert("ลงชื่อสำเร็จ! \nวันที่ : ("+Date+") เวลา : ("+Time+")")
                        }
                        else{
                            Alert.alert("ลงชื่อล้มเหลว! กรุณาลองใหม่ภายหลัง \nวันที่ : ("+Date+") เวลา : ("+Time+")")
                        }
                        console.log("Connecting success!")
                    
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
                        onChangeSRA(x.rows._array)
                        if(x.rows.length>0){
                            console.log(x.rows)
                            onChangeHideHeader(false)
                        }
                        else{
                            console.log("No data!")
                        }
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