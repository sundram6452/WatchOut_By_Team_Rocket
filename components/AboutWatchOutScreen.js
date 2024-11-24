import React from "react";
import { View,Text,StyleSheet } from "react-native";
const AboutWatchOutScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>About WatchOut</Text>
        <Text style={{fontSize:25,textAlign:'center'}}>WatchOut is a campus safety app developed by Team Rocket, 
          led by Saumya, with Sundram, Yash, and Shubham, all students of NIT Kurukshetra. 
          The app is designed to enhance the safety and security of students and staff on campus.
           It features emergency contacts, notifications, 
           location sharing, and more to help users stay connected and safe during emergencies or in any uncertain situation. 
           Thank you for trusting us!</Text>
      </View>
    );
  };
export default AboutWatchOutScreen;
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color:'#3b5998',
      }
  })