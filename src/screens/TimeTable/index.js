import React from 'react';
import {ScrollView , StyleSheet, Text,View,TextInput , Button ,Alert} from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy'
import axios from 'axios';
import { DataTable } from 'react-native-paper';



function getData(EmID,onChangeSRA){
    if(EmID!=""){
        
        let api2 = "http://api-intranet.dga.or.th/absentv1/GetAbsentDate.ashx?empID="+EmID
        //console.log("Now EmID is : "+EmID)
        console.log("Try to connect api : "+api2)
        axios.get(api2).then(res =>{
        
            if(res.data.ResponseText=="ไม่พบรายการ"){
                console.log("ไม่พบรายการ")
                Alert.alert("ไม่พบรายการ")
            }
            else{
                console.log(JSON.parse(res.data.ResponseText))
                onChangeSRA(JSON.parse(res.data.ResponseText))
            }
            //console.log("Now ResA is : "+res.data.ResponseText)
        
        }).catch((error) =>{
        
            console.log("Api call error : Get Result error with "+error);
            Alert.alert("ไม่สามารถเรียกข้อมูล \n  โปรดตรวจสอบการเชื่อมต่อและลองใหม่")
            //Alert.alert("Employer ID not found");
        
        })
        
    }
}


const TimeTable=()=>{

    const userEmail = useStoreState(state => state.userEmail);
    const EmID = useStoreState(state => state.EmID)
    const [SearchResultArray,onChangeSRA] = React.useState([]);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>

            <Button
                    title="Show Result (Press Again to Refresh)"
                    onPress={()=>{
                        getData(EmID,onChangeSRA);
                    }}
            />  

            <View style={{height:30}}/>


                <DataTable>
                    <DataTable.Header style={{height:70,top:20}}>
                        <View style={{width:100,padding: 2 ,margin: 5}}><Text style={{textAlign: "center"}}>วันที่</Text></View>
                        <View style={{width:60 ,padding: 2 ,margin: 5}}><Text style={{textAlign: "center"}}>{"เวลา\n"+"เข้า-ออก"}</Text></View>
                        <View style={{width:80 ,padding: 2 ,margin: 5}}><Text style={{textAlign: "center"}}>{"จำนวนที่\n"+"ขาดงาน"}</Text></View>
                        <View style={{width:90 ,padding: 2 ,margin: 5}}><Text style={{textAlign: "center"}}>หมายเหตุ</Text></View>
                    </DataTable.Header>
                
                {SearchResultArray.length>0?    
                    (SearchResultArray.map((item,index)=>{
                        const Date = item.WorkDateString=="" ? "ไม่มีระบุ" : item.WorkDateString.slice(0,10)
                        const TimeIn = item.CheckInDateString=="" ? "ไม่ระบุ" : item.CheckInDateString.slice(11,16)
                        const TimeOut = item.CheckOutDateString=="" ? "ไม่ระบุ" : item.CheckOutDateString.slice(11,16)
                        const Absent = item.AbsentMinute=='0' ? "ไม่มี" : item.AbsentMinute
                        const AbsentH = (Math.floor(parseInt(Absent)/60)).toString()
                        const AbsentM = (parseInt(Absent)%60).toString()
                        const Describe = item.StatusName=="" ? "ไม่ระบุ" : item.StatusName
                        return(
                            <DataTable.Row key={index} style={{top:20,bottom:10}}>
                                <View style={{width:100,padding: 10 ,margin: 5,}}><Text>{Date}</Text></View>
                                <View style={{width:75,padding: 10 ,margin: 5,}}><Text>{TimeIn}-{"\n"+TimeOut}</Text></View>
                                <View style={{width:75,padding: 6 ,margin: 5,}}><Text>{Absent=="0"? Absent: (AbsentH>0? AbsentH+" ชม.\n":"" + AbsentM>0? AbsentM+" นาที":"")}</Text></View>
                                <View style={{width:75,padding: 10 ,margin: 5,}}><Text style={{textAlign: "center"}}>{Describe}</Text></View>
                            </DataTable.Row>
                        )
                    }))
                     
                    :

                    (<View style={{padding: 40 ,margin: 5,}}><Text style={{textAlign: "center"}} >แตะที่ Show result เพื่อโหลดรายการ</Text></View>)
                }

                </DataTable>

                <View style={{height:40}}/>


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