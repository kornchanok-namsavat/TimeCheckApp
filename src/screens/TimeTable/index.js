import React from 'react';
import {ScrollView , StyleSheet, Text,View,TextInput , Button ,Alert} from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy'
import axios from 'axios';
import { DataTable } from 'react-native-paper';


const TimeTable=()=>{

    const [EmID, onChangeEmID] = React.useState("");
    const [SearchResult,onChangeSR] = React.useState("");
    const [EntryList,onChangeEL] = React.useState([]);
    const [isLocked,onChangeIL] = React.useState(true);

    return (
        <ScrollView>
            {/*
            <View>
                <Text/>
                <Text style={{textAlign:"center"}} >This is Time table screen</Text>
            </View>
            */}

            <Text style={styles.UsernameLabel}>Insert Employer ID here</Text>

            <TextInput
              style={styles.input}
              placeholder={"Employer ID"}
              onChangeText={EmID => onChangeEmID(EmID)}
              value={EmID}
            />


            <View style={styles.Button}>
                <Button
                    title="Search"
                    onPress={() => {
                        onChangeIL(true)
                        let api = "http://api-intranet.dga.or.th/absentv1/GetAbsentDate.ashx?empID="+EmID
                        axios.get(api).then(res => {

                            onChangeSR(res.data.ResponseText)
                            console.log(JSON.stringify(JSON.parse(res.data.ResponseText)))


                            if(res.data.ResponseText!="ไม่พบรายการ"){
                                onChangeIL(false)
                                Alert.alert("Search found! ");
                            }
                            else{
                                Alert.alert("Employer ID not found");
                            }
                            console.log(res.data.ResponseText)
                            

                        }).catch((error) =>{
                            console.log("Api call error");
                            Alert.alert("Employer ID not found");
                        })
                    }}
                />
            </View>
            

            <View style={styles.Button}>
                <Button
                    title="Show Result"
                    onPress={() => {

                        onChangeEL(SearchResult.split("},{"))

                    }}
                    disabled={isLocked}
                />
            </View>
                
            

            <View style={{height:30}}/>


                <DataTable>
                    <DataTable.Header style={{height:80,top:20}}>
                        <View style={{width:100,padding: 2 ,margin: 5,textAlign: "center"}}><Text>วันที่</Text></View>
                        <View style={{width:60,padding: 2 ,margin: 5,textAlign: "center"}}><Text>เวลาเข้า-ออก</Text></View>
                        <View style={{width:70,padding: 2 ,margin: 5,textAlign: "center"}}><Text>จำนวนที่ขาดงาน</Text></View>
                        <View style={{width:70,padding: 2 ,margin: 5,textAlign: "center"}}><Text>หมายเหตุ</Text></View>
                        <View style={{width:50,padding: 2 ,margin: 5,textAlign: "center"}}><Text>ลาตามระบบ</Text></View>
                    </DataTable.Header>
                {   
                    EntryList.map((item,index)=>{

                        const Date = item.split('"WorkDateString":"')[1][0]=='"' ? "ไม่มีข้อมูล" : item.split('"WorkDateString":"')[1].slice(0,10)
                        const TimeIn = item.split('CheckInDateString":"')[1][0]=='"' ? "ไม่มีข้อมูล" : item.split('CheckInDateString":"')[1].slice(11,16)
                        const TimeOut = item.split('CheckOutDateString":"')[1][0]=='"' ? "ไม่มีข้อมูล" : item.split('CheckOutDateString":"')[1].slice(11,16)
                        const Absent = item.split('AbsentMinute":')[1][0]=='"' ? "ไม่มีข้อมูล" : item.split('AbsentMinute":')[1].slice(0,10).split(",")[0]
                        const AbsentH = (Math.floor(parseInt(Absent)/60)).toString()
                        const AbsentM = (parseInt(Absent)%60).toString()
                        const Describe = item.split('StatusName":"')[1][0]=='"' ? "ไม่มีข้อมูล" : item.split('StatusName":"')[1].slice(0,30).split('"')[0]

                        return(

                            <DataTable.Row style={{top:20,bottom:10}}>
                                <View style={{width:100,padding: 10 ,margin: 5,}}><Text>{Date}</Text></View>
                                <View style={{width:60,padding: 10 ,margin: 5,}}><Text>{TimeIn}-{TimeOut}</Text></View>
                                <View style={{width:65,padding: 6 ,margin: 5,}}><Text>{AbsentH>0? AbsentH+"\nชั่วโมง":""}{AbsentM>0? AbsentM+"\nนาที":""}</Text></View>
                                <View style={{width:70,padding: 10 ,margin: 5,}}><Text style={{textAlign: "center"}}>{Describe}</Text></View>
                                <View style={{width:50,padding: 10 ,margin: 5,}}><Text></Text></View>
                            </DataTable.Row>
                        )
                    })
                    
                }

                </DataTable>


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

export default TimeTable;